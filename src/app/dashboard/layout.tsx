import { ReactNode } from "react"
import { FileText, UserCircle, Settings, LayoutTemplate, ShieldCheck } from "lucide-react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-grain bg-vignette">
            {/* Sidebar */}
            <aside className="w-64 border-r border-primary/10 glass-panel bg-card hidden md:flex flex-col relative z-10 transition-all duration-300">
                <div className="p-6 border-b border-primary/10">
                    <h2 className="font-bold text-primary tracking-tight text-lg">Workspace</h2>
                </div>
                <div className="flex-1 overflow-auto p-4 space-y-2">
                    <nav className="space-y-1.5">
                        <a
                            href="/dashboard"
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-primary bg-muted/80 hover:bg-muted transition-colors shadow-sm font-semibold border border-primary/10"
                        >
                            <FileText className="h-5 w-5" />
                            My Resumes
                        </a>
                        <a
                            href="/templates"
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-secondary hover:text-primary hover:bg-white/60 transition-colors font-medium border border-transparent hover:border-primary/5"
                        >
                            <LayoutTemplate className="h-5 w-5" />
                            Templates
                        </a>
                        <a
                            href="/ats-checker"
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-secondary hover:text-primary hover:bg-white/60 transition-colors font-medium border border-transparent hover:border-primary/5"
                        >
                            <ShieldCheck className="h-5 w-5" />
                            ATS Checker
                        </a>
                        <a
                            href="/settings"
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-secondary hover:text-primary hover:bg-white/60 transition-colors font-medium border border-transparent hover:border-primary/5"
                        >
                            <Settings className="h-5 w-5" />
                            Settings
                        </a>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-transparent relative z-10">
                <div className="h-full p-8">{children}</div>
            </main>
        </div>
    )
}
