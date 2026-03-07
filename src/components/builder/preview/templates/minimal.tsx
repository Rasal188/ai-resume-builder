import { ResumeData } from "@/types/resume"
import { format } from "date-fns"

export function TemplateMinimal({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, skills, projects, certifications, languages, achievements } = data

    return (
        <div className="p-10 font-serif text-gray-800 leading-relaxed bg-white h-full max-w-4xl mx-auto">
            {/* Header */}
            <header className="text-center mb-8 border-b border-gray-200 pb-6">
                <h1 className="text-3xl font-normal tracking-wide text-gray-900 mb-1">
                    {personalInfo.firstName || "First"} {personalInfo.lastName || "Last"}
                </h1>
                <p className="text-lg text-gray-500 italic mb-4">{personalInfo.jobTitle || "Job Title"}</p>

                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-gray-500">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span className="text-gray-300">•</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.location && <span className="text-gray-300">•</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                </div>
            </header>

            <div className="space-y-8 pl-4 border-l border-gray-100">
                {/* Summary */}
                {summary && (
                    <section className="relative">
                        <h2 className="text-sm font-semibold tracking-widest text-gray-500 uppercase absolute -translate-x-[6.5rem] top-1 w-20 text-right">Profile</h2>
                        <p className="text-gray-700 whitespace-pre-line text-justify">{summary}</p>
                    </section>
                )}

                {/* Experience */}
                {experience && experience.length > 0 && (
                    <section className="relative mt-8">
                        <h2 className="text-sm font-semibold tracking-widest text-gray-500 uppercase absolute -translate-x-[6.5rem] top-1 w-20 text-right">Experience</h2>
                        <div className="space-y-6">
                            {experience.map((exp) => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-semibold text-gray-900 text-lg">
                                            {exp.jobTitle || "Job Title"}
                                            <span className="font-normal text-gray-500 italic text-base ml-2">at {exp.company || "Company"}</span>
                                        </h3>
                                        <div className="text-sm text-gray-400 font-medium whitespace-nowrap">
                                            {exp.startDate ? format(new Date(exp.startDate), "MMM yyyy") : "Start"} — {" "}
                                            {exp.endDate ? format(new Date(exp.endDate), "MMM yyyy") : "Present"}
                                        </div>
                                    </div>
                                    {exp.description && (
                                        <div className="text-gray-700 text-sm mt-2 leading-relaxed whitespace-pre-line text-justify">
                                            {/* Render bullet points safely */}
                                            {exp.description.split('\n').map((line, i) => (
                                                <p key={i} className="mb-1 pl-3 -indent-3 before:content-['-'] before:mr-2 before:text-gray-400">
                                                    {line.replace(/^•\s*/, '').replace(/^-\s*/, '')}
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
                    <section className="relative mt-8">
                        <h2 className="text-sm font-semibold tracking-widest text-gray-500 uppercase absolute -translate-x-[6.5rem] top-1 w-20 text-right">Projects</h2>
                        <div className="space-y-6">
                            {projects.map((proj) => (
                                <div key={proj.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-semibold text-gray-900 text-lg">
                                            {proj.title || "Project Title"}
                                            {proj.link && (
                                                <a href={proj.link} target="_blank" rel="noopener noreferrer" className="ml-2 text-sm text-blue-500 hover:underline font-normal inline-block">
                                                    [Link]
                                                </a>
                                            )}
                                        </h3>
                                    </div>
                                    {proj.technologies && (
                                        <div className="text-sm text-gray-500 italic mb-2">Technologies: {proj.technologies}</div>
                                    )}
                                    {proj.description && (
                                        <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line text-justify">
                                            {proj.description.split('\n').map((line, i) => (
                                                <p key={i} className="mb-1 pl-3 -indent-3 before:content-['-'] before:mr-2 before:text-gray-400">
                                                    {line.replace(/^•\s*/, '').replace(/^-\s*/, '')}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                    <section className="relative mt-8">
                        <h2 className="text-sm font-semibold tracking-widest text-gray-500 uppercase absolute -translate-x-[6.5rem] top-1 w-20 text-right">Certifications</h2>
                        <div className="space-y-4">
                            {certifications.map((cert) => (
                                <div key={cert.id} className="flex justify-between items-baseline">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{cert.name || "Certificate"}</h3>
                                        <p className="text-gray-600">{cert.organization || "Organization"}</p>
                                    </div>
                                    <p className="text-sm text-gray-400 font-medium whitespace-nowrap">{cert.year || "Year"}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <section className="relative mt-8">
                        <h2 className="text-sm font-semibold tracking-widest text-gray-500 uppercase absolute -translate-x-[6.5rem] top-1 w-20 text-right">Education</h2>
                        <div className="space-y-4">
                            {education.map((edu) => (
                                <div key={edu.id} className="flex justify-between items-baseline">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{edu.degree || "Degree"}</h3>
                                        <p className="text-gray-600">{edu.school || "School"}</p>
                                    </div>
                                    <p className="text-sm text-gray-400 font-medium whitespace-nowrap">{edu.year || "Year"}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Achievements */}
                {achievements && achievements.length > 0 && (
                    <section className="relative mt-8">
                        <h2 className="text-sm font-semibold tracking-widest text-gray-500 uppercase absolute -translate-x-[6.5rem] top-1 w-20 text-right">Achievements</h2>
                        <div className="space-y-4">
                            {achievements.map((ach) => (
                                <div key={ach.id}>
                                    <h3 className="font-semibold text-gray-900 text-base">{ach.title || "Achievement"}</h3>
                                    {ach.description && <p className="text-sm text-gray-700 whitespace-pre-line text-justify mt-1">{ach.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                    <section className="relative mt-8">
                        <h2 className="text-sm font-semibold tracking-widest text-gray-500 uppercase absolute -translate-x-[6.5rem] top-1 w-20 text-right">Languages</h2>
                        <div className="flex flex-col gap-1 text-sm text-gray-700">
                            {languages.map((lang) => (
                                <div key={lang.id} className="flex gap-2">
                                    <span className="font-medium">{lang.language}:</span>
                                    <span className="text-gray-500 italic">{lang.proficiency}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <section className="relative mt-8">
                        <h2 className="text-sm font-semibold tracking-widest text-gray-500 uppercase absolute -translate-x-[6.5rem] top-1 w-20 text-right">Skills</h2>
                        <div className="flex flex-wrap gap-1.5 text-sm text-gray-700">
                            {skills.map((skill, i) => (
                                <span key={skill}>
                                    {skill}{i < skills.length - 1 ? <span className="text-gray-300 mx-1.5">&bull;</span> : null}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
