import { NextResponse } from "next/server"
import { getGroqClient } from "@/lib/ai/groq"

export async function POST(request: Request) {
    try {
        const { resumeText, jobDescription } = await request.json()

        if (!resumeText || resumeText.trim().length === 0) {
            return NextResponse.json(
                { error: "No resume text provided" },
                { status: 400 }
            )
        }

        const groq = getGroqClient()

        const prompt = `Analyze this resume for ATS compatibility.

Return ONLY valid JSON with this exact format and no other text:
{
  "score": number,
  "matchedKeywords": string[],
  "missingKeywords": string[],
  "suggestions": string[]
}

Resume:
${resumeText}

Job Description:
${jobDescription || "None"}`

        const aiPromise = groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.2,
        })

        const timeout = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("AI timeout")), 20000)
        )

        const completion = await Promise.race([aiPromise, timeout]) as Awaited<typeof aiPromise>

        const aiText = completion.choices[0].message.content ?? ""

        let result

        try {
            const jsonMatch = aiText.match(/{[\s\S]*}/)
            if (!jsonMatch) throw new Error("No JSON in AI response")
            result = JSON.parse(jsonMatch[0])
        } catch {
            result = {
                score: 50,
                matchedKeywords: [],
                missingKeywords: [],
                suggestions: ["AI response could not be parsed. Please try again."]
            }
        }

        // Normalize score to realistic range
        let score = Math.round(Number(result.score) || 50)
        score = jobDescription ? Math.max(score, 30) : Math.max(score, 40)
        score = Math.min(score, 95)
        result.score = score

        return NextResponse.json(result)
    } catch (error: any) {
        console.error("ATS Analysis Error:", error?.message)
        return NextResponse.json(
            { error: "ATS Analysis failed" },
            { status: 500 }
        )
    }
}
