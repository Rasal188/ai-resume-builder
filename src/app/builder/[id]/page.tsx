import { createClient } from "@/lib/supabase/server"
import { BuilderForm } from "@/components/builder/forms/builder-form"
import { PreviewPane } from "@/components/builder/preview/preview-pane"
import { ResumeProvider } from "@/components/ResumeContext"
import { ResumeData, TemplateType } from "@/types/resume"
import { redirect } from "next/navigation"
import { BuilderHeader } from "@/components/builder/builder-header"

export default async function BuilderPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        redirect("/login")
    }

    let initialData: ResumeData | undefined
    let initialTemplate: TemplateType = "modern"

    if (id !== "new") {
        const { data: resume, error } = await supabase
            .from("resumes")
            .select("*")
            .eq("id", id)
            .eq("user_id", user.id)
            .single()

        if (error || !resume) {
            redirect("/dashboard")
        }

        initialData = resume.content as ResumeData
        initialTemplate = resume.template as TemplateType
    }

    return (
        <ResumeProvider initialData={initialData} initialTemplate={initialTemplate}>
            <div className="flex flex-col h-screen overflow-hidden bg-grain bg-vignette relative">
                {/* Ambient Glow */}
                <div className="absolute top-[20%] left-[-10%] w-[30%] h-[50%] bg-accent rounded-full blur-[140px] opacity-20 animate-float pointer-events-none z-0" />
                <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-secondary rounded-full blur-[150px] opacity-10 animate-float-delayed pointer-events-none z-0" />

                {/* Top specific Builder Navbar */}
                <BuilderHeader resumeId={id} />

                {/* Builder Split Layout */}
                <div className="flex-1 flex flex-col md:flex-row overflow-hidden p-4 md:p-6 gap-6 relative z-10 perspective-[1000px]">
                    {/* Left Panel: Form */}
                    <div className="w-full md:w-[45%] lg:w-[40%] h-full shrink-0 bg-card glass-panel rounded-3xl shadow-sm hover:shadow-md border border-white/60 overflow-hidden flex flex-col mouse-tilt transition-shadow duration-300">
                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            <BuilderForm />
                        </div>
                    </div>

                    {/* Right Panel: Live Preview */}
                    <div className="w-full md:w-[55%] lg:w-[60%] h-full shrink-0 bg-white/40 glass-panel rounded-3xl shadow-sm hover:shadow-md border border-white/60 flex overflow-hidden mouse-tilt transition-shadow duration-300 relative">
                        <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />
                        <div className="flex-1 bg-transparent p-6 overflow-auto custom-scrollbar flex justify-center items-start relative z-10">
                            <div className="w-full max-w-[850px] bg-white shadow-[0_10px_40px_rgba(75,46,31,0.08)] rounded-md overflow-hidden transition-all hover-glow border border-primary/5">
                                <PreviewPane />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ResumeProvider>
    )
}
