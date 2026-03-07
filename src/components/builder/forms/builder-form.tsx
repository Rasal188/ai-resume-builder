"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PersonalInfoForm } from "./personal-info-form"
import { SummaryForm } from "./summary-form"
import { ExperienceForm } from "./experience-form"
import { EducationForm } from "./education-form"
import { SkillsForm } from "./skills-form"
import { ProjectsForm } from "./projects-form"
import { CertificationsForm } from "./certifications-form"
import { LanguagesForm } from "./languages-form"
import { AchievementsForm } from "./achievements-form"
import { ScrollArea } from "@/components/ui/scroll-area"

export function BuilderForm() {
    return (
        <div className="h-full flex flex-col bg-transparent relative">
            <div className="p-6 border-b border-black/5 bg-[#f5f1e8]/40 backdrop-blur-md z-10 sticky top-0">
                <h2 className="text-2xl font-bold tracking-tight text-[#3b2a1f]">Resume Details</h2>
                <p className="text-sm text-[#8a7360] font-medium mt-1">
                    Fill out your information to generate your resume.
                </p>
            </div>

            <ScrollArea className="flex-1 p-6 pb-32 custom-scrollbar">
                <Accordion type="single" collapsible defaultValue="personal" className="space-y-4">

                    {/* 1. Personal Information */}
                    <AccordionItem value="personal" className="glass-panel border border-primary/10 rounded-2xl overflow-hidden shadow-sm data-[state=open]:shadow-md transition-all bg-white/60">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-white/40 text-lg font-bold text-primary data-[state=open]:border-b border-primary/5">
                            Personal Information
                        </AccordionTrigger>
                        <AccordionContent className="p-6 bg-transparent">
                            <PersonalInfoForm />
                        </AccordionContent>
                    </AccordionItem>

                    {/* 2. Professional Summary */}
                    <AccordionItem value="summary" className="glass-panel border border-primary/10 rounded-2xl overflow-hidden shadow-sm data-[state=open]:shadow-md transition-all bg-white/60">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-white/40 text-lg font-bold text-primary data-[state=open]:border-b border-primary/5">
                            Professional Summary
                        </AccordionTrigger>
                        <AccordionContent className="p-6 bg-transparent">
                            <SummaryForm />
                        </AccordionContent>
                    </AccordionItem>

                    {/* 3. Work Experience */}
                    <AccordionItem value="experience" className="glass-panel border border-primary/10 rounded-2xl overflow-hidden shadow-sm data-[state=open]:shadow-md transition-all bg-white/60">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-white/40 text-lg font-bold text-primary data-[state=open]:border-b border-primary/5">
                            Work Experience
                        </AccordionTrigger>
                        <AccordionContent className="p-6 bg-transparent">
                            <ExperienceForm />
                        </AccordionContent>
                    </AccordionItem>

                    {/* 4. Education */}
                    <AccordionItem value="education" className="glass-panel border border-primary/10 rounded-2xl overflow-hidden shadow-sm data-[state=open]:shadow-md transition-all bg-white/60">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-white/40 text-lg font-bold text-primary data-[state=open]:border-b border-primary/5">
                            Education
                        </AccordionTrigger>
                        <AccordionContent className="p-6 bg-transparent">
                            <EducationForm />
                        </AccordionContent>
                    </AccordionItem>

                    {/* 5. Skills */}
                    <AccordionItem value="skills" className="glass-panel border border-primary/10 rounded-2xl overflow-hidden shadow-sm data-[state=open]:shadow-md transition-all bg-white/60">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-white/40 text-lg font-bold text-primary data-[state=open]:border-b border-primary/5">
                            Skills
                        </AccordionTrigger>
                        <AccordionContent className="p-6 bg-transparent">
                            <SkillsForm />
                        </AccordionContent>
                    </AccordionItem>

                    {/* 6. Projects */}
                    <AccordionItem value="projects" className="glass-panel border border-primary/10 rounded-2xl overflow-hidden shadow-sm data-[state=open]:shadow-md transition-all bg-white/60">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-white/40 text-lg font-bold text-primary data-[state=open]:border-b border-primary/5">
                            Projects
                        </AccordionTrigger>
                        <AccordionContent className="p-6 bg-transparent">
                            <ProjectsForm />
                        </AccordionContent>
                    </AccordionItem>

                    {/* 7. Certifications */}
                    <AccordionItem value="certifications" className="glass-panel border border-primary/10 rounded-2xl overflow-hidden shadow-sm data-[state=open]:shadow-md transition-all bg-white/60">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-white/40 text-lg font-bold text-primary data-[state=open]:border-b border-primary/5">
                            Certifications
                        </AccordionTrigger>
                        <AccordionContent className="p-6 bg-transparent">
                            <CertificationsForm />
                        </AccordionContent>
                    </AccordionItem>

                    {/* 8. Languages */}
                    <AccordionItem value="languages" className="glass-panel border border-primary/10 rounded-2xl overflow-hidden shadow-sm data-[state=open]:shadow-md transition-all bg-white/60">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-white/40 text-lg font-bold text-primary data-[state=open]:border-b border-primary/5">
                            Languages
                        </AccordionTrigger>
                        <AccordionContent className="p-6 bg-transparent">
                            <LanguagesForm />
                        </AccordionContent>
                    </AccordionItem>

                    {/* 9. Achievements */}
                    <AccordionItem value="achievements" className="glass-panel border border-primary/10 rounded-2xl overflow-hidden shadow-sm data-[state=open]:shadow-md transition-all bg-white/60">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-white/40 text-lg font-bold text-primary data-[state=open]:border-b border-primary/5">
                            Achievements
                        </AccordionTrigger>
                        <AccordionContent className="p-6 bg-transparent">
                            <AchievementsForm />
                        </AccordionContent>
                    </AccordionItem>

                </Accordion>
            </ScrollArea>
        </div>
    )
}
