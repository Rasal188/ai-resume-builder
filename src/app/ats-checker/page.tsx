"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search, CheckCircle2, AlertTriangle, XCircle, Loader2, Download } from "lucide-react"
import { useState } from "react"
import dynamic from "next/dynamic"

// ssr: false ensures pdfjs-dist (and DOMMatrix) never run on the server
const PdfUploader = dynamic(() => import("@/components/ats/PdfUploader"), { ssr: false })

export default function ATSCheckerPage() {
    const [resumeText, setResumeText] = useState("")
    const [jobDescription, setJobDescription] = useState("")
    const [isExtracting, setIsExtracting] = useState(false)
    const [isImproving, setIsImproving] = useState(false)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [results, setResults] = useState<any>(null)
    const [error, setError] = useState("")


    const analyzeResume = async () => {
        if (!resumeText.trim()) {
            setError("Please upload a PDF or paste your resume text.")
            return
        }

        setIsAnalyzing(true)
        setError("")

        try {
            const response = await fetch("/api/ats-check", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ resumeText, jobDescription }),
            })

            const data = await response.json()

            if (data.error) {
                setError("ATS Analysis failed. Please try again.")
                return
            }

            setResults(data)
        } catch (err: any) {
            setError("ATS Analysis failed. Please try again.")
        } finally {
            setIsAnalyzing(false)
        }
    }

    const handleImproveResume = async () => {
        if (!resumeText.trim() || !results) return
        setIsImproving(true)
        try {
            const response = await fetch("/api/improve-resume", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    resumeText,
                    suggestions: results.suggestions,
                    missingKeywords: results.missingKeywords,
                }),
            })
            const data = await response.json()
            if (data.improvedResume) {
                setResumeText(data.improvedResume)
                setResults(null) // clear results so user re-runs the check
            }
        } catch (error) {
            console.error("Improve resume error:", error)
        } finally {
            setIsImproving(false)
        }
    }

    const handleDownloadResume = async () => {
        // Dynamic import so jsPDF only runs in the browser
        const { jsPDF } = await import("jspdf")
        const doc = new jsPDF()
        const pageWidth = doc.internal.pageSize.getWidth()
        const margin = 20
        const maxLineWidth = pageWidth - margin * 2

        doc.setFont("Helvetica", "bold")
        doc.setFontSize(18)
        doc.text("Resume", margin, 20)

        doc.setFont("Helvetica", "normal")
        doc.setFontSize(11)

        const lines = doc.splitTextToSize(resumeText, maxLineWidth)
        doc.text(lines, margin, 35)

        doc.save("improved-resume.pdf")
    }

    const radius = 45
    const circumference = 2 * Math.PI * radius
    const scoreOffset = results ? circumference - (results.score / 100) * circumference : circumference

    return (
        <div className="min-h-screen bg-grain bg-vignette flex flex-col relative overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-radial-glow pointer-events-none z-0 opacity-40" />

            <header className="py-6 px-8 border-b border-primary/10 glass-panel bg-card/60 sticky top-0 z-20">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/">
                        <Button variant="ghost" size="icon" className="hover:bg-muted/50 text-secondary hover:text-primary rounded-xl">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <span className="font-bold text-xl text-primary">ATS Score Checker</span>
                    <div className="w-10" />
                </div>
            </header>

            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-16 relative z-10 flex flex-col items-center">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-primary/10 text-primary text-sm font-medium mb-6 shadow-sm">
                        <Search className="h-4 w-4 text-accent" />
                        <span>Beta Feature</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-4">Beat the Applicant Tracking System</h1>
                    <p className="text-secondary font-medium text-lg leading-relaxed">Upload your resume PDF or paste text, then optionally add a job description to see your ATS match score.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 w-full">
                    <div className="lg:col-span-2 space-y-6">

                        {/* PDF Upload — pdfjs-dist loads only in browser via next/dynamic ssr:false */}
                        <div className="glass-panel p-6 rounded-3xl bg-card border border-primary/5 shadow-sm">
                            <h3 className="text-lg font-bold text-primary mb-3">1. Upload Resume PDF</h3>
                            <PdfUploader
                                onTextExtracted={(text) => { setResumeText(text); setError("") }}
                                onError={(msg) => setError(msg)}
                            />
                        </div>

                        {/* Resume Text Textarea */}
                        <div className="glass-panel p-6 rounded-3xl bg-card border border-primary/5 shadow-sm">
                            <h3 className="text-lg font-bold text-primary mb-1">2. Resume Text</h3>
                            <p className="text-sm text-secondary mb-3">Auto-filled from PDF upload, or paste manually.</p>
                            <textarea
                                value={resumeText}
                                onChange={(e) => setResumeText(e.target.value)}
                                className="w-full h-48 bg-white/60 border border-primary/10 rounded-2xl p-4 text-primary focus:outline-none focus:ring-2 focus:ring-accent resize-none font-medium placeholder:text-secondary/50 text-sm"
                                placeholder="Resume text will appear here after upload, or you can paste it directly..."
                            />
                        </div>

                        {/* Job Description */}
                        <div className="glass-panel p-6 rounded-3xl bg-card border border-primary/5 shadow-sm">
                            <h3 className="text-lg font-bold text-primary mb-1">3. Job Description (Optional)</h3>
                            <p className="text-sm text-secondary mb-3">Paste a job description for targeted matching, or leave blank for a general ATS score.</p>
                            <textarea
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                className="w-full h-40 bg-white/60 border border-primary/10 rounded-2xl p-4 text-primary focus:outline-none focus:ring-2 focus:ring-accent resize-none font-medium placeholder:text-secondary/50"
                                placeholder="Paste the job description here..."
                            />
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-3 border border-red-100">
                                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                                <p className="text-sm font-medium">{error}</p>
                            </div>
                        )}

                        <Button
                            onClick={analyzeResume}
                            disabled={isAnalyzing || isExtracting || !resumeText.trim()}
                            size="lg"
                            className="w-full rounded-2xl py-7 text-lg bg-gradient-to-b from-primary to-secondary text-white hover:scale-[1.02] shadow-[0_4px_20px_rgba(75,46,31,0.2)] transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                        >
                            {isAnalyzing ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                                    Analyzing Resume...
                                </>
                            ) : "Check ATS Score"}
                        </Button>
                    </div>

                    {/* Results Panel */}
                    <div className="lg:col-span-1">
                        <div className="glass-panel p-8 rounded-3xl bg-card border border-primary/5 shadow-sm h-full flex flex-col items-center text-center">
                            <h3 className="text-xl font-bold text-primary mb-2 border-b border-primary/10 w-full pb-4">Match Results</h3>
                            <p className="text-sm text-secondary font-medium mb-8">
                                {jobDescription.trim() ? "Job-specific ATS match analysis" : "General ATS analysis (no job description provided)"}
                            </p>

                            <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(75, 46, 31, 0.1)" strokeWidth="8" />
                                    <circle
                                        cx="50" cy="50" r={radius}
                                        fill="none"
                                        stroke={results ? (results.score >= 80 ? "#22c55e" : results.score >= 60 ? "#eab308" : "#ef4444") : "#d8b89c"}
                                        strokeWidth="8"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={scoreOffset}
                                        className="transition-all duration-1000 ease-out"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute flex flex-col items-center">
                                    {isAnalyzing ? (
                                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                                    ) : (
                                        <>
                                            <span className="text-4xl font-bold text-primary">{results ? results.score : "--"}%</span>
                                            <span className="text-xs font-semibold uppercase text-secondary tracking-wider mt-1">Match</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {!results && !isAnalyzing && (
                                <p className="text-secondary font-medium">Upload your resume and optionally a job description to see your ATS score.</p>
                            )}

                            {isAnalyzing && (
                                <p className="text-secondary font-medium animate-pulse">Running AI analysis... This usually takes ~10 seconds.</p>
                            )}

                            {results && !isAnalyzing && (
                                <div className="w-full text-left space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                    <p className="text-sm font-medium text-secondary text-center">
                                        {results.score >= 80 ? "Strong match! You're in good shape to apply." : results.score >= 60 ? "Decent match. Try to include some missing keywords." : "Low score. Consider tailoring your resume."}
                                    </p>

                                    <div>
                                        <h4 className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-green-600" /> Matched Keywords
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {results.matchedKeywords?.length > 0 ? (
                                                results.matchedKeywords.map((kw: string, i: number) => (
                                                    <span key={i} className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-xs font-bold">{kw}</span>
                                                ))
                                            ) : (
                                                <span className="text-sm text-gray-500 italic">None detected</span>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
                                            <XCircle className="w-4 h-4 text-red-500" /> Missing Keywords
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {results.missingKeywords?.length > 0 ? (
                                                results.missingKeywords.map((kw: string, i: number) => (
                                                    <span key={i} className="px-3 py-1 bg-red-50 text-red-700 border border-red-100 rounded-lg text-xs font-bold">{kw}</span>
                                                ))
                                            ) : (
                                                <span className="text-sm text-green-600 italic">No major keywords missing.</span>
                                            )}
                                        </div>
                                    </div>

                                    {results.suggestions?.length > 0 && (
                                        <div>
                                            <h4 className="text-sm font-bold text-primary mb-2">Suggestions to Improve</h4>
                                            <ul className="text-sm text-secondary space-y-1 pl-4 list-disc font-medium">
                                                {results.suggestions.map((sug: string, i: number) => (
                                                    <li key={i}>{sug}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* AI Improvement Actions */}
                                    <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-primary/10">
                                        <button
                                            onClick={handleImproveResume}
                                            disabled={isImproving}
                                            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-2.5 rounded-xl text-sm font-semibold transition-all"
                                        >
                                            {isImproving ? (
                                                <><Loader2 className="w-4 h-4 animate-spin" /> Improving Resume...</>
                                            ) : "✨ Improve Resume with AI"}
                                        </button>
                                        <button
                                            onClick={analyzeResume}
                                            disabled={isAnalyzing}
                                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-2.5 rounded-xl text-sm font-semibold transition-all"
                                        >
                                            Recalculate ATS Score
                                        </button>
                                        <button
                                            onClick={handleDownloadResume}
                                            disabled={!resumeText.trim()}
                                            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-2.5 rounded-xl text-sm font-semibold transition-all"
                                        >
                                            <Download className="w-4 h-4" /> Download Improved Resume
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
