import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

const templates = [
    {
        id: "modern",
        name: "Modern Minimalist",
        description: "Clean, elegant, and perfect for tech and creative roles.",
        badge: "Popular",
        accentColor: "bg-blue-500",
        preview: (
            <div className="w-full h-full bg-white p-4 flex flex-col gap-2">
                <div className="h-5 bg-blue-500 w-1/2 rounded-sm" />
                <div className="h-3 bg-blue-200 w-1/3 rounded-sm mb-3" />
                <div className="h-px bg-gray-200 w-full mb-3" />
                <div className="h-2.5 bg-gray-200 w-full rounded-sm" />
                <div className="h-2.5 bg-gray-200 w-5/6 rounded-sm" />
                <div className="h-2.5 bg-gray-200 w-4/6 rounded-sm" />
                <div className="h-2.5 bg-gray-100 w-full rounded-sm mt-3" />
                <div className="h-2.5 bg-gray-100 w-5/6 rounded-sm" />
            </div>
        )
    },
    {
        id: "professional",
        name: "Corporate Professional",
        description: "Classic structure optimized for traditional corporate environments.",
        badge: null,
        accentColor: "bg-gray-800",
        preview: (
            <div className="w-full h-full bg-gray-50 p-4 flex flex-col gap-2">
                <div className="h-8 bg-gray-800 w-full rounded-sm flex items-center px-3">
                    <div className="h-3 bg-white/60 w-1/3 rounded-sm" />
                </div>
                <div className="h-2.5 bg-gray-300 w-full rounded-sm mt-2" />
                <div className="h-2.5 bg-gray-300 w-full rounded-sm" />
                <div className="h-2.5 bg-gray-300 w-5/6 rounded-sm" />
                <div className="h-2.5 bg-gray-200 w-full rounded-sm mt-2" />
                <div className="h-2.5 bg-gray-200 w-4/6 rounded-sm" />
            </div>
        )
    },
    {
        id: "creative",
        name: "Creative Designer",
        description: "Stand out with a unique layout designed for portfolios and design roles.",
        badge: null,
        accentColor: "bg-purple-500",
        preview: (
            <div className="w-full h-full bg-white p-3 flex gap-3">
                <div className="w-1/3 bg-purple-100 rounded-sm flex flex-col items-center pt-3 gap-2">
                    <div className="w-10 h-10 rounded-full bg-purple-400" />
                    <div className="h-2 bg-purple-200 w-2/3 rounded-sm" />
                    <div className="h-2 bg-purple-200 w-1/2 rounded-sm" />
                    <div className="h-2 bg-purple-200 w-2/3 rounded-sm mt-2" />
                </div>
                <div className="flex-1 flex flex-col gap-2 pt-2">
                    <div className="h-4 bg-purple-500 w-3/4 rounded-sm" />
                    <div className="h-2.5 bg-gray-200 w-full rounded-sm" />
                    <div className="h-2.5 bg-gray-200 w-5/6 rounded-sm" />
                    <div className="h-2.5 bg-gray-200 w-4/6 rounded-sm" />
                    <div className="h-2.5 bg-gray-100 w-full rounded-sm mt-2" />
                    <div className="h-2.5 bg-gray-100 w-5/6 rounded-sm" />
                </div>
            </div>
        )
    },
    {
        id: "executive",
        name: "Executive Leadership",
        description: "Focused on highlighting major achievements and leadership experience.",
        badge: "Premium",
        accentColor: "bg-amber-700",
        preview: (
            <div className="w-full h-full bg-amber-50 p-4 flex flex-col gap-2">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-amber-700 flex-shrink-0" />
                    <div className="flex flex-col gap-1.5">
                        <div className="h-3.5 bg-amber-700 w-24 rounded-sm" />
                        <div className="h-2.5 bg-amber-300 w-16 rounded-sm" />
                    </div>
                </div>
                <div className="h-px bg-amber-300 w-full mb-1" />
                <div className="h-2.5 bg-amber-200 w-full rounded-sm" />
                <div className="h-2.5 bg-amber-200 w-5/6 rounded-sm" />
                <div className="h-2.5 bg-amber-100 w-4/6 rounded-sm" />
            </div>
        )
    },
    {
        id: "startup",
        name: "Startup Tech",
        description: "High impact, single-page summary for fast-paced startup applications.",
        badge: null,
        accentColor: "bg-green-500",
        preview: (
            <div className="w-full h-full bg-gray-900 p-4 flex flex-col gap-2">
                <div className="h-5 bg-green-400 w-2/3 rounded-sm" />
                <div className="h-3 bg-green-700 w-1/3 rounded-sm mb-2" />
                <div className="flex gap-1.5 mb-3">
                    <div className="h-5 bg-green-500/30 border border-green-500/50 rounded-full px-2 w-14" />
                    <div className="h-5 bg-green-500/30 border border-green-500/50 rounded-full px-2 w-16" />
                    <div className="h-5 bg-green-500/30 border border-green-500/50 rounded-full px-2 w-12" />
                </div>
                <div className="h-2.5 bg-gray-700 w-full rounded-sm" />
                <div className="h-2.5 bg-gray-700 w-5/6 rounded-sm" />
                <div className="h-2.5 bg-gray-600 w-4/6 rounded-sm" />
            </div>
        )
    },
    {
        id: "academic",
        name: "Academic CV",
        description: "Detailed structure for research, publications, and academic history.",
        badge: null,
        accentColor: "bg-sky-700",
        preview: (
            <div className="w-full h-full bg-white p-4 flex flex-col gap-2">
                <div className="text-center flex flex-col items-center gap-1.5 mb-2">
                    <div className="h-4 bg-sky-800 w-1/2 rounded-sm" />
                    <div className="h-2.5 bg-sky-300 w-1/3 rounded-sm" />
                    <div className="h-2 bg-gray-200 w-2/3 rounded-sm" />
                </div>
                <div className="h-px bg-sky-700 w-full mb-1" />
                <div className="h-2.5 bg-sky-100 w-1/3 rounded-sm font-bold" />
                <div className="h-2 bg-gray-200 w-full rounded-sm" />
                <div className="h-2 bg-gray-200 w-5/6 rounded-sm" />
                <div className="h-2.5 bg-sky-100 w-1/3 rounded-sm mt-1" />
                <div className="h-2 bg-gray-200 w-full rounded-sm" />
                <div className="h-2 bg-gray-200 w-4/6 rounded-sm" />
            </div>
        )
    },
]

