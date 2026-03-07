import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 outline-none focus-visible:border-[#c9a27c] focus-visible:ring-[3px] focus-visible:ring-[#c9a27c]/40 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:ring-red-500/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-b from-[#5a3e2b] to-[#3b2a1f] text-white hover:opacity-90 shadow-[0_2px_10px_rgba(90,62,43,0.2)] hover:shadow-[0_4px_15px_rgba(201,162,124,0.4)] hover:scale-[1.02]",
        destructive: "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500/20 shadow-sm",
        outline: "border border-black/10 bg-white/50 backdrop-blur-sm shadow-sm hover:bg-white hover:scale-[1.02] text-[#3b2a1f]",
        secondary: "bg-[#e9dfd1] text-[#3b2a1f] hover:brightness-95 shadow-sm",
        ghost: "hover:bg-white/60 text-[#8a7360] hover:text-[#3b2a1f]",
        link: "text-[#5a3e2b] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2 has-[>svg]:px-4",
        xs: "h-7 gap-1 rounded-lg px-3 text-xs has-[>svg]:px-2.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 rounded-xl px-4 has-[>svg]:px-3.5",
        lg: "h-12 rounded-2xl px-8 has-[>svg]:px-5 text-base",
        icon: "size-11 rounded-xl",
        "icon-xs": "size-7 rounded-lg [&_svg:not([class*='size-'])]:size-3.5",
        "icon-sm": "size-9 rounded-xl",
        "icon-lg": "size-12 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
