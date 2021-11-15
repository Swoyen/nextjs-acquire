import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export default async function handler(req, res) {
  const lineItems = req.body;
  console.log(lineItems);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `http://localhost:3000/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: "http://localhost:3000/checkout",
  });
  res.status(200).json({ sessionId: session.id });
}
