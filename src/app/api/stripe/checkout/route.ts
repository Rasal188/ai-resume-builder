import { NextResponse } from "next/server"
import Stripe from "stripe"

export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "dummy", {
    apiVersion: "2025-02-24.acacia" as any
})

export async function POST(req: Request) {
    try {
        const supabase = await createClient()

        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { priceId } = await req.json()

        const session = await stripe.checkout.sessions.create({
            billing_address_collection: 'auto',
            line_items: [
                {
                    price: priceId, // Pass the Stripe Price ID from frontend
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/dashboard?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/dashboard?canceled=true`,
            client_reference_id: user.id, // Important to link back to Supabase user
            customer_email: user.email,
        })

        return NextResponse.json({ url: session.url })
    } catch (err: any) {
        console.error(err)
        return NextResponse.json(
            { error: "Error creating checkout session" },
            { status: 500 }
        )
    }
}
