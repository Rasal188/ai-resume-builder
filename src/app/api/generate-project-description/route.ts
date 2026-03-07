import { getGroqClient } from "@/lib/ai/groq"

export async function POST(req: Request) {
    try {
        const { title, technologies, existingDescription } = await req.json()

        if (!title && !technologies) {
            return new Response("Project title or technologies are required", { status: 400 })
        }

        const systemPrompt = `You are a professional resume writer. Write a concise project description highlighting technologies used, purpose of the project, and impact.

Rules:
* Keep it to 1-2 impactful sentences or 2-3 short bullet points.
* Make it action-oriented
* Return ONLY the improved description.`

        let promptInfo = `Title: ${title || 'N/A'}\nTechnologies: ${technologies || 'N/A'}`
        if (existingDescription) promptInfo += `\nExisting Description: ${existingDescription}`

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
                    content: promptInfo
                }
            ],
        })

        return Response.json({
            description: completion.choices[0]?.message?.content?.trim() || ""
        })
    } catch (error) {
        console.error("Generate project description error:", error)
        return new Response("Failed to generate project description", { status: 500 })
    }
}
