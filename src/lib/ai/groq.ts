import Groq from "groq-sdk";

// Initialize on demand to prevent Next.js static build crashes
export const getGroqClient = () => {
    return new Groq({
        apiKey: process.env.GROQ_API_KEY || "",
    });
};
