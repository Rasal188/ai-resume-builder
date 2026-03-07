import { ResumeData } from "@/types/resume"
import { format } from "date-fns"

export function TemplateProfessional({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, skills, projects, certifications, languages, achievements } = data

    return (
        <div className="p-10 font-serif text-slate-900 leading-normal bg-white h-full max-w-4xl mx-auto">
            {/* Header */}
            <header className="text-center mb-8 border-b-4 border-slate-900 pb-6">
                <h1 className="text-4xl font-extrabold uppercase tracking-wide text-slate-900 mb-1">
                    {personalInfo.firstName || "First"} {personalInfo.lastName || "Last"}
                </h1>
                <p className="text-lg font-medium tracking-widest text-slate-700 uppercase mb-3">
                    {personalInfo.jobTitle || "Job Title"}
                </p>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-slate-600">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.email && personalInfo.phone && <span>|</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.phone && personalInfo.location && <span>|</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                </div>
            </header>

            {/* Summary */}
            {summary && (
                <section className="mb-6">
                    <h2 className="text-md font-bold text-slate-900 uppercase tracking-wider mb-2 border-b border-slate-300 pb-1">Professional Summary</h2>
                    <p className="text-slate-700 text-sm whitespace-pre-line text-justify">{summary}</p>
                </section>
            )}

            {/* Experience */}
            {experience && experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-md font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-300 pb-1">Professional Experience</h2>
                    <div className="space-y-5">
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-slate-900 text-base">{exp.jobTitle || "Job Title"}</h3>
                                    <div className="text-sm text-slate-600 font-semibold italic">
                                        {exp.startDate ? format(new Date(exp.startDate), "MMM yyyy") : "Start"} – {" "}
                                        {exp.endDate ? format(new Date(exp.endDate), "MMM yyyy") : "Present"}
                                    </div>
                                </div>
                                <div className="text-slate-800 font-medium text-sm mb-2">{exp.company || "Company"}</div>
                                {exp.description && (
                                    <div className="text-slate-700 text-sm space-y-1 pl-4 whitespace-pre-line text-justify list-disc">
                                        {exp.description.split('\n').map((line, i) => (
                                            <p key={i} className="relative before:content-['•'] before:absolute before:-left-4 before:text-slate-500">
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
                <section className="mb-6">
                    <h2 className="text-md font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-300 pb-1">Projects</h2>
                    <div className="space-y-5">
                        {projects.map((proj) => (
                            <div key={proj.id}>
                                <div className="flex items-baseline mb-1 gap-2">
                                    <h3 className="font-bold text-slate-900 text-base">{proj.title || "Project Title"}</h3>
                                    {proj.link && (
                                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:underline">
                                            [Link]
                                        </a>
                                    )}
                                </div>
                                <div className="text-slate-800 font-medium text-sm mb-2 italic">Technologies: {proj.technologies || "N/A"}</div>
                                {proj.description && (
                                    <div className="text-slate-700 text-sm space-y-1 pl-4 whitespace-pre-line text-justify list-disc">
                                        {proj.description.split('\n').map((line, i) => (
                                            <p key={i} className="relative before:content-['•'] before:absolute before:-left-4 before:text-slate-500">
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

            {/* Education */}
            {education && education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-md font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-300 pb-1">Education</h2>
                    <div className="space-y-4">
                        {education.map((edu) => (
                            <div key={edu.id} className="flex justify-between items-baseline">
                                <div>
                                    <h3 className="font-bold text-slate-900 text-base">{edu.degree || "Degree"}</h3>
                                    <p className="text-slate-700 text-sm">{edu.school || "School / University"}</p>
                                </div>
                                <div className="text-sm text-slate-600 font-semibold italic">{edu.year || "Year"}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-md font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-300 pb-1">Certifications</h2>
                    <div className="space-y-4">
                        {certifications.map((cert) => (
                            <div key={cert.id} className="flex justify-between items-baseline">
                                <div>
                                    <h3 className="font-bold text-slate-900 text-base">{cert.name || "Certificate"}</h3>
                                    <p className="text-slate-700 text-sm">{cert.organization || "Organization"}</p>
                                </div>
                                <div className="text-sm text-slate-600 font-semibold italic">{cert.year || "Year"}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Achievements */}
            {achievements && achievements.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-md font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-300 pb-1">Achievements</h2>
                    <div className="space-y-4">
                        {achievements.map((ach) => (
                            <div key={ach.id}>
                                <h3 className="font-bold text-slate-900 text-base">{ach.title || "Achievement"}</h3>
                                {ach.description && <p className="text-slate-700 text-sm mt-1 whitespace-pre-line text-justify">{ach.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-md font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-300 pb-1">Languages</h2>
                    <div className="flex flex-col gap-1 text-sm text-slate-800">
                        {languages.map((lang) => (
                            <div key={lang.id} className="flex justify-between items-center max-w-sm">
                                <span className="font-semibold">{lang.language}</span>
                                <span className="text-slate-500 italic">{lang.proficiency}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills && skills.length > 0 && (
                <section>
                    <h2 className="text-md font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-300 pb-1">Core Competencies</h2>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-800">
                        {skills.map((skill) => (
                            <span key={skill} className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 bg-slate-400 rounded-full"></span>
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}
