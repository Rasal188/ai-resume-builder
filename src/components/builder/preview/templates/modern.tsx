import { ResumeData } from "@/types/resume"
import { format } from "date-fns"

export function TemplateModern({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, skills, projects, certifications, languages, achievements } = data

    return (
        <div className="p-10 font-sans text-gray-900 leading-relaxed bg-white h-full">
            {/* Header */}
            <header className="border-b-2 border-primary/80 pb-6 mb-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">
                    {personalInfo.firstName || "First"} <span className="text-primary">{personalInfo.lastName || "Last"}</span>
                </h1>
                <p className="text-xl text-gray-600 mb-4">{personalInfo.jobTitle || "Job Title"}</p>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                </div>
            </header>

            {/* Summary */}
            {summary && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-3 border-b pb-1">Professional Summary</h2>
                    <p className="text-gray-700 whitespace-pre-line">{summary}</p>
                </section>
            )}

            {/* Experience */}
            {experience && experience.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-4 border-b pb-1">Work Experience</h2>
                    <div className="space-y-6">
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-start mb-1">
                                    <div>
                                        <h3 className="font-bold text-gray-900">{exp.jobTitle || "Job Title"}</h3>
                                        <p className="text-primary font-medium">{exp.company || "Company"}</p>
                                    </div>
                                    <div className="text-sm text-gray-500 font-medium whitespace-nowrap text-right">
                                        {exp.startDate ? format(new Date(exp.startDate), "MMM yyyy") : "Start"} — {" "}
                                        {exp.endDate ? format(new Date(exp.endDate), "MMM yyyy") : "Present"}
                                    </div>
                                </div>
                                {exp.description && (
                                    <div className="text-gray-700 text-sm mt-2 space-y-1 pl-4 border-l-2 border-gray-100 whitespace-pre-line">
                                        {/* Render bullet points safely */}
                                        {exp.description.split('\n').map((line, i) => (
                                            <p key={i} className="relative before:content-['•'] before:absolute before:-left-4 before:text-gray-400">
                                                {line.replace(/^•\s*/, '')}
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
                <section className="mb-8">
                    <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-4 border-b pb-1">Projects</h2>
                    <div className="space-y-6">
                        {projects.map((proj) => (
                            <div key={proj.id}>
                                <div className="flex justify-between items-start mb-1">
                                    <div>
                                        <h3 className="font-bold text-gray-900">
                                            {proj.title || "Project Title"}
                                            {proj.link && (
                                                <a href={proj.link} target="_blank" rel="noopener noreferrer" className="ml-2 text-xs text-primary hover:underline font-normal inline-block">
                                                    Link ↗
                                                </a>
                                            )}
                                        </h3>
                                        <p className="text-primary font-medium text-sm">{proj.technologies || "Technologies Used"}</p>
                                    </div>
                                </div>
                                {proj.description && (
                                    <div className="text-gray-700 text-sm mt-2 space-y-1 pl-4 border-l-2 border-gray-100 whitespace-pre-line">
                                        {proj.description.split('\n').map((line, i) => (
                                            <p key={i} className="relative before:content-['•'] before:absolute before:-left-4 before:text-gray-400">
                                                {line.replace(/^•\s*/, '')}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education & Skills Grid */}
            <div className="grid grid-cols-2 gap-8">
                {/* Education */}
                {education && education.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-4 border-b pb-1">Education</h2>
                        <div className="space-y-4">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <h3 className="font-bold text-gray-900">{edu.degree || "Degree"}</h3>
                                    <p className="text-gray-600">{edu.school || "School"}</p>
                                    <p className="text-sm text-gray-500 mt-0.5">{edu.year || "Year"}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-4 border-b pb-1">Skills & Expertise</h2>
                        <div className="flex flex-wrap gap-2 text-sm">
                            {skills.map((skill) => (
                                <span key={skill} className="bg-gray-100 text-gray-800 px-2.5 py-1 rounded">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
                {/* Additional Info Grid */}
                <div className={`grid grid-cols-2 gap-8 mt-8 border-t-2 border-primary/20 pt-8 ${(!certifications?.length && !languages?.length && !achievements?.length) ? 'hidden' : ''}`}>

                    <div className="space-y-8">
                        {/* Certifications */}
                        {certifications && certifications.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-4 border-b pb-1">Certifications</h2>
                                <div className="space-y-4">
                                    {certifications.map((cert) => (
                                        <div key={cert.id}>
                                            <h3 className="font-bold text-gray-900">{cert.name || "Certificate"}</h3>
                                            <p className="text-gray-600">{cert.organization || "Organization"}</p>
                                            <p className="text-sm text-gray-500 mt-0.5">{cert.year || "Year"}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Languages */}
                        {languages && languages.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-4 border-b pb-1">Languages</h2>
                                <div className="space-y-2 text-sm text-gray-700">
                                    {languages.map((lang) => (
                                        <div key={lang.id} className="flex justify-between items-center border-b border-gray-100 pb-1">
                                            <span className="font-medium text-gray-900">{lang.language || "Language"}</span>
                                            <span className="text-primary italic">{lang.proficiency || "Proficiency"}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Achievements */}
                    {achievements && achievements.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-4 border-b pb-1">Achievements</h2>
                            <div className="space-y-4 text-sm text-gray-700">
                                {achievements.map((ach) => (
                                    <div key={ach.id} className="bg-gray-50/50 p-4 rounded-md border text-sm">
                                        <h3 className="font-bold text-gray-900 text-base mb-1">{ach.title || "Achievement"}</h3>
                                        {ach.description && <p className="whitespace-pre-line text-gray-600">{ach.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                </div>
            </div>
        </div>
    )
}
