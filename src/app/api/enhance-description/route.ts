import { getGroqClient } from "@/lib/ai/groq"

export async function POST(req: Request) {
    try {
        const { description } = await req.json()

        if (!description) {
            return new Response("Description is required", { status: 400 })
        }

        const systemPrompt = `You are an expert resume editor.

Improve the following resume bullet point.

Rules:

* Keep it concise
* Make it more impactful
* Use action verbs
* Do not add explanations
* Return ONLY the improved sentence.`;

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
                    content: description
                }
            ],
        })

        return Response.json({
            enhanced: completion.choices[0]?.message?.content?.trim() || ""
        })
    } catch (error) {
        console.error("Enhance description error:", error)
        return new Response("Failed to enhance description", { status: 500 })
    }
}
