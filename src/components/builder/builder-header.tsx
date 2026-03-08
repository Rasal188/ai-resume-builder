"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save, Loader2, CheckCircle2 } from "lucide-react"
import { useResume } from "@/components/ResumeContext"
import { useState, useEffect, useCallback, useRef } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function BuilderHeader({ resumeId }: { resumeId: string }) {
    const { resumeData, template } = useResume()
    const [isSaving, setIsSaving] = useState(false)
    const [lastSaved, setLastSaved] = useState<Date | null>(null)
    const router = useRouter()

    // Track initial mount to prevent immediate auto-save
    const isInitialMount = useRef(true)

    const handleSave = useCallback(async (showToast = true) => {
        setIsSaving(true)
        try {
            const res = await fetch("/api/resumes/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: resumeId,
                    resume_data: {
                        ...resumeData,
                        template: template
                    }
                }),
            })

            if (!res.ok) {
                const errorResponse = await res.json()
                console.error("API response error:", errorResponse)
                throw new Error("Failed to save resume")
            }

            const data = await res.json()

            if (data.success) {
                setLastSaved(new Date())

                if (showToast) {
                    toast.success("Resume saved successfully")
                }

                // If new resume, silently replace the URL so future saves update the new record
                if (resumeId === "new" && data.resumeId) {
                    router.replace(`/builder/${data.resumeId}`)
                }
            } else {
                throw new Error(data.message || "Failed to save resume")
            }

        } catch (error) {
            console.error("Save error:", error)
            if (showToast) {
                toast.error("Failed to save resume")
            }
        } finally {
            setIsSaving(false)
        }
    }, [resumeData, template, resumeId, router])

    // Auto-save logic
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false
            return
        }

        const timer = setTimeout(() => {
            // Delay for 10 seconds. Silent save background task
            if (resumeId !== "new") {
                handleSave(false)
            }
        }, 10000)

        // Cleanup the timer on data change or unmount
        return () => clearTimeout(timer)
    }, [resumeData, template, handleSave, resumeId])

    return (
        <header className="h-16 border-b border-primary/10 flex items-center justify-between px-6 bg-card glass-panel shrink-0 relative z-20 shadow-sm">
            <div className="flex items-center gap-4">
                <Link href="/dashboard">
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-secondary hover:bg-muted/50 hover:text-primary rounded-xl transition-all shadow-sm">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
            </div>

            <div className="hidden md:flex items-center gap-4">
                {lastSaved && !isSaving && (
                    <span className="text-xs font-medium text-secondary/60 flex items-center gap-1 animate-in fade-in zoom-in duration-300">
                        <CheckCircle2 className="w-3 h-3 text-green-500" /> Saved
                    </span>
                )}
                {isSaving && (
                    <span className="text-xs font-medium text-secondary/60 flex items-center gap-1 animate-in fade-in duration-300">
                        <Loader2 className="w-3 h-3 animate-spin text-accent" /> Saving...
                    </span>
                )}

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
    )
}
