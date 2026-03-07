import { getGroqClient } from "@/lib/ai/groq"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const jobTitle = body.jobTitle || ""
        const experience = body.experience || ""
        const skills = body.skills || ""

        if (!jobTitle && !experience && !skills) {
            return new Response("Missing resume data", { status: 400 })
        }

        const systemPrompt = `You are a professional resume writer.

Generate a concise resume summary.

Rules:

* Return ONLY the summary paragraph.
* No explanations.
* No headings.
* No bullet points.
* Maximum 3-4 sentences.`;

        const prompt = `Job Title: ${jobTitle}
Experience: ${experience}
Skills: ${skills}

Write a professional resume summary.`;

        const groq = getGroqClient()
        const completion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
        })

        return Response.json({
            summary: completion.choices[0]?.message?.content?.trim() || ""
        })
    } catch (error) {
        console.error("Generate summary error:", error)
        return new Response("Failed to generate summary", { status: 500 })
    }
}

