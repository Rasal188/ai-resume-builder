import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const supabase = await createClient()

        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const { id, resume_data } = body

        if (!resume_data) {
            return NextResponse.json({ error: "Resume data is required" }, { status: 400 })
        }

        const isNew = id === "new"

        const title = `${resume_data.personalInfo?.firstName || 'Untitled'} ${resume_data.personalInfo?.lastName || 'Resume'}`.trim() || 'Untitled Resume'

        let result
        if (isNew) {
            const { data, error } = await supabase
                .from("resumes")
                .insert({
                    user_id: user.id,
                    title: title,
                    content: resume_data,
                    template: resume_data.template || 'modern',
                })
                .select()
                .single()

            if (error) throw error
            result = data
        } else {
            const { data, error } = await supabase
                .from("resumes")
                .update({
                    title: title,
                    content: resume_data,
                    template: resume_data.template || 'modern',
                    updated_at: new Date().toISOString(),
                })
                .eq("id", id)
                .eq("user_id", user.id)
                .select()
                .single()

            if (error) throw error
            result = data
        }

        return NextResponse.json({
            success: true,
            message: "Resume saved successfully",
            resumeId: result.id
        })

    } catch (error) {
        console.error("Save resume error:", error)
        return NextResponse.json(
            { error: "Failed to save resume" },
            { status: 500 }
        )
    }
}
