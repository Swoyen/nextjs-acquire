import Stripe from "stripe";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2020-08-27",
    });

    const data = req.body;

    try {
      const exists = await stripe.products.retrieve(data.id);
      console.log("Product exists");
      // console.log("Exists", exists);
      const price = await stripe.prices.list({
        product: exists.id,
        limit: 1,
      });
      let priceId = price.data[0].id;
      res.status(201).json(priceId);
    } catch (error) {
      if (error?.statusCode === 404) {
        console.log("doesnt exist");
        console.log("images", data.images);
        try {
          const productResult = await stripe.products.create({
            id: data.id,
            object: data.product,
            description: data.description,
            name: data.name,
            images: data.images.filter((image) => image !== null),
          });
          console.log("Product created");

          const priceResult = await stripe.prices.create({
            unit_amount: 6999,
            product: productResult.id,
            currency: "aud",
          });
          console.log("Price created");
          res.status(201).json(priceResult.id);
        } catch (err) {
          console.log("cant create", err);
        }
      } else {
        res.status(500).json({ message: "Cant create" });
      }
    }
  }
};
export default handler;
