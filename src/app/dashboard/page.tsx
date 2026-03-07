import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Resume } from "@/types/resume"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, MoreVertical, Pencil, Trash, Building2 } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function getRelativeTime(date: string | Date | undefined) {
    if (!date) return "unknown";
    const diff = Date.now() - new Date(date).getTime()

    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "just now"
    if (minutes < 60) return minutes + " minutes ago"
    if (hours < 24) return hours + " hours ago"
    return days + " days ago"
}

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    let resumes: Resume[] = []

    if (user) {
        const { data } = await supabase
            .from("resumes")
            .select("*")
            .eq("user_id", user.id)
            .order("updated_at", { ascending: false })

        if (data) {
            resumes = data as Resume[]
        }
    }

    return (
        <div className="space-y-8 max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-primary">Your Resumes</h1>
                    <p className="text-secondary mt-2 text-base font-medium">
                        Create, edit, and manage your professional resumes safely in the cloud.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/builder/new">
                        <Button className="gap-2 rounded-xl bg-gradient-to-b from-primary to-secondary text-white hover:opacity-90 shadow-[0_4px_15px_rgba(75,46,31,0.2)] hover:shadow-[0_6px_20px_rgba(216,184,156,0.3)] transition-all cursor-pointer hover:scale-[1.03] active:scale-[0.98]">
                            <Plus className="h-5 w-5" />
                            Create New Resume
                        </Button>
                    </Link>
                </div>
            </div>

            {resumes.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-20 mt-8 glass-panel border border-primary/20 border-dashed rounded-3xl text-center bg-card shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="h-20 w-20 bg-muted text-primary rounded-[2rem] flex items-center justify-center mb-8 shadow-inner border border-white">
                        <Building2 className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-3">No resumes yet</h3>
                    <p className="text-secondary max-w-md mb-10 font-medium leading-relaxed">
                        You haven't created any resumes. Start building your modern professional resume with our AI tools today.
                    </p>
                    <Link href="/builder/new">
                        <Button className="rounded-xl px-10 py-6 text-base bg-gradient-to-b from-primary to-secondary text-white hover:scale-105 transition-all shadow-[0_4px_20px_rgba(75,46,31,0.2)]">
                            <Plus className="mr-2 h-5 w-5" />
                            Start Building Now
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {resumes.map((resume) => (
                        <Card key={resume.id} className="flex flex-col mouse-tilt hover-glow glass-panel rounded-3xl border-white/60 bg-card overflow-hidden group shadow-sm hover:animate-lift transition-all duration-300">
                            <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0 relative border-b border-primary/5 bg-white/40 pt-6">
                                <CardTitle className="text-xl font-bold text-primary truncate pr-8">
                                    {resume.title || "Untitled Resume"}
                                </CardTitle>
                                <div className="absolute right-4 top-5">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-secondary hover:text-primary hover:bg-muted/50 rounded-lg">
                                                <span className="sr-only">Open menu</span>
                                                <MoreVertical className="h-5 w-5" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="rounded-xl bg-white border-primary/10 shadow-xl p-2 min-w-[160px]">
                                            <DropdownMenuItem asChild className="rounded-lg focus:bg-muted/30 cursor-pointer mb-1 p-2.5">
                                                <Link href={`/builder/${resume.id}`} className="flex items-center text-primary font-semibold">
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit Resume
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600 focus:text-red-700 focus:bg-red-50 rounded-lg cursor-pointer font-semibold p-2.5">
                                                <Trash className="mr-2 h-4 w-4" />
                                                Delete Permanently
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6 pb-8">
                                <CardDescription className="text-secondary font-medium text-base">
                                    {resume.content?.personalInfo?.jobTitle || "No title specified"}
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="mt-auto text-xs text-secondary/80 flex justify-between pt-6 pb-6 bg-primary/[0.02] border-t border-primary/5">
                                <span className="font-medium">Template: <span className="capitalize font-bold text-primary ml-1">{resume.template}</span></span>
                                <span className="font-medium bg-white/60 px-2.5 py-1 rounded-md border border-primary/5">
                                    {getRelativeTime(resume.updated_at || resume.created_at)}
                                </span>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
