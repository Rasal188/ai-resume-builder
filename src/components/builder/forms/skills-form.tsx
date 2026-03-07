"use client"

import { useState } from "react"
import { useResume } from "@/components/ResumeContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Loader2, X } from "lucide-react"
import { toast } from "sonner"

export function SkillsForm() {
    const { resumeData, updateSkills } = useResume()
    const { skills } = resumeData
    const [newSkill, setNewSkill] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)

    const handleAddSkill = (e?: React.FormEvent) => {
        if (e) e.preventDefault()

        const skillToAdd = newSkill.trim()
        if (!skillToAdd) return

        if (skills.includes(skillToAdd)) {
            toast.error("This skill is already added.")
            return
        }

        updateSkills([...skills, skillToAdd])
        setNewSkill("")
    }

    const handleRemoveSkill = (skillToRemove: string) => {
        updateSkills(skills.filter((skill) => skill !== skillToRemove))
    }

    const handleGenerateSkills = async () => {
        const { jobTitle } = resumeData.personalInfo
        const { experience } = resumeData

        if (!jobTitle) {
            toast.error("Please enter a Job Title in the Personal Info section first to generate skills.")
            return
        }

        setIsGenerating(true)

        // Collect experience descriptions to give context to AI
        const experienceContext = experience.map(exp => exp.description).join("\n")

        try {
            const response = await fetch("/api/generate-skills", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ jobTitle, experienceContext }),
            })

            if (!response.ok) {
                throw new Error("Failed to generate skills")
            }

            const data = await response.json()

            // Merge unique skills
            const newSkillsList = data.skills.filter((skill: string) => !skills.includes(skill))
            if (newSkillsList.length === 0) {
                toast.info("No new unique skills generated.")
            } else {
                updateSkills([...skills, ...newSkillsList])
                toast.success(`Generated ${newSkillsList.length} relevant skills!`)
            }

        } catch (error) {
            console.error(error)
            toast.error("Failed to generate skills with AI.")
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0 pb-6 border-b border-black/5 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl text-[#3b2a1f]">Skills</CardTitle>
                        <CardDescription className="text-[#8a7360] font-medium mt-1">
                            Add relevant skills, or let AI generate them based on your title.
                        </CardDescription>
                    </div>
                    <Button
                        size="sm"
                        onClick={handleGenerateSkills}
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
            <CardContent className="px-0 space-y-6">
                <form onSubmit={handleAddSkill} className="flex gap-2">
                    <Input
                        placeholder="e.g. React.js, Project Management, Graphic Design..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        className="flex-1"
                    />
                    <Button type="submit" variant="secondary" className="px-6 rounded-xl hover:shadow-md transition-all">Add</Button>
                </form>

                <div className="flex flex-wrap gap-2 min-h-[50px] p-5 border border-black/5 rounded-2xl bg-white/40 shadow-sm">
                    {skills.length === 0 ? (
                        <p className="text-sm text-[#8a7360] w-full text-center my-auto font-medium">
                            No skills added yet.
                        </p>
                    ) : (
                        skills.map((skill) => (
                            <div
                                key={skill}
                                className="group flex items-center gap-1.5 px-3 py-1.5 bg-[#e9dfd1] text-[#5a3e2b] font-medium rounded-full text-sm animate-in fade-in transition-all hover:bg-[#c9a27c]/20"
                            >
                                {skill}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveSkill(skill)}
                                    className="rounded-full hover:bg-black/10 p-0.5 transition-colors text-[#8a7360] hover:text-[#3b2a1f]"
                                    aria-label={`Remove ${skill}`}
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
