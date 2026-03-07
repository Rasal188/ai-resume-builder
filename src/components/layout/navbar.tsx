"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { Hexagon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
    const pathname = usePathname()
    const [user, setUser] = useState<User | null>(null)
    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user)
        })

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null)
            }
        )

        return () => subscription.unsubscribe()
    }, [supabase.auth])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push("/")
    }

    // Don't show generic navbar in the builder
    if (pathname.startsWith("/builder")) {
        return null
    }

    return (
        <header className="sticky top-0 z-50 w-full flex items-center justify-between px-8 py-4 border-b border-primary/10 glass-panel shadow-sm">
            <div className="flex items-center gap-2">
                <Link href="/" className="flex items-center space-x-2 group">
                    <div className="bg-gradient-to-br from-primary to-secondary p-1.5 rounded-lg shadow-sm group-hover:shadow-[0_0_15px_rgba(216,184,156,0.5)] transition-all">
                        <Hexagon className="h-5 w-5 text-background fill-current opacity-90" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-primary">NichoAI</span>
                </Link>
            </div>

            <nav className="flex items-center gap-4">
                {user ? (
                    <>
                        <Link href="/dashboard">
                            <Button variant="ghost" className="text-secondary hover:text-primary hover:bg-muted/50 rounded-xl transition-all font-medium">
                                Dashboard
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            onClick={handleSignOut}
                            className="text-secondary hover:text-primary border-primary/20 rounded-xl hover:bg-muted/50 transition-all font-medium bg-card"
                        >
                            Sign Out
                        </Button>
                    </>
                ) : (
                    <>
                        <Link href="/login">
                            <Button variant="ghost" className="text-secondary hover:text-primary hover:bg-muted/50 rounded-xl transition-all font-medium">
                                Log in
                            </Button>
                        </Link>
                        <Link href="/signup">
                            <Button className="text-white bg-gradient-to-b from-primary to-secondary hover:opacity-90 rounded-xl transition-all font-medium shadow-[0_2px_10px_rgba(75,46,31,0.2)] hover:shadow-[0_4px_15px_rgba(216,184,156,0.4)] hover:scale-105 active:scale-95 duration-200">
                                Sign up
                            </Button>
                        </Link>
                    </>
                )}
            </nav>
        </header>
    )
}
