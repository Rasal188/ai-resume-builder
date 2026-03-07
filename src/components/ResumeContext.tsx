"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import type { ResumeData, TemplateType } from "@/types/resume"
import { v4 as uuidv4 } from "uuid"

interface ResumeContextType {
    resumeData: ResumeData
    setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>
    template: TemplateType
    setTemplate: React.Dispatch<React.SetStateAction<TemplateType>>
    updatePersonalInfo: (data: Partial<ResumeData["personalInfo"]>) => void
    updateSummary: (summary: string) => void
    updateSkills: (skills: string[]) => void
    addExperience: () => void
    updateExperience: (id: string, data: Partial<ResumeData["experience"][0]>) => void
    removeExperience: (id: string) => void
    reorderExperience: (oldIndex: number, newIndex: number) => void
    addEducation: () => void
    updateEducation: (id: string, data: Partial<ResumeData["education"][0]>) => void
    removeEducation: (id: string) => void
    reorderEducation: (oldIndex: number, newIndex: number) => void
    addProject: () => void
    updateProject: (id: string, data: Partial<ResumeData["projects"][0]>) => void
    removeProject: (id: string) => void
    reorderProject: (oldIndex: number, newIndex: number) => void
    addCertification: () => void
    updateCertification: (id: string, data: Partial<ResumeData["certifications"][0]>) => void
    removeCertification: (id: string) => void
    addLanguage: () => void
    updateLanguage: (id: string, data: Partial<ResumeData["languages"][0]>) => void
    removeLanguage: (id: string) => void
    addAchievement: () => void
    updateAchievement: (id: string, data: Partial<ResumeData["achievements"][0]>) => void
    removeAchievement: (id: string) => void
}

