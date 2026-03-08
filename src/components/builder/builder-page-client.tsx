"use client"

import Link from "next/link"
import { useRef, useState, useCallback, useEffect } from "react"
import { useResume } from "@/components/ResumeContext"
import { Button } from "@/components/ui/button"
import { BuilderForm } from "@/components/builder/forms/builder-form"
import { TemplateModern } from "@/components/builder/preview/templates/modern"
import { TemplateMinimal } from "@/components/builder/preview/templates/minimal"
import { TemplateProfessional } from "@/components/builder/preview/templates/professional"
import { TemplateCorporate } from "@/components/builder/preview/templates/corporate"
import { TemplateCreative } from "@/components/builder/preview/templates/creative"
import {
    ArrowLeft,
    Save,
    Download,
    Loader2,
    CheckCircle2,
    LayoutTemplate,
} from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function BuilderPageClient({ resumeId }: { resumeId: string }) {
    const { resumeData, template, setTemplate } = useResume()
    const router = useRouter()
    const resumeRef = useRef<HTMLDivElement>(null)

    const [isSaving, setIsSaving] = useState(false)
    const [isExporting, setIsExporting] = useState(false)
    const [lastSaved, setLastSaved] = useState<Date | null>(null)
    const isInitialMount = useRef(true)

    /* ─── Save ─────────────────────────────────────────────────── */
    const handleSave = useCallback(async (showToast = true) => {
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
                setLastSaved(new Date())
                if (showToast) toast.success("Resume saved successfully")
                if (resumeId === "new" && data.resumeId) {
                    router.replace(`/builder/${data.resumeId}`)
                }
            } else {
                throw new Error(data.message || "save failed")
            }
        } catch (err) {
            console.error("Save error:", err)
            if (showToast) toast.error("Failed to save resume")
        } finally {
            setIsSaving(false)
        }
    }, [resumeData, template, resumeId, router])

    /* ─── Auto-save ─────────────────────────────────────────────── */
    useEffect(() => {
        if (isInitialMount.current) { isInitialMount.current = false; return }
        const t = setTimeout(() => { if (resumeId !== "new") handleSave(false) }, 10000)
        return () => clearTimeout(t)
    }, [resumeData, template, handleSave, resumeId])

    /* ─── Export PDF ─────────────────────────────────────────────── */
    const handleExportPDF = useCallback(async () => {
        const el = resumeRef.current
        if (!el) return
        setIsExporting(true)
        try {
            const html = `<html><head><style>
                @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
                body{background:white;color:black;-webkit-print-color-adjust:exact;font-family:sans-serif;}
            </style></head><body>${el.outerHTML}</body></html>`
            const res = await fetch("/api/export-pdf", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ html }),
            })
            if (!res.ok) throw new Error("PDF generation failed")
            const blob = await res.blob()
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `${resumeData.personalInfo.firstName || "Resume"}_${resumeData.personalInfo.lastName || ""}.pdf`.replace(/\s+/g, "_")
            a.click()
            URL.revokeObjectURL(url)
        } catch (err) {
            console.error("Export error:", err)
            toast.error("Failed to export PDF")
        } finally {
            setIsExporting(false)
        }
    }, [resumeData])

    /* ─── Template renderer ──────────────────────────────────────── */
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

    /* ─── Render ─────────────────────────────────────────────────── */
    return (
        /*
         * OUTER WRAPPER — NO overflow:hidden here.
         * CSS position:fixed is broken by ancestor overflow:hidden.
         * The mobile sticky bar lives as a direct child of this div.
         */
        <div className="flex flex-col h-screen bg-grain bg-vignette relative">

            {/* Ambient glows */}
            <div className="absolute top-[20%] left-[-10%] w-[30%] h-[50%] bg-accent rounded-full blur-[140px] opacity-20 animate-float pointer-events-none z-0" />
            <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-secondary rounded-full blur-[150px] opacity-10 animate-float-delayed pointer-events-none z-0" />

            {/* ── TOP HEADER ─────────────────────────────────────────── */}
            <header className="h-16 border-b border-primary/10 flex items-center justify-between px-6 bg-card glass-panel shrink-0 relative z-20 shadow-sm">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="icon" className="h-10 w-10 text-secondary hover:bg-muted/50 hover:text-primary rounded-xl transition-all shadow-sm">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                </div>

                {/* Right header actions — always visible on all screen sizes */}
                <div className="flex items-center gap-2">
                    {lastSaved && !isSaving && (
                        <span className="hidden md:flex text-xs font-medium text-secondary/60 items-center gap-1 animate-in fade-in zoom-in duration-300">
                            <CheckCircle2 className="w-3 h-3 text-green-500" /> Saved
                        </span>
                    )}
                    {isSaving && (
                        <span className="hidden md:flex text-xs font-medium text-secondary/60 items-center gap-1">
                            <Loader2 className="w-3 h-3 animate-spin text-accent" /> Saving…
                        </span>
                    )}
                    <Button
                        onClick={handleExportPDF}
                        disabled={isExporting}
                        size="sm"
                        variant="outline"
                        className="gap-2 rounded-xl border-primary/30 text-primary hover:bg-primary/5 font-semibold"
                    >
                        {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                        Export PDF
                    </Button>
                    <Button
                        onClick={() => handleSave(true)}
                        disabled={isSaving}
                        size="sm"
                        className="gap-2 rounded-xl bg-primary text-white hover:bg-primary/90 shadow-[0_4px_15px_rgba(75,46,31,0.2)] transition-all min-w-[80px]"
                    >
                        {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        Save
                    </Button>
                </div>
            </header>

            {/* ── CONTENT PANELS ─────────────────────────────────────── */}
            {/*
             * overflow-hidden only on this inner div and the panel children.
             * NOT on the outer wrapper — so the mobile fixed bar is not clipped.
             */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden p-4 md:p-6 gap-6 relative z-10 pb-24 md:pb-6">

                {/* Left: Form */}
                <div className="w-full md:w-[45%] lg:w-[40%] h-full shrink-0 bg-card glass-panel rounded-3xl shadow-sm border border-white/60 overflow-hidden flex flex-col mouse-tilt transition-shadow duration-300 hover:shadow-md">
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <BuilderForm />
                    </div>
                </div>

                {/* Right: Preview */}
                <div className="w-full md:w-[55%] lg:w-[60%] h-full shrink-0 bg-white/40 glass-panel rounded-3xl shadow-sm border border-white/60 flex overflow-hidden mouse-tilt transition-shadow duration-300 hover:shadow-md relative">
                    <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />
                    <div className="flex-1 flex flex-col relative z-10 overflow-hidden">

                        {/* Preview toolbar — template selector + desktop Export PDF */}
                        <div className="p-3 border-b bg-background/95 backdrop-blur shrink-0 flex items-center justify-between">
                            <div className="flex items-center gap-2 flex-wrap">
                                <LayoutTemplate className="h-4 w-4 text-muted-foreground shrink-0" />
                                <span className="text-sm font-medium shrink-0">Template:</span>
                                <div className="flex flex-wrap bg-muted rounded-md p-1 border gap-1">
                                    {(["minimal", "professional", "modern", "corporate", "creative"] as const).map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setTemplate(t)}
                                            className={`px-2 py-1 text-xs rounded capitalize transition-all ${template === t
                                                ? "bg-background text-foreground shadow-sm font-medium"
                                                : "text-muted-foreground hover:text-foreground"
                                                }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Desktop-only Export PDF */}
                            <Button
                                onClick={handleExportPDF}
                                disabled={isExporting}
                                className="hidden md:flex gap-2"
                                variant="default"
                                size="sm"
                            >
                                {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                                Export PDF
                            </Button>
                        </div>

                        {/* Resume preview scroll area */}
                        <div className="flex-1 overflow-auto p-4 md:p-8 flex items-start justify-center custom-scrollbar">
                            <div className="bg-white shadow-[0_10px_40px_rgba(75,46,31,0.08)] rounded-md overflow-hidden w-full max-w-[850px] border border-primary/5">
                                <div ref={resumeRef} className="w-full bg-white text-black min-h-[1056px]">
                                    {renderTemplate()}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            {/* ── MOBILE STICKY BOTTOM BAR ──────────────────────────────
                This is a DIRECT CHILD of the outermost div.
                It is NOT inside any overflow:hidden element.
                Therefore CSS position:fixed works correctly.
            ─────────────────────────────────────────────────────────── */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4 flex gap-3">
                <button
                    onClick={() => handleSave(true)}
                    disabled={isSaving}
                    className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-primary text-white font-bold text-base disabled:opacity-60"
                >
                    {isSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                    Save
                </button>
                <button
                    onClick={handleExportPDF}
                    disabled={isExporting}
                    className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border-2 border-primary text-primary font-bold text-base disabled:opacity-60"
                >
                    {isExporting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
                    Export PDF
                </button>
            </div>

        </div>
    )
}
