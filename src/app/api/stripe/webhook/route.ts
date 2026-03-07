import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "dummy", {
    apiVersion: "2025-02-24.acacia" as any
})
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "dummy"

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy.supabase.co",
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy"
)

export async function POST(req: Request) {
    const body = await req.text()
    const sig = req.headers.get("stripe-signature")

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig!, endpointSecret)
    } catch (err: any) {
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session

        // Link the subscription to the user ID
        const userId = session.client_reference_id
        const subscriptionId = session.subscription as string
        const customerId = session.customer as string

        if (userId) {
            const subscription = await stripe.subscriptions.retrieve(subscriptionId) as any

            await supabaseAdmin
                .from('profiles')
                .update({
                    stripe_customer_id: customerId,
                    stripe_subscription_id: subscriptionId,
                    stripe_price_id: subscription.items.data[0].price.id,
                    stripe_current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
                })
                .eq('id', userId)
        }
    }

    if (event.type === "customer.subscription.updated" || event.type === "customer.subscription.deleted") {
        const subscription = event.data.object as any

        await supabaseAdmin
            .from('profiles')
            .update({
                stripe_price_id: subscription.status === 'active' ? subscription.items.data[0].price.id : null,
                stripe_current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            })
            .eq('stripe_subscription_id', subscription.id)
    }

    return NextResponse.json({ received: true })
}
