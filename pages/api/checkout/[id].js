import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export default async function handler(req, res) {
  const { id } = req.query;
  const session = await stripe.checkout.sessions.retrieve(id + "", {
    expand: [`payment_intent`],
  });
  console.log(session);
  res.status(200).json({ session });
}
