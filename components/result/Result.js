import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/shoppingCart";
import classes from "./Result.module.css";
const Result = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state) => state.entities.shoppingCart.list);

  useEffect(() => {
    if (data && data.session.payment_status === "paid") {
      // console.log("clear cart");
      // dispatch(clearCart());
      createOrder(data, cart);
    }
  }, [data]);

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
        dispatch(clearCart());
        console.log("Order created!");
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
              {
                data?.session.payment_intent?.charges?.data[0]?.billing_details
                  ?.name
              }
              ! Your Order id:{" "}
              {data?.session.payment_intent?.charges?.data[0]?.receipt_number}
            </div>
            <div>
              You will receive an email at{" "}
              <span className={classes.email}>
                {data?.session.customer_details.email}
              </span>{" "}
              with the receipt.
            </div>
          </div>{" "}
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
