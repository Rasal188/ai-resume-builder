"use client"

import { useState } from "react"
import { useResume } from "@/components/ResumeContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, ArrowRight, ShieldCheck } from "lucide-react"
import { toast } from "sonner"
import { ScrollArea } from "@/components/ui/scroll-area"

type AtsResult = {
    score: number;
    missingKeywords: string[];
    suggestions: string[];
}

export function AtsScorer() {
    const { resumeData } = useResume()
    const [jobDescription, setJobDescription] = useState("")
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [result, setResult] = useState<AtsResult | null>(null)

    const handleAnalyze = async () => {
        if (!jobDescription || jobDescription.trim().length < 20) {
            toast.error("Please provide a valid job description.")
            return
        }

        // Build context string from the resume
        const contextLines = [
            `Title: ${resumeData.personalInfo.jobTitle}`,
            `Summary: ${resumeData.summary}`,
            `Skills: ${(resumeData.skills || []).join(", ")}`,
            `Experience:`,
            ...resumeData.experience.map(e => `- ${e.jobTitle} at ${e.company}. ${e.description}`),
            `Education:`,
            ...resumeData.education.map(e => `- ${e.degree} at ${e.school}`)
        ]
        const resumeContext = contextLines.join("\n")

        setIsAnalyzing(true)
        setResult(null)

        try {
            const response = await fetch("/api/analyze-resume", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ jobDescription, resumeContext }),
            })

            if (!response.ok) {
                throw new Error("Failed to analyze resume")
            }

            const data = await response.json()
            setResult(data)
            toast.success("Resume analyzed successfully!")
        } catch (error) {
            console.error(error)
            toast.error("Failed to analyze resume with AI.")
        } finally {
            setIsAnalyzing(false)
        }
    }

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-500"
        if (score >= 60) return "text-orange-500"
        return "text-destructive"
    }

    return (
        <Card className="border-0 shadow-none bg-transparent h-full flex flex-col pt-0">
            <CardHeader className="px-0 pt-0 shrink-0">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-blue-500" />
                            ATS Score Checker
                        </CardTitle>
                        <CardDescription>
                            Paste a job description to see how well your resume matches.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="px-0 flex-1 flex flex-col overflow-hidden min-h-0">
                <div className="space-y-4 flex flex-col h-full">
                    {!result && (
                        <div className="flex-1 flex flex-col shrink-0">
                            <Textarea
                                placeholder="Paste the Job Description here..."
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                className="flex-1 min-h-[200px] resize-none mb-4"
                            />
                            <Button
                                onClick={handleAnalyze}
                                disabled={isAnalyzing || jobDescription.trim().length < 20}
                                className="w-full gap-2 shrink-0"
                            >
                                {isAnalyzing ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <ArrowRight className="h-4 w-4" />
                                )}
                                Analyze Match
                            </Button>
                        </div>
                    )}

                    {result && (
                        <ScrollArea className="flex-1 border rounded-md bg-muted/20 p-4">
                            <div className="space-y-6 flex flex-col mb-12">
                                <div className="flex items-center justify-between p-4 bg-background border rounded-lg shadow-sm">
                                    <span className="font-semibold text-lg">ATS Score Score</span>
                                    <span className={`text-4xl font-bold ${getScoreColor(result.score)}`}>
                                        {result.score}%
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-semibold text-destructive">Missing Keywords</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {result.missingKeywords?.map((kw, i) => (
                                            <span key={i} className="px-2 py-1 bg-destructive/10 text-destructive border border-destructive/20 rounded-md text-sm">
                                                {kw}
                                            </span>
                                        ))}
                                        {(!result.missingKeywords || result.missingKeywords.length === 0) && (
                                            <span className="text-sm text-green-500">None detected! You hit the main keywords.</span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-semibold text-primary">Suggestions to Improve</h3>
                                    <ul className="space-y-3">
                                        {result.suggestions?.map((suggestion, i) => (
                                            <li key={i} className="text-sm text-muted-foreground bg-background p-3 rounded-md border flex gap-3 items-start">
                                                <span className="flex-shrink-0 h-5 w-5 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs mt-0.5">
                                                    {i + 1}
                                                </span>
                                                <span>{suggestion}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </ScrollArea>
                    )}
                </div>
            </CardContent>

            {result && (
                <CardFooter className="px-0 pb-0 pt-4 shrink-0">
                    <Button variant="outline" className="w-full" onClick={() => setResult(null)}>
                        Analyze Another Job
                    </Button>
                </CardFooter>
            )}
        </Card>
    )
}
