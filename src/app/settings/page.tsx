"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, User, Bell, Shield, Trash2, Save, Loader2, CheckCircle2, AlertTriangle } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

type Profile = {
    id: string
    name: string
    email: string
    job_title: string
    email_notifications: boolean
    autosave_resumes: boolean
}

export default function SettingsPage() {
    const router = useRouter()
    const supabase = createClient()

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null)
    const [userId, setUserId] = useState<string | null>(null)

    // Form state
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [jobTitle, setJobTitle] = useState("")
    const [emailNotifications, setEmailNotifications] = useState(true)
    const [autoSave, setAutoSave] = useState(true)

    // Password state
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordSaving, setPasswordSaving] = useState(false)

    const showToast = (type: "success" | "error", message: string) => {
        setToast({ type, message })
        setTimeout(() => setToast(null), 3000)
    }

    // Load profile on mount
    useEffect(() => {
        const loadProfile = async () => {
            setLoading(true)
            try {
                const { data: { user }, error: userError } = await supabase.auth.getUser()
                if (userError || !user) { router.push("/auth/login"); return }

                setUserId(user.id)

                const { data: profile, error } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", user.id)
                    .single()

                if (error && error.code === "PGRST116") {
                    // Profile doesn't exist — auto-create it
                    await supabase.from("profiles").insert({
                        id: user.id,
                        email: user.email ?? "",
                        name: user.user_metadata?.full_name ?? "",
                        job_title: "",
                        email_notifications: true,
                        autosave_resumes: true,
                    })
                    setEmail(user.email ?? "")
                    setName(user.user_metadata?.full_name ?? "")
                } else if (profile) {
                    setName(profile.name ?? "")
                    setEmail(profile.email ?? user.email ?? "")
                    setJobTitle(profile.job_title ?? "")
                    setEmailNotifications(profile.email_notifications ?? true)
                    setAutoSave(profile.autosave_resumes ?? true)
                }
            } catch (err) {
                showToast("error", "Failed to load profile.")
            } finally {
                setLoading(false)
            }
        }

        loadProfile()
    }, [])

    const handleSaveProfile = async () => {
        if (!userId) return
        setSaving(true)
        try {
            const { error } = await supabase.from("profiles").upsert({
                id: userId,
                name,
                email,
                job_title: jobTitle,
                email_notifications: emailNotifications,
                autosave_resumes: autoSave,
            })
            if (error) throw error
            showToast("success", "Settings saved successfully!")
        } catch (err) {
            showToast("error", "Failed to save settings.")
        } finally {
            setSaving(false)
        }
    }

    const handleUpdatePassword = async () => {
        if (!newPassword || newPassword !== confirmPassword) {
            showToast("error", "Passwords do not match.")
            return
        }
        setPasswordSaving(true)
        try {
            const { error } = await supabase.auth.updateUser({ password: newPassword })
            if (error) throw error
            setNewPassword("")
            setConfirmPassword("")
            showToast("success", "Password updated successfully!")
        } catch (err) {
            showToast("error", "Failed to update password.")
        } finally {
            setPasswordSaving(false)
        }
    }

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete your account? This action cannot be undone and all your resumes and data will be permanently lost."
        )
        if (!confirmed || !userId) return
        setDeleting(true)
        try {
            // Delete resumes
            await supabase.from("resumes").delete().eq("user_id", userId)
            // Delete profile
            await supabase.from("profiles").delete().eq("id", userId)
            // Sign out
            await supabase.auth.signOut()
            router.push("/")
        } catch (err) {
            showToast("error", "Failed to delete account. Please try again.")
            setDeleting(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-grain bg-vignette flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-grain bg-vignette flex flex-col relative overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-radial-glow pointer-events-none z-0 opacity-30" />

            {/* Toast */}
            {toast && (
                <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl font-semibold text-sm animate-in slide-in-from-bottom-4 duration-300 ${toast.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                    {toast.type === "success" ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <AlertTriangle className="w-5 h-5 text-red-500" />}
                    {toast.message}
                </div>
            )}

            <header className="py-6 px-8 border-b border-primary/10 glass-panel bg-card/60 sticky top-0 z-20">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="icon" className="hover:bg-muted/50 text-secondary hover:text-primary rounded-xl">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <span className="font-bold text-xl text-primary">Settings</span>
                    <div className="w-10" />
                </div>
            </header>

            <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12 relative z-10 space-y-6">

                {/* Profile Information */}
                <section className="glass-panel bg-card border border-primary/5 rounded-3xl p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 bg-primary/10 rounded-xl"><User className="h-5 w-5 text-primary" /></div>
                        <h2 className="text-lg font-bold text-primary">Profile Information</h2>
                    </div>
                    <div className="grid gap-4">
                        <div>
                            <label className="text-sm font-semibold text-secondary block mb-1.5">Full Name</label>
                            <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="e.g. John Smith"
                                className="w-full bg-white/60 border border-primary/10 rounded-xl px-4 py-3 text-primary placeholder:text-secondary/50 font-medium focus:outline-none focus:ring-2 focus:ring-accent" />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-secondary block mb-1.5">Email Address</label>
                            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="e.g. john@example.com"
                                className="w-full bg-white/60 border border-primary/10 rounded-xl px-4 py-3 text-primary placeholder:text-secondary/50 font-medium focus:outline-none focus:ring-2 focus:ring-accent" />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-secondary block mb-1.5">Job Title</label>
                            <input value={jobTitle} onChange={e => setJobTitle(e.target.value)} type="text" placeholder="e.g. Senior Software Engineer"
                                className="w-full bg-white/60 border border-primary/10 rounded-xl px-4 py-3 text-primary placeholder:text-secondary/50 font-medium focus:outline-none focus:ring-2 focus:ring-accent" />
                        </div>
                    </div>
                    <button onClick={handleSaveProfile} disabled={saving}
                        className="mt-6 flex items-center gap-2 bg-gradient-to-b from-primary to-secondary text-white px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-90 disabled:opacity-60 transition-all shadow-sm">
                        {saving ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</> : <><Save className="h-4 w-4" /> Save Changes</>}
                    </button>
                </section>

                {/* Preferences */}
                <section className="glass-panel bg-card border border-primary/5 rounded-3xl p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 bg-primary/10 rounded-xl"><Bell className="h-5 w-5 text-primary" /></div>
                        <h2 className="text-lg font-bold text-primary">Account Preferences</h2>
                    </div>
                    <div className="space-y-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-primary text-sm">Email Notifications</p>
                                <p className="text-secondary text-xs mt-0.5">Receive updates about your resume activity</p>
                            </div>
                            <button onClick={() => setEmailNotifications(!emailNotifications)}
                                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${emailNotifications ? "bg-primary" : "bg-gray-200"}`}>
                                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${emailNotifications ? "translate-x-7" : "translate-x-1"}`} />
                            </button>
                        </div>
                        <div className="h-px bg-primary/5" />
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-primary text-sm">Auto-save Resumes</p>
                                <p className="text-secondary text-xs mt-0.5">Automatically save changes as you type</p>
                            </div>
                            <button onClick={() => setAutoSave(!autoSave)}
                                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${autoSave ? "bg-primary" : "bg-gray-200"}`}>
                                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${autoSave ? "translate-x-7" : "translate-x-1"}`} />
                            </button>
                        </div>
                    </div>
                    <button onClick={handleSaveProfile} disabled={saving}
                        className="mt-6 flex items-center gap-2 bg-gradient-to-b from-primary to-secondary text-white px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-90 disabled:opacity-60 transition-all shadow-sm">
                        {saving ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</> : <><Save className="h-4 w-4" /> Save Preferences</>}
                    </button>
                </section>

                {/* Security */}
                <section className="glass-panel bg-card border border-primary/5 rounded-3xl p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 bg-primary/10 rounded-xl"><Shield className="h-5 w-5 text-primary" /></div>
                        <h2 className="text-lg font-bold text-primary">Security</h2>
                    </div>
                    <div className="grid gap-4">
                        <div>
                            <label className="text-sm font-semibold text-secondary block mb-1.5">New Password</label>
                            <input value={newPassword} onChange={e => setNewPassword(e.target.value)} type="password" placeholder="••••••••"
                                className="w-full bg-white/60 border border-primary/10 rounded-xl px-4 py-3 text-primary placeholder:text-secondary/50 font-medium focus:outline-none focus:ring-2 focus:ring-accent" />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-secondary block mb-1.5">Confirm New Password</label>
                            <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" placeholder="••••••••"
                                className="w-full bg-white/60 border border-primary/10 rounded-xl px-4 py-3 text-primary placeholder:text-secondary/50 font-medium focus:outline-none focus:ring-2 focus:ring-accent" />
                        </div>
                    </div>
                    <button onClick={handleUpdatePassword} disabled={passwordSaving}
                        className="mt-6 flex items-center gap-2 bg-gradient-to-b from-primary to-secondary text-white px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-90 disabled:opacity-60 transition-all shadow-sm">
                        {passwordSaving ? <><Loader2 className="h-4 w-4 animate-spin" /> Updating...</> : <><Save className="h-4 w-4" /> Update Password</>}
                    </button>
                </section>

                {/* Danger Zone */}
                <section className="glass-panel bg-card border border-red-200 rounded-3xl p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 bg-red-100 rounded-xl"><Trash2 className="h-5 w-5 text-red-600" /></div>
                        <h2 className="text-lg font-bold text-red-600">Danger Zone</h2>
                    </div>
                    <p className="text-sm text-secondary font-medium mb-5">
                        Deleting your account is permanent and cannot be undone. All your resumes and profile data will be lost forever.
                    </p>
                    <button onClick={handleDeleteAccount} disabled={deleting}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all">
                        {deleting ? <><Loader2 className="h-4 w-4 animate-spin" /> Deleting...</> : <><Trash2 className="h-4 w-4" /> Delete Account</>}
                    </button>
                </section>

            </main>
        </div>
    )
}
