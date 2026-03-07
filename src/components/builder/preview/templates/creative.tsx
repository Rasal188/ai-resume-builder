import { ResumeData } from "@/types/resume"
import { format } from "date-fns"

export function TemplateCreative({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, skills, projects, certifications, languages, achievements } = data

    return (
        <div className="font-sans text-gray-800 leading-relaxed bg-neutral-50 h-full">
            {/* Header */}
            <header className="bg-primary/5 px-10 py-12 border-l-8 border-primary rounded-tl-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="relative z-10">
                    <h1 className="text-5xl font-black text-gray-900 mb-2 tracking-tight">
                        {personalInfo.firstName || "First"} <span className="text-primary font-light">{personalInfo.lastName || "Last"}</span>
                    </h1>
                    <p className="text-xl font-medium tracking-wide text-gray-600 mb-4 bg-primary/10 inline-block px-3 py-1 rounded-md">
                        {personalInfo.jobTitle || "Job Title"}
                    </p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 font-medium">
                        {personalInfo.email && <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary/50 rounded-full"></span>{personalInfo.email}</span>}
                        {personalInfo.phone && <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary/50 rounded-full"></span>{personalInfo.phone}</span>}
                        {personalInfo.location && <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary/50 rounded-full"></span>{personalInfo.location}</span>}
                    </div>
                </div>
            </header>

            <div className="p-10 space-y-10">
                {/* Summary */}
                {summary && (
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                            Profile
                            <span className="h-px bg-gray-200 flex-1 ml-2"></span>
                        </h2>
                        <p className="text-gray-700 whitespace-pre-line text-lg leading-relaxed font-light">{summary}</p>
                    </section>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Main Timeline (Experience) */}
                    <div className="lg:col-span-2 space-y-10">
                        {experience && experience.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    Experience
                                    <span className="h-px bg-gray-200 flex-1 ml-2"></span>
                                </h2>
                                <div className="space-y-8">
                                    {experience.map((exp) => (
                                        <div key={exp.id} className="relative pl-6">
                                            <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-primary/80 ring-4 ring-primary/20"></div>
                                            <div className="mb-2">
                                                <h3 className="font-bold text-gray-900 text-lg leading-tight">{exp.jobTitle || "Job Title"}</h3>
                                                <div className="flex flex-wrap items-center gap-x-2 text-sm text-gray-600 mt-1">
                                                    <span className="font-semibold text-primary">{exp.company || "Company"}</span>
                                                    <span className="text-gray-400">•</span>
                                                    <span>
                                                        {exp.startDate ? format(new Date(exp.startDate), "yyyy") : "Start"} — {" "}
                                                        {exp.endDate ? format(new Date(exp.endDate), "yyyy") : "Present"}
                                                    </span>
                                                </div>
                                            </div>
                                            {exp.description && (
                                                <div className="text-gray-600 text-sm space-y-2 whitespace-pre-line mt-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                                    {exp.description.split('\n').map((line, i) => (
                                                        <p key={i} className="flex items-start gap-2">
                                                            <svg className="w-4 h-4 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            <span>{line.replace(/^•\s*/, '')}</span>
                                                        </p>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Projects */}
                        {projects && projects.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    Projects
                                    <span className="h-px bg-gray-200 flex-1 ml-2"></span>
                                </h2>
                                <div className="space-y-8">
                                    {projects.map((proj) => (
                                        <div key={proj.id} className="relative pl-6">
                                            <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-primary/80 ring-4 ring-primary/20"></div>
                                            <div className="mb-2">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold text-gray-900 text-lg leading-tight">{proj.title || "Project Title"}</h3>
                                                    {proj.link && (
                                                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:underline">
                                                            [Link]
                                                        </a>
                                                    )}
                                                </div>
                                                <div className="flex flex-wrap items-center gap-x-2 text-sm text-gray-600 mt-1">
                                                    <span className="font-semibold text-primary">{proj.technologies || "Technologies"}</span>
                                                </div>
                                            </div>
                                            {proj.description && (
                                                <div className="text-gray-600 text-sm space-y-2 whitespace-pre-line mt-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                                    {proj.description.split('\n').map((line, i) => (
                                                        <p key={i} className="flex items-start gap-2">
                                                            <svg className="w-4 h-4 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            <span>{line.replace(/^•\s*/, '')}</span>
                                                        </p>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Achievements */}
                        {achievements && achievements.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    Achievements
                                    <span className="h-px bg-gray-200 flex-1 ml-2"></span>
                                </h2>
                                <div className="space-y-6">
                                    {achievements.map((ach) => (
                                        <div key={ach.id} className="relative pl-6">
                                            <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-primary/80 ring-4 ring-primary/20"></div>
                                            <div className="mb-2">
                                                <h3 className="font-bold text-gray-900 text-lg leading-tight">{ach.title || "Achievement Title"}</h3>
                                            </div>
                                            {ach.description && (
                                                <div className="text-gray-600 text-sm space-y-2 whitespace-pre-line mt-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                                    {ach.description}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Certifications */}
                        {certifications && certifications.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    Certifications
                                    <span className="h-px bg-gray-200 flex-1 ml-2"></span>
                                </h2>
                                <div className="space-y-6">
                                    {certifications.map((cert) => (
                                        <div key={cert.id} className="relative pl-6">
                                            <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-primary/80 ring-4 ring-primary/20"></div>
                                            <div className="mb-1">
                                                <h3 className="font-bold text-gray-900 text-lg leading-tight">{cert.name || "Certificate"}</h3>
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                <span className="font-semibold text-primary">{cert.organization || "Organization"}</span>
                                                <span className="text-gray-400 mx-2">•</span>
                                                <span>{cert.year || "Year"}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Sidebar (Edu, Skills, Lang) */}
                    <div className="space-y-10">
                        {education && education.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    Education
                                    <span className="h-px bg-gray-200 flex-1 ml-2"></span>
                                </h2>
                                <div className="space-y-6">
                                    {education.map((edu) => (
                                        <div key={edu.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:border-primary/30 transition-colors">
                                            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                                </svg>
                                            </div>
                                            <h3 className="font-bold text-gray-900 leading-tight">{edu.degree || "Degree"}</h3>
                                            <p className="text-gray-600 text-sm mt-1">{edu.school || "School"}</p>
                                            <p className="text-primary text-sm font-medium mt-2 bg-primary/5 inline-block px-2 py-0.5 rounded">{edu.year || "Year"}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {skills && skills.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    Expertise
                                    <span className="h-px bg-gray-200 flex-1 ml-2"></span>
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill) => (
                                        <span key={skill} className="bg-white border text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium hover:border-primary hover:text-primary transition-colors cursor-default shadow-sm text-center">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {languages && languages.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    Languages
                                    <span className="h-px bg-gray-200 flex-1 ml-2"></span>
                                </h2>
                                <div className="space-y-3">
                                    {languages.map((lang) => (
                                        <div key={lang.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
                                            <span className="font-bold text-gray-900">{lang.language}</span>
                                            <span className="text-sm font-medium text-primary bg-primary/5 px-2 py-1 rounded-md">{lang.proficiency}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
