"use client"

import { useState } from "react"
import { useResume } from "@/components/ResumeContext"
import { Button } from "@/components/ui/button"
import { Sparkles, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export function SummaryForm() {
    const { resumeData, updateSummary } = useResume()
    const [isGenerating, setIsGenerating] = useState(false)

    const handleGenerateSummary = async () => {
        const { jobTitle, location } = resumeData.personalInfo
        const { skills } = resumeData

        if (!jobTitle) {
            toast.error("Please enter a Job Title in the Personal Info section first.")
            return
        }

        setIsGenerating(true)

        try {
            const response = await fetch("/api/generate-summary", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ jobTitle, skills, location }),
            })

            if (!response.ok) {
                throw new Error("Failed to generate summary")
            }

            const data = await response.json()
            updateSummary(data.summary)
            toast.success("AI Summary generated successfully!")
        } catch (error) {
            console.error(error)
            toast.error("Failed to generate summary with AI. Please try again.")
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0 pb-6 border-b border-black/5 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl text-[#3b2a1f]">Professional Summary</CardTitle>
                        <CardDescription className="text-[#8a7360] font-medium mt-1">
                            Write a short summary highlighting your key experience and skills.
                        </CardDescription>
                    </div>
                    <Button
                        size="sm"
                        onClick={handleGenerateSummary}
                        disabled={isGenerating || !resumeData.personalInfo.jobTitle}
                        className="h-8 px-4 text-xs text-white bg-gradient-to-r from-[#c9a27c] to-[#a67c52] hover:opacity-90 rounded-full transition-all gap-2 shadow-sm border-none"
                    >
                        {isGenerating ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Sparkles className="h-4 w-4 text-white" />
                        )}
                        Generate with AI
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="px-0">
                <Textarea
                    placeholder="Experienced software engineer with a track record of building scalable web applications..."
                    value={resumeData.summary}
                    onChange={(e) => updateSummary(e.target.value)}
                    className="min-h-[150px] resize-none border-black/5 bg-white/80 focus-visible:ring-[#c9a27c] focus-visible:border-[#c9a27c] rounded-xl text-[#3b2a1f] placeholder:text-[#8a7360] transition-all"
                />
            </CardContent>
        </Card>
    )
}
