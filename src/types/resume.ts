export type Experience = {
    id: string
    jobTitle: string
    company: string
    startDate: string
    endDate: string
    description: string
}

export type Education = {
    id: string
    degree: string
    school: string
    year: string
}

export type Project = {
    id: string
    title: string
    description: string
    technologies: string
    link?: string
}

export type Certification = {
    id: string
    name: string
    organization: string
    year: string
}

export type Language = {
    id: string
    language: string
    proficiency: string
}

export type Achievement = {
    id: string
    title: string
    description: string
}

export type ResumeData = {
    personalInfo: {
        firstName: string
        lastName: string
        jobTitle: string
        email: string
        phone: string
        location: string
    }
    summary: string
    experience: Experience[]
    education: Education[]
    skills: string[]
    projects: Project[]
    certifications: Certification[]
    languages: Language[]
    achievements: Achievement[]
}

export type TemplateType = "minimal" | "professional" | "modern" | "corporate" | "creative"

export type Resume = {
    id: string
    user_id: string
    title: string
    content: ResumeData
    template: TemplateType
    created_at: string
    updated_at: string
}
