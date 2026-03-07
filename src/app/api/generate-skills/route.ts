import { NextResponse } from "next/server"
import { getGroqClient } from "@/lib/ai/groq"
import { Prompts } from "@/lib/ai/prompts"

export async function POST(req: Request) {
    try {
        const { jobTitle } = await req.json()

        if (!jobTitle) {
            return NextResponse.json({ error: "Job title is required" }, { status: 400 })
        }

        const prompt = Prompts.suggestSkills(jobTitle)

        const groq = getGroqClient()
        const completion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "system",
                    content: "You are an expert technical recruiter."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
        })

        let rawOutput = completion.choices[0]?.message?.content?.trim() || "[]"

        if (rawOutput.startsWith("```json")) {
            rawOutput = rawOutput.replace(/```json/g, "").replace(/```/g, "").trim()
        }

        let skillsResult
        try {
            skillsResult = JSON.parse(rawOutput)
        } catch (parseError) {
            console.error("JSON parse error:", rawOutput)
            throw new Error("Failed to parse skills into JSON")
        }

        return NextResponse.json({ skills: skillsResult })
    } catch (error) {
        console.error("Generate skills error:", error)
        return NextResponse.json(
            { error: "Failed to generate skills" },
            { status: 500 }
        )
    }
}
