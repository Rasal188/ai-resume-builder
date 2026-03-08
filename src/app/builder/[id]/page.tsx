import { createClient } from "@/lib/supabase/server"
import { ResumeProvider } from "@/components/ResumeContext"
import { ResumeData, TemplateType } from "@/types/resume"
import { redirect } from "next/navigation"
import { BuilderPageClient } from "@/components/builder/builder-page-client"

export default async function BuilderPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect("/login")

    let initialData: ResumeData | undefined
    let initialTemplate: TemplateType = "modern"

    if (id !== "new") {
        const { data: resume, error } = await supabase
            .from("resumes")
            .select("*")
            .eq("id", id)
            .eq("user_id", user.id)
            .single()

        if (error || !resume) redirect("/dashboard")

        initialData = resume.content as ResumeData
        initialTemplate = resume.template as TemplateType
    }

    return (
        <ResumeProvider initialData={initialData} initialTemplate={initialTemplate}>
            <BuilderPageClient resumeId={id} />
        </ResumeProvider>
    )
}
