"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Save, Download, Loader2 } from "lucide-react"
import { useResume } from "@/components/ResumeContext"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function MobileActionBar({ resumeId }: { resumeId: string }) {
    const { resumeData, template } = useResume()
    const [isSaving, setIsSaving] = useState(false)
    const [isExporting, setIsExporting] = useState(false)
    const router = useRouter()

    const handleSave = useCallback(async () => {
        setIsSaving(true)
        try {
            const res = await fetch("/api/resumes/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: resumeId,
                    resume_data: { ...resumeData, template },
                }),
            })
            if (!res.ok) throw new Error("save failed")
            const data = await res.json()
            if (data.success) {
                toast.success("Resume saved")
                if (resumeId === "new" && data.resumeId) {
                    router.replace(`/builder/${data.resumeId}`)
                }
            } else {
                throw new Error(data.message || "save failed")
            }
        } catch {
            toast.error("Failed to save resume")
        } finally {
            setIsSaving(false)
        }
    }, [resumeData, template, resumeId, router])

    const handleExportPDF = useCallback(async () => {
        // getElementById works regardless of where in the tree this component sits
        const resumeElement = document.getElementById("resume-preview-target")
        if (!resumeElement) {
            toast.error("Resume preview not found")
            return
        }
        setIsExporting(true)
        try {
            const htmlToExport = `<html><head><style>
                @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
                body{background:white;color:black;-webkit-print-color-adjust:exact;font-family:sans-serif;}
            </style></head><body>${resumeElement.outerHTML}</body></html>`

            const response = await fetch("/api/export-pdf", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ html: htmlToExport }),
            })
            if (!response.ok) throw new Error("PDF generation failed")
            const blob = await response.blob()
            const url = URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = url
            link.download = `${resumeData.personalInfo.firstName || "Resume"}_${resumeData.personalInfo.lastName || ""}.pdf`.replace(/\s+/g, "_")
            link.click()
            URL.revokeObjectURL(url)
        } catch (error) {
            console.error("Export PDF error:", error)
            toast.error("Failed to export PDF")
        } finally {
            setIsExporting(false)
        }
    }, [resumeData])

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t border-gray-200 shadow-lg flex gap-4 p-4">
            <Button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 gap-2 h-12 text-base font-bold rounded-xl bg-primary text-white hover:bg-primary/90"
            >
                {isSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                Save
            </Button>
            <Button
                onClick={handleExportPDF}
                disabled={isExporting}
                variant="outline"
                className="flex-1 gap-2 h-12 text-base font-bold rounded-xl border-2 border-primary text-primary hover:bg-primary/5"
            >
                {isExporting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
                Export PDF
            </Button>
        </div>
    )
}
