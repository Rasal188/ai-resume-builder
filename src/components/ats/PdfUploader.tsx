"use client"
import { useRef, useState } from "react"
import { UploadCloud, FileText, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface PdfUploaderProps {
    onTextExtracted: (text: string) => void
    onError: (message: string) => void
}

export default function PdfUploader({ onTextExtracted, onError }: PdfUploaderProps) {
    const [file, setFile] = useState<File | null>(null)
    const [isExtracting, setIsExtracting] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFile = async (selectedFile: File) => {
        if (selectedFile.type !== "application/pdf") {
            onError("Please upload a valid PDF file.")
            return
        }

        setFile(selectedFile)
        setIsExtracting(true)

        const fileReader = new FileReader()

        fileReader.onload = async function () {
            try {
                // Dynamic import: pdfjs only loads in the browser on user interaction
                const pdfjsLib = await import("pdfjs-dist")
                // Load worker locally from node_modules using import.meta.url (Turbopack/webpack compatible)
                pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
                    "pdfjs-dist/build/pdf.worker.min.mjs",
                    import.meta.url
                ).toString()

                const typedArray = new Uint8Array(this.result as ArrayBuffer)
                const pdf = await pdfjsLib.getDocument(typedArray).promise

                let extractedText = ""
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i)
                    const textContent = await page.getTextContent()
                    extractedText += textContent.items.map((item: any) => item.str).join(" ") + "\n"
                }

                if (!extractedText.trim() || extractedText.trim().length < 10) {
                    onError("Could not extract text from this PDF. Try a different file or paste text manually.")
                } else {
                    onTextExtracted(extractedText)
                }
            } catch (err) {
                console.error("PDF read error:", err)
                onError("Failed to read PDF. Try a different file or paste text manually.")
            } finally {
                setIsExtracting(false)
            }
        }

        fileReader.readAsArrayBuffer(selectedFile)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) handleFile(e.target.files[0])
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0])
    }

    return (
        <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
                "w-full h-40 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all",
                file ? "border-green-500 bg-green-50/50" : "border-primary/20 bg-white/60 hover:bg-white hover:border-primary/40"
            )}
        >
            <input
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
            />
            {isExtracting ? (
                <>
                    <Loader2 className="w-8 h-8 text-primary/50 animate-spin mb-2" />
                    <p className="text-sm font-medium text-secondary">Extracting text from PDF...</p>
                </>
            ) : file ? (
                <>
                    <FileText className="w-10 h-10 text-green-600 mb-2" />
                    <p className="font-semibold text-green-800">{file.name}</p>
                    <p className="text-xs text-green-600 mt-1">Text extracted — click to replace</p>
                </>
            ) : (
                <>
                    <UploadCloud className="w-10 h-10 text-primary/40 mb-2" />
                    <p className="font-semibold text-primary">Upload your resume (PDF) or drag and drop</p>
                    <p className="text-xs text-secondary mt-1">Text will be extracted automatically</p>
                </>
            )}
        </div>
    )
}
