import { ResumeData } from "@/types/resume"
import { format } from "date-fns"

export function TemplateTech({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, skills, projects } = data

    return (
        <div className="p-10 font-mono text-gray-300 bg-[#0d1117] h-full min-h-screen">
            {/* Header */}
            <header className="mb-8 border-b border-gray-800 pb-6">
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                    $ {personalInfo.firstName || "dev"} <span className="text-[#3fb950]">{personalInfo.lastName || "name"}</span>
                </h1>
                <p className="text-lg text-[#8b949e] mb-4">&gt; {personalInfo.jobTitle || "software_engineer"}</p>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#8b949e]">
                    {personalInfo.email && <span>email: "{personalInfo.email}"</span>}
                    {personalInfo.phone && <span>tel: "{personalInfo.phone}"</span>}
                    {personalInfo.location && <span>loc: "{personalInfo.location}"</span>}
                </div>
            </header>

            {/* Summary */}
            {summary && (
                <section className="mb-8">
                    <h2 className="text-sm font-bold text-[#58a6ff] uppercase tracking-widest mb-3">## Summary</h2>
                    <p className="text-sm text-[#c9d1d9] whitespace-pre-line pl-4 border-l border-gray-800">{summary}</p>
                </section>
            )}

            {/* Experience */}
            {experience && experience.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-sm font-bold text-[#58a6ff] uppercase tracking-widest mb-4">## Experience</h2>
                    <div className="space-y-6">
                        {experience.map((exp) => (
                            <div key={exp.id} className="pl-4 border-l border-gray-800">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                                    <h3 className="font-bold text-white text-base">
                                        [{exp.jobTitle || "title"}] @ <span className="text-[#d2a8ff]">{exp.company || "company"}</span>
                                    </h3>
                                    <div className="text-xs text-[#8b949e] font-medium mt-1 sm:mt-0">
                    /* {exp.startDate ? format(new Date(exp.startDate), "yyyy-MM") : "start"} to {" "}
                                        {exp.endDate ? format(new Date(exp.endDate), "yyyy-MM") : "now"} */
                                    </div>
                                </div>
                                {exp.description && (
                                    <div className="text-[#c9d1d9] text-sm mt-2 leading-relaxed whitespace-pre-line">
                                        {/* Render bullet points safely */}
                                        {exp.description.split('\n').map((line, i) => (
                                            <p key={i} className="mb-1">
                                                <span className="text-[#3fb950] mr-2">{"=>"}</span>
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
                <section className="mb-8">
                    <h2 className="text-sm font-bold text-[#58a6ff] uppercase tracking-widest mb-4">## Projects</h2>
                    <div className="space-y-6">
                        {projects.map((proj) => (
                            <div key={proj.id} className="pl-4 border-l border-gray-800">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2 gap-2">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-white text-base">
                                            {proj.title || "title"}
                                        </h3>
                                        {proj.link && (
                                            <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs text-[#58a6ff] hover:underline">
                                                [ext_link]
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div className="text-[#d2a8ff] text-xs font-medium mb-2">
                                    stack: [{proj.technologies || "undefined"}]
                                </div>
                                {proj.description && (
                                    <div className="text-[#c9d1d9] text-sm mt-2 leading-relaxed whitespace-pre-line">
                                        {proj.description.split('\n').map((line, i) => (
                                            <p key={i} className="mb-1">
                                                <span className="text-[#3fb950] mr-2">{"=>"}</span>
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

            {/* Education & Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pl-4 border-l border-gray-800">
                {/* Education */}
                {education && education.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold text-[#58a6ff] uppercase tracking-widest mb-4">## Education</h2>
                        <div className="space-y-4">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <h3 className="font-bold text-white text-sm">
                                        {edu.degree || "degree"}
                                    </h3>
                                    <p className="text-[#8b949e] text-xs mt-1">
                                        {edu.school || "school"} | {edu.year || "year"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold text-[#58a6ff] uppercase tracking-widest mb-4">## Skills</h2>
                        <div className="flex flex-wrap gap-2 text-xs">
                            {skills.map((skill) => (
                                <span key={skill} className="bg-[#1f2428] border border-gray-700 text-[#c9d1d9] px-2 py-1 rounded">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
