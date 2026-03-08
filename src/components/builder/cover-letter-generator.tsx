"use client"

import { useState, useRef } from "react"
import { useResume } from "@/components/ResumeContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Send, Download, Mail } from "lucide-react"
import { toast } from "sonner"
import { ScrollArea } from "@/components/ui/scroll-area"


export function CoverLetterGenerator() {
    const { resumeData } = useResume()
    const [jobDescription, setJobDescription] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const [coverLetter, setCoverLetter] = useState<string | null>(null)
    const targetRef = useRef<HTMLDivElement>(null)

    const handleGenerate = async () => {
        const { jobTitle } = resumeData.personalInfo

        // At least require job title from resume
        if (!jobTitle) {
            toast.error("Please add a Job Title in your Personal Info section first.")
            return
        }

        if (!jobDescription || jobDescription.trim().length < 20) {
            toast.error("Please paste the job description you are applying for.")
            return
        }

        // Build context string from the resume
        const contextLines = [
            `Name: ${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName}`,
            `Title: ${jobTitle}`,
            `Summary: ${resumeData.summary}`,
            `Skills: ${(resumeData.skills || []).join(", ")}`,
            `Experience:`,
            ...(resumeData.experience || []).map(e => `- ${e.jobTitle} at ${e.company}. ${e.description}`),
        ]
        const resumeContext = contextLines.join("\n")

        setIsGenerating(true)
        setCoverLetter(null)

        try {
            const response = await fetch("/api/cover-letter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ jobTitle, jobDescription, resumeContext }),
            })

            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.error || "Failed to generate cover letter")
            }

            setCoverLetter(data.coverLetter)
            toast.success("Cover letter generated perfectly!")
        } catch (error: any) {
            console.error(error)
            toast.error(error.message || "Failed to generate cover letter with AI.")
        } finally {
            setIsGenerating(false)
        }
    }

    const handleExportPDF = async () => {
        if (typeof window === "undefined") return
        const letterElement = targetRef.current
        if (!letterElement || !coverLetter) return
        try {
            const html2canvas = (await import("html2canvas")).default
            const { jsPDF } = await import("jspdf")
            const canvas = await html2canvas(letterElement, { scale: 2, useCORS: true, backgroundColor: "#ffffff", logging: false })
            const imgData = canvas.toDataURL("image/png")
            const pdf = new jsPDF("p", "px", [canvas.width, canvas.height])
            pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height)
            const fileName = `${resumeData.personalInfo.firstName || "Applicant"}_Cover_Letter.pdf`.replace(/\s+/g, "_")
            pdf.save(fileName)
        } catch (error) {
            console.error("Failed to export PDF:", error)
            toast.error("Failed to generate PDF document")
        }
    }

    return (
        <Card className="border-0 shadow-none bg-transparent h-full flex flex-col pt-0">
            <CardHeader className="px-0 pt-0 shrink-0">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <Mail className="h-5 w-5 text-indigo-500" />
                            AI Cover Letter
                        </CardTitle>
                        <CardDescription>
                            Generate a customized cover letter for a specific job.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="px-0 flex-1 flex flex-col overflow-hidden min-h-0">
                <div className="space-y-4 flex flex-col h-full">
                    {!coverLetter && (
                        <div className="flex-1 flex flex-col shrink-0">
                            <Textarea
                                placeholder="Paste the Job Description here..."
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                className="flex-1 min-h-[200px] resize-none mb-4"
                            />
                            <Button
                                onClick={handleGenerate}
                                disabled={isGenerating || jobDescription.trim().length < 20}
                                className="w-full gap-2 shrink-0 bg-indigo-600 hover:bg-indigo-700"
                            >
                                {isGenerating ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Send className="h-4 w-4" />
                                )}
                                Generate Cover Letter
                            </Button>
                        </div>
                    )}

                    {coverLetter && (
                        <div className="flex flex-col flex-1 min-h-0">
                            <ScrollArea className="flex-1 border rounded-md bg-white p-6 shadow-sm overflow-auto text-black">
                                <div ref={targetRef} className="text-sm font-serif leading-relaxed space-y-4 whitespace-pre-wrap selection:bg-indigo-100 p-2">
                                    {coverLetter}
                                </div>
                            </ScrollArea>
                        </div>
                    )}
                </div>
            </CardContent>

            {coverLetter && (
                <CardFooter className="px-0 pb-0 pt-4 shrink-0 flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => setCoverLetter(null)}>
                        Edit Description
                    </Button>
                    <Button className="flex-1 gap-2 bg-indigo-600 hover:bg-indigo-700" onClick={handleExportPDF}>
                        <Download className="h-4 w-4" />
                        Download PDF
                    </Button>
                </CardFooter>
            )}
        </Card>
    )
}
