import { NextResponse } from "next/server"
import { getGroqClient } from "@/lib/ai/groq"

export async function POST(req: Request) {
    try {
        const { resumeText, suggestions, missingKeywords } = await req.json()

        if (!resumeText || resumeText.trim().length === 0) {
            return NextResponse.json({ error: "No resume text provided" }, { status: 400 })
        }

        const groq = getGroqClient()

        const prompt = `Improve this resume for ATS optimization.

Rules:
* Keep the candidate's information accurate
* Add missing keywords where relevant
* Improve bullet points and wording
* Keep it concise and professional
* Maintain ATS-friendly formatting

Resume:
${resumeText}

Missing Keywords:
${Array.isArray(missingKeywords) ? missingKeywords.join(", ") : missingKeywords || "None"}

Suggestions:
${Array.isArray(suggestions) ? suggestions.join("\n") : suggestions || "None"}

Return ONLY the improved resume text. Do not include any explanation or commentary.`

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: "You are an expert resume writer and ATS optimization specialist." },
                { role: "user", content: prompt }
            ],
            temperature: 0.4,
        })

        const improvedResume = completion.choices?.[0]?.message?.content || resumeText

        return NextResponse.json({ improvedResume })
    } catch (error: any) {
        console.error("Improve Resume Error:", error?.message)
        return NextResponse.json({ error: "Failed to improve resume" }, { status: 500 })
    }
}
