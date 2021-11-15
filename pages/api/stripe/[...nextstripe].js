import NextStripe from "next-stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export default NextStripe({
  secret_key: process.env.STRIPE_SECRET_KEY,
});
