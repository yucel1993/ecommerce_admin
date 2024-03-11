import stripe from "stripe";
import { NextResponse } from "next/server";
import { createOrder } from "@/lib/database/actions/order.actions";
import sendMail from "@/components/shared/SendEmail";

export async function POST(request: Request) {
  console.log("start of the function");
  const body = await request.text();

  const sig = request.headers.get("stripe-signature") as string;

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  // Get the ID and type
  const eventType = event.type;

  // CREATE
  if (eventType === "checkout.session.completed") {
    console.log("inside checkout.session.completed");
    const { id, amount_total, metadata } = event.data.object;

    const order = {
      stripeId: id,
      eventId: metadata?.eventId || "",
      buyerId: metadata?.buyerId || "",
      totalAmount: amount_total ? (amount_total / 100).toString() : "0",
      createdAt: new Date(),
    };

    const to = "alpagut1993@gmail.com"; // Replace with the user's email
    const subject = "Someone has bought something from you";
    const message = "Check your dashboard.";
    sendMail(to, subject, message);
    const to1 = "example@example.com"; // Replace with the user's email
    const subject1 = "Someone has bought something from you";
    const message1 = "Check your dashboard.";
    sendMail(to1, subject1, message1);
    console.log("calling create order");
    const newOrder = await createOrder(order);
    return NextResponse.json({ message: "OK", order: newOrder });
  }

  return new Response("", { status: 200 });
}
