"use client"

import { useRef } from "react"
import { useResume } from "@/components/ResumeContext"
import { TemplateModern } from "./templates/modern"
import { TemplateMinimal } from "./templates/minimal"
import { TemplateProfessional } from "./templates/professional"
import { TemplateCorporate } from "./templates/corporate"
import { TemplateCreative } from "./templates/creative"
import { Button } from "@/components/ui/button"
import { Download, LayoutTemplate } from "lucide-react"


export function PreviewPane() {
    const { resumeData, template, setTemplate } = useResume()
    const targetRef = useRef<HTMLDivElement>(null)

    const handleExportPDF = async () => {
        const resumeElement = targetRef.current;
        if (!resumeElement) return;

        try {
            const htmlToExport = `
                <html>
                    <head>
                        <style>
                            @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
                            body {
                                background-color: white;
                                color: black;
                                -webkit-print-color-adjust: exact;
                                font-family: sans-serif;
                            }
                        </style>
                    </head>
                    <body>
                        ${resumeElement.outerHTML}
                    </body>
                </html>
            `;

            const response = await fetch("/api/export-pdf", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ html: htmlToExport })
            });

            if (!response.ok) throw new Error("PDF generation failed");

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${resumeData.personalInfo.firstName || "Resume"}_${resumeData.personalInfo.lastName || ""}.pdf`.replace(/\s+/g, "_");
            link.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Failed to export PDF:", error);
        }
    }

    const renderTemplate = () => {
        switch (template) {
            case "minimal":
                return <TemplateMinimal data={resumeData} />
            case "professional":
                return <TemplateProfessional data={resumeData} />
            case "corporate":
                return <TemplateCorporate data={resumeData} />
            case "creative":
                return <TemplateCreative data={resumeData} />
            case "modern":
            default:
                return <TemplateModern data={resumeData} />
        }
    }

    return (
        <div className="h-full flex flex-col bg-muted/10 relative">
            {/* Top Toolbar */}
            <div className="p-4 border-b bg-background/95 backdrop-blur z-10 flex items-center justify-between supports-[backdrop-filter]:bg-background/60">
                <div className="flex items-center gap-2">
                    <LayoutTemplate className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Template:</span>
                    <div className="flex flex-wrap bg-muted rounded-md p-1 border gap-1">
                        {(["minimal", "professional", "modern", "corporate", "creative"] as const).map((t) => (
                            <button
                                key={t}
                                onClick={() => setTemplate(t)}
                                className={`px-2 py-1 text-xs md:text-sm rounded capitalize transition-all ${template === t
                                    ? "bg-background text-foreground shadow-sm font-medium"
                                    : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                <Button onClick={handleExportPDF} className="gap-2" variant="default" size="sm">
                    <Download className="h-4 w-4" />
                    Export PDF
                </Button>
            </div>

            {/* Preview Area (A4/Letter Aspect Ratio Scale Container) */}
            <div className="flex-1 overflow-auto p-4 md:p-8 flex items-start justify-center">
                {/*
          This wrapper has a fixed aspect ratio similar to standard US Letter (8.5x11).
          A scale transform could be applied here for smaller screens, but for now 
          max-width works well.
        */}
                <div className="bg-white text-black shadow-2xl overflow-hidden w-full max-w-[816px] min-h-[1056px] print:w-[816px] print:h-[1056px]">
                    <div ref={targetRef} className="w-full h-full bg-white">
                        {renderTemplate()}
                    </div>
                </div>
            </div>
        </div>
    )
}
