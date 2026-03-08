"use client"

// PreviewPane is kept for potential standalone use, but the main builder
// page now uses BuilderPageClient which inlines template rendering directly.
// This component is a clean, simple version with no forwardRef complexity.

import { useRef } from "react"
import { useResume } from "@/components/ResumeContext"
import { TemplateModern } from "./templates/modern"
import { TemplateMinimal } from "./templates/minimal"
import { TemplateProfessional } from "./templates/professional"
import { TemplateCorporate } from "./templates/corporate"
import { TemplateCreative } from "./templates/creative"

export function PreviewPane() {
    const { resumeData, template } = useResume()
    const targetRef = useRef<HTMLDivElement>(null)

    const renderTemplate = () => {
        switch (template) {
            case "minimal": return <TemplateMinimal data={resumeData} />
            case "professional": return <TemplateProfessional data={resumeData} />
            case "corporate": return <TemplateCorporate data={resumeData} />
            case "creative": return <TemplateCreative data={resumeData} />
            case "modern":
            default: return <TemplateModern data={resumeData} />
        }
    }

    return (
        <div ref={targetRef} className="w-full bg-white text-black min-h-[1056px]">
            {renderTemplate()}
        </div>
    )
}
