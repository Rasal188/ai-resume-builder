import { NextResponse } from "next/server"
import { getGroqClient } from "@/lib/ai/groq"
import { Prompts } from "@/lib/ai/prompts"

export async function POST(req: Request) {
    try {
        const { jobTitle, jobDescription, resumeContext } = await req.json()

        if (!jobTitle || !jobDescription || !resumeContext) {
            return NextResponse.json({ error: "Job Title, Description, and Resume context are required" }, { status: 400 })
        }

        const prompt = Prompts.generateCoverLetter(resumeContext, jobTitle, jobDescription)

        const groq = getGroqClient()
        const completion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "system",
                    content: "You are an expert career coach and cover letter writer. Return only the final letter text."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
        })

        const coverLetter = completion.choices[0]?.message?.content?.trim() || ""

        return NextResponse.json({ coverLetter })
    } catch (error) {
        console.error("Cover letter generation error:", error)
        return NextResponse.json(
            { error: "Failed to generate cover letter" },
            { status: 500 }
        )
    }
}
