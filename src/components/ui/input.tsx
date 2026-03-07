import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-xl border border-black/5 bg-white/80 px-4 py-2 text-base shadow-sm transition-all duration-300 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[#3b2a1f] placeholder:text-[#8a7360] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm hover:bg-white hover:border-[#c9a27c]/40",
        "focus-visible:border-[#c9a27c] focus-visible:ring-[3px] focus-visible:ring-[#c9a27c]/20 focus-visible:bg-white",
        "aria-invalid:border-red-500 aria-invalid:ring-red-500/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }
