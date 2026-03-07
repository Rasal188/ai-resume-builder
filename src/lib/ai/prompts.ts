export const Prompts = {
    generateSummary: (details: any) => `You are an expert resume writer. Given the following user details, generate a 3-sentence professional summary for their resume.
Do not wrap it in quotes. Return purely the summary text.

User Details:
${JSON.stringify(details, null, 2)}
`,

    improveBullet: (description: string, jobTitle: string) => `You are an expert resume writer. Rewrite the following experience bullet point to be more impactful.
Use strong action verbs, quantify results if possible, and highlight achievements. Target role: ${jobTitle}.

Original: "${description}"

Output exactly one solid bullet point or paragraph to replace it. Do not include introductory text.`,

    analyzeResume: (resumeText: string, jobDescription?: string) => {
        const jdSection = jobDescription?.trim() || "Not provided"

        return `You are an Applicant Tracking System (ATS) analyzer.

The following resume is encoded in BASE64 from a PDF file.

First decode the content and extract readable resume text.

Then analyze the resume against the optional job description.

Return ONLY valid JSON in this exact format:
{
  "score": number,
  "matchedKeywords": ["keyword1","keyword2"],
  "missingKeywords": ["keyword1","keyword2"],
  "suggestions": ["suggestion1","suggestion2"]
}

Rules:
* Return ONLY JSON.
* Do not include markdown.
* Do not include explanations.
* Do not include backticks.
* The response must start with { and end with }.

Resume (Base64 PDF):
${resumeText}

Job Description:
${jdSection}`
    },

    suggestSkills: (jobTitle: string) => `You are an expert technical recruiter. Suggest a list of top 10 relevant professional skills for a "${jobTitle}".
Return exactly a valid JSON array of strings. Examples: ["JavaScript", "React", "Team Leadership"].
Output ONLY the JSON array.`,

    generateCoverLetter: (resumeContext: string, jobTitle: string, jobDescription: string) => `You are an expert career coach and cover letter writer.
Write a professional, compelling cover letter for the position of "${jobTitle}".

Job Description:
${jobDescription}

Applicant Resume Details:
${resumeContext}

The cover letter should be 3-4 paragraphs. Be highly persuasive, highlighting the applicant's matching skills. Do not include placeholders for date/address, just write the body. Do not include markdown formatting. Return purely the text.`
};
