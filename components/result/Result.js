import axios from "axios";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearCart, getSubtotal } from "../../store/shoppingCart";
import classes from "./Result.module.css";
const Result = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state) => state.entities.shoppingCart.list);
  const total = useSelector(getSubtotal);
  const [orderCreated, setOrderCreated] = useState(false);
  const [session, loading] = useSession();

  useEffect(() => {
    if (
      data &&
      session &&
      data.session.payment_status === "paid" &&
      cart?.length > 0
    ) {
      // console.log("clear cart");
      // dispatch(clearCart());
      console.log("Created");
      createOrder(data, cart);
    }
  }, [data, session, cart]);

  console.log(data);

  useEffect(() => {
    if (session && orderCreated && cart?.length > 0) {
      const items = cart.map((item) => ({
        name: item.name,
        image: item.background_image,
        price: item.price,
        platform: item.selectedPlatform.label,
        age_rating: item.esrb_rating?.name ? item.esrb_rating?.name : "N/A",
      }));
      const name = session?.user.name;
      const email = session?.user.email;
      const data = { items, total, user: { name, email } };
      dispatch(clearCart());
      if (email)
        axios
          .post("/api/mail", data)
          .then((res) => {})
          .catch((err) => console.log(err.response));
    }
  }, [orderCreated, session]);

  const handleGoToShopping = () => {
    router.push("/shop");
  };

  const createOrder = (data) => {
    if (cart?.length === 0) return;
    const products = cart.map((cart) => ({
      rawgId: cart.id,
      name: cart.name,
      price: cart.price,
      background: cart.background_image,
      platform: cart.selectedPlatform.value,
    }));

    const order = {
      _id: data.session.payment_intent.id,
      products,
      total: data.session.amount_total,
      receipt: data.session.payment_intent.charges?.data[0]?.receipt_url,
    };

    axios
      .post("/api/orders", order)
      .then((res) => {
        setOrderCreated(true);
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <>
      {data ? (
        <>
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
          <div className="section-header">Payment Successful</div>
          <div className={classes.container}>
            <iframe
              className={classes.iframe}
              src="https://embed.lottiefiles.com/animation/85185"
            ></iframe>
            <div className={classes.order}>
              Thank you for your order{" "}
              {session?.user
                ? session.user.name
                : data?.session.payment_intent?.charges?.data[0]
                    ?.billing_details?.name}
              ! Your Order id: <b>{data?.session.payment_intent?.id}</b>
            </div>
            {session?.user && session?.user.email && (
              <div>
                You will receive an email at{" "}
                <span className={classes.email}>{session?.user.email}</span>{" "}
                with the receipt.
              </div>
            )}
          </div>
          <div onClick={handleGoToShopping} className={classes.buttoncontainer}>
            <button className={`mainbutton ${classes.shopping}`}>
              Continue Shopping
            </button>
          </div>
        </>
      ) : (
        "loading...."
      )}
    </>
  );
};

export default Result;