export default function TemplatesPage() {
    return (
        <div className="min-h-screen bg-grain bg-vignette flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-radial-glow pointer-events-none z-0 opacity-50" />

            <header className="py-6 px-8 border-b border-primary/10 glass-panel bg-card/60 sticky top-0 z-20">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/">
                        <Button variant="ghost" size="icon" className="hover:bg-muted/50 text-secondary hover:text-primary rounded-xl">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <span className="font-bold text-xl text-primary">Templates</span>
                    <div className="w-10" />
                </div>
            </header>

            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-16 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-4">Choose Your Resume Template</h1>
                    <p className="text-secondary font-medium text-lg">Professionally designed templates optimised for ATS and human readers. Pick one to start building.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            className="bg-card glass-panel rounded-3xl border border-primary/5 flex flex-col overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(75,46,31,0.18)] hover:-translate-y-2 hover:border-primary/20"
                        >
                            {/* Preview Area — blur/effects only here, NOT on the whole card */}
                            <div className="relative overflow-hidden group">
                                <div className="w-full aspect-[3/4] overflow-hidden transition-transform duration-500 group-hover:scale-105">
                                    {template.preview}
                                </div>

                                {/* Badge */}
                                {template.badge && (
                                    <span className={`absolute top-3 right-3 text-[10px] uppercase font-bold px-2.5 py-1 rounded-full text-white shadow ${template.accentColor}`}>
                                        {template.badge}
                                    </span>
                                )}
                            </div>

                            {/* Card Footer — always clear and clickable */}
                            <div className="p-5 flex flex-col gap-3">
                                <div>
                                    <h3 className="text-lg font-bold text-primary">{template.name}</h3>
                                    <p className="text-secondary text-sm font-medium leading-relaxed mt-0.5">{template.description}</p>
                                </div>
                                <div className="flex gap-2 mt-1">
                                    <Link href={`/builder/new?template=${template.id}`} className="flex-1">
                                        <Button className="w-full rounded-xl bg-gradient-to-b from-primary to-secondary text-white hover:opacity-90 font-bold text-sm shadow-sm">
                                            Use Template
                                        </Button>
                                    </Link>
                                    <Link href={`/builder/new?template=${template.id}&preview=true`}>
                                        <Button variant="outline" className="rounded-xl border-primary/20 text-primary hover:bg-primary/5 font-semibold text-sm">
                                            Preview
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}
