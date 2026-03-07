import { ResumeData } from "@/types/resume"
import { format } from "date-fns"

export function TemplateCorporate({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, skills, projects, certifications, languages, achievements } = data

    return (
        <div className="font-sans text-gray-800 leading-relaxed bg-white h-full flex flex-col md:flex-row shadow-sm">
            {/* Left Column (Sidebar) */}
            <aside className="w-full md:w-1/3 bg-slate-100 p-8 border-r border-slate-200">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 leading-tight mb-2">
                        {personalInfo.firstName || "First"} <br /> {personalInfo.lastName || "Last"}
                    </h1>
                    <p className="text-primary font-bold tracking-wide uppercase text-sm">
                        {personalInfo.jobTitle || "Job Title"}
                    </p>
                </div>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-300 pb-1">Contact</h2>
                        <ul className="text-sm space-y-2 text-slate-700 break-words">
                            {personalInfo.email && <li className="font-medium">{personalInfo.email}</li>}
                            {personalInfo.phone && <li>{personalInfo.phone}</li>}
                            {personalInfo.location && <li>{personalInfo.location}</li>}
                        </ul>
                    </section>

                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-300 pb-1">Skills</h2>
                            <ul className="text-sm space-y-1.5 text-slate-700">
                                {skills.map((skill) => (
                                    <li key={skill} className="relative pl-3 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-primary before:rounded-sm">
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-300 pb-1">Education</h2>
                            <div className="space-y-4">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <h3 className="font-bold text-slate-800 text-sm">{edu.degree || "Degree"}</h3>
                                        <p className="text-slate-600 text-xs mt-0.5">{edu.school || "School"}</p>
                                        <p className="text-primary text-xs font-semibold mt-1">{edu.year || "Year"}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    {languages && languages.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-300 pb-1">Languages</h2>
                            <div className="space-y-2">
                                {languages.map((lang) => (
                                    <div key={lang.id} className="flex justify-between items-baseline gap-2">
                                        <h3 className="font-bold text-slate-800 text-sm">{lang.language}</h3>
                                        <p className="text-primary text-xs italic">{lang.proficiency}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </aside>

            {/* Right Column (Main Content) */}
            <main className="w-full md:w-2/3 p-8 md:p-10 bg-white">
                {summary && (
                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <span className="w-6 h-0.5 bg-primary"></span> Profile
                        </h2>
                        <p className="text-slate-700 text-sm whitespace-pre-line leading-relaxed">
                            {summary}
                        </p>
                    </section>
                )}

                {experience && experience.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <span className="w-6 h-0.5 bg-primary"></span> Experience
                        </h2>
                        <div className="space-y-6">
                            {experience.map((exp) => (
                                <div key={exp.id} className="relative pl-6 border-l-2 border-slate-200">
                                    <div className="absolute w-3 h-3 bg-white border-2 border-primary rounded-full -left-[7.5px] top-1"></div>
                                    <h3 className="font-bold text-slate-900 text-lg leading-tight">{exp.jobTitle || "Job Title"}</h3>
                                    <div className="text-slate-600 font-medium text-sm mt-1 mb-2">
                                        {exp.company || "Company"} &nbsp;|&nbsp;{" "}
                                        <span className="text-primary font-semibold">
                                            {exp.startDate ? format(new Date(exp.startDate), "MMM yyyy") : "Start"} - {" "}
                                            {exp.endDate ? format(new Date(exp.endDate), "MMM yyyy") : "Present"}
                                        </span>
                                    </div>
                                    {exp.description && (
                                        <div className="text-slate-700 text-sm space-y-1.5 whitespace-pre-line mt-2">
                                            {exp.description.split('\n').map((line, i) => (
                                                <p key={i} className="relative pl-4 before:content-['▹'] before:absolute before:left-0 before:text-primary before:font-bold">
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

                {projects && projects.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <span className="w-6 h-0.5 bg-primary"></span> Projects
                        </h2>
                        <div className="space-y-6">
                            {projects.map((proj) => (
                                <div key={proj.id} className="relative pl-6 border-l-2 border-slate-200">
                                    <div className="absolute w-3 h-3 bg-white border-2 border-primary rounded-full -left-[7.5px] top-1"></div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-slate-900 text-lg leading-tight">{proj.title || "Project Title"}</h3>
                                        {proj.link && (
                                            <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:underline">
                                                [Link]
                                            </a>
                                        )}
                                    </div>
                                    <div className="text-slate-600 font-medium text-sm mt-1 mb-2">
                                        <span className="text-primary font-semibold">Technologies: {proj.technologies || "N/A"}</span>
                                    </div>
                                    {proj.description && (
                                        <div className="text-slate-700 text-sm space-y-1.5 whitespace-pre-line mt-2">
                                            {proj.description.split('\n').map((line, i) => (
                                                <p key={i} className="relative pl-4 before:content-['▹'] before:absolute before:left-0 before:text-primary before:font-bold">
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
                {certifications && certifications.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <span className="w-6 h-0.5 bg-primary"></span> Certifications
                        </h2>
                        <div className="space-y-4">
                            {certifications.map((cert) => (
                                <div key={cert.id} className="relative pl-6 border-l-2 border-slate-200">
                                    <div className="absolute w-3 h-3 bg-white border-2 border-primary rounded-full -left-[7.5px] top-1"></div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-slate-900 text-lg leading-tight">{cert.name || "Certificate"}</h3>
                                    </div>
                                    <div className="text-slate-600 font-medium text-sm mt-1">
                                        {cert.organization || "Organization"} &nbsp;|&nbsp; <span className="text-primary font-semibold">{cert.year || "Year"}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {achievements && achievements.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <span className="w-6 h-0.5 bg-primary"></span> Achievements
                        </h2>
                        <div className="space-y-4">
                            {achievements.map((ach) => (
                                <div key={ach.id} className="relative pl-6 border-l-2 border-slate-200">
                                    <div className="absolute w-3 h-3 bg-white border-2 border-primary rounded-full -left-[7.5px] top-1"></div>
                                    <h3 className="font-bold text-slate-900 text-lg leading-tight">{ach.title || "Achievement"}</h3>
                                    {ach.description && (
                                        <p className="text-slate-700 text-sm whitespace-pre-line mt-2 text-justify mr-4">
                                            {ach.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    )
}
