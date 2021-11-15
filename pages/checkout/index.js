import classes from "../../styles/Checkout.module.css";
import CheckoutProducts from "../../components/checkout/CheckoutProducts/CheckoutProducts.js/CheckoutProducts";
import PersonalDetails from "../../components/checkout/PersonalDetails/PersonalDetails";
import PaymentDetails from "../../components/checkout/PaymentDetails/PaymentDetails";

const index = () => {
  // const cartItems = useSelector((state) => state.entities.shoppingCart.list);

  // const product = {
  //   id: "game_123465_platform",
  //   active: true,
  //   description: "This is test game",
  //   name: "GTA VI",
  //   url: "null",
  //   images: [
  //     "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
  //     "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
  //   ],
  //   livemode: false,
  // };

  // const createProduct = async () => {
  //   axios
  //     .post("/api/products", product)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };

  return (
    <div>
      <div className="section-header">Checkout</div>
      <div className={classes.checkoutcontainer}>
        <div>
          {/* <button onClick={callApi}>pay</button> */}
          <PersonalDetails />
          <PaymentDetails />
        </div>

        <CheckoutProducts />
      </div>
    </div>
  );
};

// export const getServerSideProps = async () => {
//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//     apiVersion: "2020-08-27",
//   });

//   const prices = await stripe.prices.list({
//     active: true,
//   });

//   return { props: { prices: prices.data } };
// };

export default index;