const defaultResumeData: ResumeData = {
    personalInfo: {
        firstName: "",
        lastName: "",
        jobTitle: "",
        email: "",
        phone: "",
        location: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    achievements: [],
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

export function ResumeProvider({
    children,
    initialData,
    initialTemplate = "modern"
}: {
    children: ReactNode
    initialData?: ResumeData
    initialTemplate?: TemplateType
}) {
    const [resumeData, setResumeData] = useState<ResumeData>(initialData || defaultResumeData)
    const [template, setTemplate] = useState<TemplateType>(initialTemplate)

    const updatePersonalInfo = (data: Partial<ResumeData["personalInfo"]>) => {
        setResumeData((prev) => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, ...data },
        }))
    }

    const updateSummary = (summary: string) => {
        setResumeData((prev) => ({ ...prev, summary }))
    }

    const updateSkills = (skills: string[]) => {
        setResumeData((prev) => ({ ...prev, skills }))
    }

    const addExperience = () => {
        setResumeData((prev) => ({
            ...prev,
            experience: [
                ...prev.experience,
                {
                    id: uuidv4(),
                    jobTitle: "",
                    company: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                },
            ],
        }))
    }

    const updateExperience = (id: string, data: Partial<ResumeData["experience"][0]>) => {
        setResumeData((prev) => ({
            ...prev,
            experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, ...data } : exp)),
        }))
    }

    const removeExperience = (id: string) => {
        setResumeData((prev) => ({
            ...prev,
            experience: prev.experience.filter((exp) => exp.id !== id),
        }))
    }

    const reorderExperience = (oldIndex: number, newIndex: number) => {
        setResumeData((prev) => {
            const newExperience = [...prev.experience]
            const [movedItem] = newExperience.splice(oldIndex, 1)
            newExperience.splice(newIndex, 0, movedItem)
            return { ...prev, experience: newExperience }
        })
    }

    const addEducation = () => {
        setResumeData((prev) => ({
            ...prev,
            education: [
                ...prev.education,
                {
                    id: uuidv4(),
                    degree: "",
                    school: "",
                    year: "",
                },
            ],
        }))
    }

    const updateEducation = (id: string, data: Partial<ResumeData["education"][0]>) => {
        setResumeData((prev) => ({
            ...prev,
            education: prev.education.map((edu) => (edu.id === id ? { ...edu, ...data } : edu)),
        }))
    }

    const removeEducation = (id: string) => {
        setResumeData((prev) => ({
            ...prev,
            education: prev.education.filter((edu) => edu.id !== id),
        }))
    }

    const reorderEducation = (oldIndex: number, newIndex: number) => {
        setResumeData((prev) => {
            const newEducation = [...prev.education]
            const [movedItem] = newEducation.splice(oldIndex, 1)
            newEducation.splice(newIndex, 0, movedItem)
            return { ...prev, education: newEducation }
        })
    }

    const addProject = () => {
        setResumeData((prev) => ({
            ...prev,
            projects: [
                ...(prev.projects || []),
                {
                    id: uuidv4(),
                    title: "",
                    description: "",
                    technologies: "",
                    link: "",
                },
            ],
        }))
    }

    const updateProject = (id: string, data: Partial<ResumeData["projects"][0]>) => {
        setResumeData((prev) => ({
            ...prev,
            projects: (prev.projects || []).map((proj) => (proj.id === id ? { ...proj, ...data } : proj)),
        }))
    }

    const removeProject = (id: string) => {
        setResumeData((prev) => ({
            ...prev,
            projects: (prev.projects || []).filter((proj) => proj.id !== id),
        }))
    }

    const reorderProject = (oldIndex: number, newIndex: number) => {
        setResumeData((prev) => {
            const newProjects = [...(prev.projects || [])]
            const [movedItem] = newProjects.splice(oldIndex, 1)
            newProjects.splice(newIndex, 0, movedItem)
            return { ...prev, projects: newProjects }
        })
    }

    const addCertification = () => {
        setResumeData((prev) => ({
            ...prev,
            certifications: [
                ...(prev.certifications || []),
                {
                    id: uuidv4(),
                    name: "",
                    organization: "",
                    year: "",
                },
            ],
        }))
    }

    const updateCertification = (id: string, data: Partial<ResumeData["certifications"][0]>) => {
        setResumeData((prev) => ({
            ...prev,
            certifications: (prev.certifications || []).map((cert) => (cert.id === id ? { ...cert, ...data } : cert)),
        }))
    }

    const removeCertification = (id: string) => {
        setResumeData((prev) => ({
            ...prev,
            certifications: (prev.certifications || []).filter((cert) => cert.id !== id),
        }))
    }

    const addLanguage = () => {
        setResumeData((prev) => ({
            ...prev,
            languages: [
                ...(prev.languages || []),
                {
                    id: uuidv4(),
                    language: "",
                    proficiency: "",
                },
            ],
        }))
    }

    const updateLanguage = (id: string, data: Partial<ResumeData["languages"][0]>) => {
        setResumeData((prev) => ({
            ...prev,
            languages: (prev.languages || []).map((lang) => (lang.id === id ? { ...lang, ...data } : lang)),
        }))
    }

    const removeLanguage = (id: string) => {
        setResumeData((prev) => ({
            ...prev,
            languages: (prev.languages || []).filter((lang) => lang.id !== id),
        }))
    }

    const addAchievement = () => {
        setResumeData((prev) => ({
            ...prev,
            achievements: [
                ...(prev.achievements || []),
                {
                    id: uuidv4(),
                    title: "",
                    description: "",
                },
            ],
        }))
    }

    const updateAchievement = (id: string, data: Partial<ResumeData["achievements"][0]>) => {
        setResumeData((prev) => ({
            ...prev,
            achievements: (prev.achievements || []).map((ach) => (ach.id === id ? { ...ach, ...data } : ach)),
        }))
    }

    const removeAchievement = (id: string) => {
        setResumeData((prev) => ({
            ...prev,
            achievements: (prev.achievements || []).filter((ach) => ach.id !== id),
        }))
    }

    return (
        <ResumeContext.Provider
            value={{
                resumeData,
                setResumeData,
                template,
                setTemplate,
                updatePersonalInfo,
                updateSummary,
                updateSkills,
                addExperience,
                updateExperience,
                removeExperience,
                reorderExperience,
                addEducation,
                updateEducation,
                removeEducation,
                reorderEducation,
                addProject,
                updateProject,
                removeProject,
                reorderProject,
                addCertification,
                updateCertification,
                removeCertification,
                addLanguage,
                updateLanguage,
                removeLanguage,
                addAchievement,
                updateAchievement,
                removeAchievement,
            }}
        >
            {children}
        </ResumeContext.Provider>
    )
}

export function useResume() {
    const context = useContext(ResumeContext)
    if (context === undefined) {
        throw new Error("useResume must be used within a ResumeProvider")
    }
    return context
}
