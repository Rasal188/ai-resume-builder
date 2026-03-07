"use client"

import Link from "next/link"
import { Sparkles, LayoutTemplate, ShieldCheck, FileText, CheckCircle2, Zap, ArrowRight, Quote, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Home() {
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-73px)] relative bg-grain bg-vignette overflow-hidden">
      {/* Radial Background Glows beneath text */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-radial-glow pointer-events-none z-0" />
      <div className="absolute left-[-10%] top-[40%] w-[40%] h-[40%] bg-accent rounded-full blur-[140px] opacity-20 animate-float pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center pt-24 pb-16 px-6 lg:flex-row lg:justify-between max-w-7xl mx-auto w-full">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left pt-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-primary/10 text-primary text-sm font-medium mb-6 shadow-sm">
            <Sparkles className="h-4 w-4 text-accent" />
            <span>Introducing NichoAI</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-primary mb-6">
            Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">perfect</span> <br className="hidden md:block" />resume with AI
          </h1>

          <p className="text-secondary text-lg md:text-xl font-medium max-w-xl text-balance mb-10 leading-relaxed">
            Create ATS-optimized resumes with AI assistance and modern templates. Experience the future of career building.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/builder/new">
              <Button size="lg" className="px-8 py-7 rounded-2xl bg-gradient-to-b from-primary to-secondary text-white hover:opacity-90 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 font-medium shadow-[0_8px_30px_rgba(75,46,31,0.25)] hover:shadow-[0_12px_40px_rgba(216,184,156,0.3)] text-base">
                Create Resume
              </Button>
            </Link>
            <Link href="/templates">
              <Button variant="outline" size="lg" className="px-8 py-7 rounded-2xl border border-primary/20 bg-card text-primary hover:bg-white hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 font-medium text-base shadow-sm hover:shadow-md">
                Browse Templates
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Right: Floating Resume Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 2 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:w-1/2 hidden lg:flex justify-center mt-16 lg:mt-0 relative perspective-[1000px]"
        >
          <div className="glass-panel w-[400px] h-[500px] rounded-3xl p-6 shadow-2xl animate-float-delayed rotate-y-[-10deg] rotate-x-[5deg] border-2 border-white/60 relative overflow-hidden backdrop-blur-2xl">
            {/* Mock Resume Content */}
            <div className="w-full h-full flex flex-col gap-4 opacity-80">
              <div className="flex justify-between items-center border-b border-primary/10 pb-4">
                <div>
                  <div className="w-32 h-6 bg-primary/20 rounded-md mb-2"></div>
                  <div className="w-24 h-4 bg-primary/10 rounded-md"></div>
                </div>
                <div className="w-12 h-12 bg-accent/30 rounded-full"></div>
              </div>
              <div className="space-y-3 mt-2">
                <div className="w-full h-3 bg-primary/10 rounded-full"></div>
                <div className="w-5/6 h-3 bg-primary/10 rounded-full"></div>
                <div className="w-4/6 h-3 bg-primary/10 rounded-full"></div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <div className="px-3 py-1 bg-accent/20 rounded-lg text-xs font-medium text-primary shadow-sm border border-primary/5">React.js</div>
                <div className="px-3 py-1 bg-accent/20 rounded-lg text-xs font-medium text-primary shadow-sm border border-primary/5">TypeScript</div>
                <div className="px-3 py-1 bg-accent/20 rounded-lg text-xs font-medium text-primary shadow-sm border border-primary/5">Node.js</div>
                <div className="px-3 py-1 bg-accent/20 rounded-lg text-xs font-medium text-primary shadow-sm border border-primary/5">Tailwind</div>
              </div>
              <div className="mt-6 space-y-4">
                <div className="p-3 rounded-xl border border-primary/10 bg-white/50 space-y-2">
                  <div className="flex justify-between">
                    <div className="w-24 h-4 bg-primary/20 rounded"></div>
                    <div className="w-16 h-4 bg-primary/10 rounded"></div>
                  </div>
                  <div className="w-full h-2 bg-primary/10 rounded mt-2"></div>
                  <div className="w-full h-2 bg-primary/10 rounded"></div>
                </div>
                <div className="p-3 rounded-xl border border-primary/10 bg-white/50 space-y-2">
                  <div className="flex justify-between">
                    <div className="w-32 h-4 bg-primary/20 rounded"></div>
                    <div className="w-16 h-4 bg-primary/10 rounded"></div>
                  </div>
                  <div className="w-full h-2 bg-primary/10 rounded mt-2"></div>
                  <div className="w-full h-2 bg-primary/10 rounded"></div>
                </div>
              </div>
            </div>

            {/* Floating AI Badge */}
            <div className="absolute -right-4 top-1/4 bg-white shadow-xl rounded-full p-2.5 animate-bounce flex items-center justify-center border border-primary/10 z-20">
              <Sparkles className="h-5 w-5 text-accent" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* How it Works Section */}
      <section className="max-w-7xl mx-auto w-full px-6 py-20 relative z-10 border-t border-primary/5 mt-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary mb-4">How NichoAI Works</h2>
          <p className="text-secondary font-medium text-lg">Three simple steps to generate a luxury, high-converting resume.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-[50px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-primary/10 to-transparent z-0" />

          {/* Step 1 */}
          <div className="flex flex-col items-center text-center relative z-10">
            <div className="w-24 h-24 rounded-full bg-card border-[6px] border-[#f5f1e8] shadow-sm flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 rounded-full border border-primary/10" />
              <FileText className="h-8 w-8 text-secondary" />
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md">1</div>
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Enter Your Details</h3>
            <p className="text-secondary font-medium px-4">Fill in your basic information, work history, and education to build your foundation.</p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center relative z-10 mt-8 md:mt-0">
            <div className="w-24 h-24 rounded-full bg-card border-[6px] border-[#f5f1e8] shadow-sm flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 rounded-full border border-primary/10" />
              <Sparkles className="h-8 w-8 text-accent" />
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md">2</div>
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Let AI Enhance</h3>
            <p className="text-secondary font-medium px-4">Our advanced AI will rewrite and optimize your bullet points to sound highly professional.</p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center relative z-10 mt-8 md:mt-0">
            <div className="w-24 h-24 rounded-full bg-card border-[6px] border-[#f5f1e8] shadow-sm flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 rounded-full border border-primary/10" />
              <CheckCircle2 className="h-8 w-8 text-secondary" />
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md">3</div>
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Download & Apply</h3>
            <p className="text-secondary font-medium px-4">Export a perfectly formatted PDF that beats Applicant Tracking Systems.</p>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="max-w-7xl mx-auto w-full px-6 py-20 relative z-10 border-t border-primary/5">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary mb-4">Powerful Features</h2>
          <p className="text-secondary font-medium text-lg">Tools designed to accelerate your job hunt.</p>
        </div>
        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Card 1 */}
          <motion.div variants={itemVariants}>
            <Link href="/builder/new" className="block h-full">
              <div className="glass-panel rounded-[2rem] p-8 cursor-pointer mouse-tilt hover-glow hover:animate-lift h-full flex flex-col group overflow-hidden relative">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-accent/20 rounded-full blur-2xl group-hover:bg-accent/40 transition-colors" />
                <div className="h-14 w-14 bg-white/90 text-primary rounded-2xl flex items-center justify-center mb-6 shrink-0 shadow-sm border border-primary/10 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-secondary group-hover:text-white transition-all duration-300 relative z-10">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3 relative z-10">AI Content Generation</h3>
                <p className="text-secondary font-medium leading-relaxed relative z-10">
                  Let our AI effortlessly write your professional summary and enhance your work experience bullet points.
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={itemVariants}>
            <Link href="/templates" className="block h-full">
              <div className="glass-panel rounded-[2rem] p-8 cursor-pointer mouse-tilt hover-glow hover:animate-lift h-full flex flex-col group overflow-hidden relative">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-accent/20 rounded-full blur-2xl group-hover:bg-accent/40 transition-colors" />
                <div className="h-14 w-14 bg-white/90 text-primary rounded-2xl flex items-center justify-center mb-6 shrink-0 shadow-sm border border-primary/10 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-secondary group-hover:text-white transition-all duration-300 relative z-10">
                  <LayoutTemplate className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3 relative z-10">Modern Templates</h3>
                <p className="text-secondary font-medium leading-relaxed relative z-10">
                  Choose from professionally designed, ATS-friendly templates that exude luxury and minimalism.
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={itemVariants}>
            <Link href="/ats-checker" className="block h-full">
              <div className="glass-panel rounded-[2rem] p-8 cursor-pointer mouse-tilt hover-glow hover:animate-lift h-full flex flex-col group overflow-hidden relative">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-accent/20 rounded-full blur-2xl group-hover:bg-accent/40 transition-colors" />
                <div className="h-14 w-14 bg-white/90 text-primary rounded-2xl flex items-center justify-center mb-6 shrink-0 shadow-sm border border-primary/10 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-secondary group-hover:text-white transition-all duration-300 relative z-10">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3 relative z-10">ATS Score Checker</h3>
                <p className="text-secondary font-medium leading-relaxed relative z-10">
                  Compare your resume against job descriptions and get actionable feedback to maximize your match rate.
                </p>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Template Previews Section */}
      <section className="bg-primary/[0.02] w-full py-24 relative z-10 border-t border-b border-primary/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary mb-4">Stunning Templates</h2>
            <p className="text-secondary font-medium text-lg">Designed by experts to pass ATS scanners and impress human recruiters.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Template 1 */}
            <div className="glass-panel p-6 rounded-[2rem] bg-card border border-primary/5 shadow-sm hover:shadow-md transition-all group mouse-tilt hover-glow">
              <div className="w-full aspect-[1/1.4] bg-muted/40 rounded-2xl mb-6 flex flex-col p-4 relative overflow-hidden">
                <div className="w-1/2 h-3 bg-primary/20 rounded mb-2" />
                <div className="w-1/3 h-2 bg-primary/10 rounded mb-6" />
                <div className="w-full h-1.5 bg-primary/10 rounded mb-2" />
                <div className="w-4/5 h-1.5 bg-primary/10 rounded mb-2" />
                <div className="w-full h-10 bg-primary/5 rounded-lg mt-4 border border-primary/10" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">Modern Minimalist</h3>
              <Link href="/builder/new?template=modern" className="block w-full">
                <Button variant="outline" className="w-full rounded-xl border-primary/10 text-primary hover:bg-primary hover:text-white transition-all group-hover:border-primary">
                  Use Template <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Template 2 */}
            <div className="glass-panel p-6 rounded-[2rem] bg-card border border-primary/5 shadow-sm hover:shadow-md transition-all group mouse-tilt hover-glow">
              <div className="w-full aspect-[1/1.4] bg-muted/40 rounded-2xl mb-6 flex flex-col p-4 relative overflow-hidden">
                <div className="flex justify-between items-center mb-6 border-b border-primary/10 pb-2">
                  <div className="w-1/2 h-3 bg-primary/20 rounded" />
                  <div className="w-8 h-8 rounded-full bg-accent/30" />
                </div>
                <div className="w-full h-1.5 bg-primary/10 rounded mb-2" />
                <div className="w-5/6 h-1.5 bg-primary/10 rounded mb-4" />
                <div className="w-full h-10 bg-primary/5 rounded-lg mt-2 border border-primary/10" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">Creative Portfolio</h3>
              <Link href="/builder/new?template=creative" className="block w-full">
                <Button variant="outline" className="w-full rounded-xl border-primary/10 text-primary hover:bg-primary hover:text-white transition-all group-hover:border-primary">
                  Use Template <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Template 3 */}
            <div className="glass-panel p-6 rounded-[2rem] bg-card border border-primary/5 shadow-sm hover:shadow-md transition-all group mouse-tilt hover-glow">
              <div className="w-full aspect-[1/1.4] bg-muted/40 rounded-2xl mb-6 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                <div className="w-2/3 h-4 bg-primary/20 rounded mb-2 text-center" />
                <div className="w-1/3 h-2 bg-primary/10 rounded mb-6 text-center" />
                <div className="w-full h-1.5 bg-primary/10 rounded mb-2" />
                <div className="w-full h-1.5 bg-primary/10 rounded mb-2" />
                <div className="w-4/5 h-1.5 bg-primary/10 rounded" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">Executive Leadership</h3>
              <Link href="/builder/new?template=executive" className="block w-full">
                <Button variant="outline" className="w-full rounded-xl border-primary/10 text-primary hover:bg-primary hover:text-white transition-all group-hover:border-primary">
                  Use Template <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/templates">
              <Button variant="ghost" className="text-secondary hover:text-primary font-bold">View All Templates <ChevronRight className="w-4 h-4 ml-1" /></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto w-full px-6 py-24 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary mb-4">Loved by Professionals</h2>
          <p className="text-secondary font-medium text-lg">Join thousands who have already landed their dream roles.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Review 1 */}
          <div className="glass-panel p-8 rounded-3xl bg-card border border-primary/5 shadow-sm hover:shadow-md transition-all relative">
            <Quote className="absolute top-6 right-6 w-8 h-8 text-accent/20" />
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent shrink-0 border-2 border-white" />
              <div>
                <h4 className="font-bold text-primary">Sarah Jenkins</h4>
                <p className="text-xs text-secondary font-medium">Product Manager @ TechCorp</p>
              </div>
            </div>
            <p className="text-secondary font-medium leading-relaxed">"The AI text generator completely transformed my bullet points. I landed 3 interviews in my first week of applying using the Modern Minimalist template."</p>
          </div>

          {/* Review 2 */}
          <div className="glass-panel p-8 rounded-3xl bg-card border border-primary/5 shadow-sm hover:shadow-md transition-all relative">
            <Quote className="absolute top-6 right-6 w-8 h-8 text-accent/20" />
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-primary shrink-0 border-2 border-white" />
              <div>
                <h4 className="font-bold text-primary">Michael Chen</h4>
                <p className="text-xs text-secondary font-medium">Software Engineer</p>
              </div>
            </div>
            <p className="text-secondary font-medium leading-relaxed">"The ATS checker feature is a game changer. It highlighted exactly which keywords I was missing. NichoAI is worth its weight in gold."</p>
          </div>

          {/* Review 3 */}
          <div className="glass-panel p-8 rounded-3xl bg-card border border-primary/5 shadow-sm hover:shadow-md transition-all relative">
            <Quote className="absolute top-6 right-6 w-8 h-8 text-accent/20" />
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-secondary shrink-0 border-2 border-white" />
              <div>
                <h4 className="font-bold text-primary">Elena Rodriguez</h4>
                <p className="text-xs text-secondary font-medium">Marketing Director</p>
              </div>
            </div>
            <p className="text-secondary font-medium leading-relaxed">"I've used countless resume builders, and this is by far the most beautiful and intuitive. It actually feels like a luxury product."</p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="max-w-4xl mx-auto w-full px-6 py-20 mb-20 relative z-10">
        <div className="glass-panel rounded-[3rem] p-12 md:p-20 text-center bg-gradient-to-b from-card to-primary/[0.03] border border-primary/10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-6 relative z-10">Start building your AI resume today</h2>
          <p className="text-secondary font-medium text-lg mb-10 max-w-xl mx-auto relative z-10">Stop wasting time formatting word documents. Let our AI build a perfectly structured resume in minutes.</p>

          <Link href="/builder/new" className="relative z-10 inline-block">
            <Button size="lg" className="px-10 py-7 rounded-2xl bg-gradient-to-b from-primary to-secondary text-white hover:scale-105 transition-all shadow-[0_8px_30px_rgba(75,46,31,0.25)] text-lg font-bold">
              Create Resume
              <Zap className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full pt-16 pb-8 border-t border-primary/10 bg-card relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <span className="text-2xl font-bold tracking-tight text-primary mb-4 block">NichoAI</span>
            <p className="text-secondary font-medium max-w-sm">The world's most advanced AI resume builder, designed to help you land your dream job faster than ever.</p>
          </div>

          <div>
            <h4 className="font-bold text-primary mb-4">Product</h4>
            <ul className="space-y-3 font-medium text-secondary/80">
              <li><Link href="/builder/new" className="hover:text-primary transition-colors">Resume Builder</Link></li>
              <li><Link href="/templates" className="hover:text-primary transition-colors">Templates</Link></li>
              <li><Link href="/ats-checker" className="hover:text-primary transition-colors">ATS Checker</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-primary mb-4">Company</h4>
            <ul className="space-y-3 font-medium text-secondary/80">
              <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-secondary/60 font-medium text-sm pt-8 border-t border-primary/5">
          <p>© 2026 NichoAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
