import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/shoppingCart";
import classes from "./Result.module.css";
const Result = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (data && data.session.payment_status === "paid") {
      console.log("clear cart");
      dispatch(clearCart());
    }
  }, [data]);

  const handleGoToShopping = () => {
    router.push("/shop");
  };

  return (
    <>
      {data ? (
        <>
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
