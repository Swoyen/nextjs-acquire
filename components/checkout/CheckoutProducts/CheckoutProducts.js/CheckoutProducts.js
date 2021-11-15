import { useSelector } from "react-redux";
import classes from "./CheckoutProducts.module.css";
import { formatPrice } from "../../../../utils/text";
import { useDispatch } from "react-redux";
import { getSubtotal, removeFromCart } from "../../../../store/shoppingCart";
import { AiOutlineClose } from "react-icons/ai";
import { loadStripe } from "@stripe/stripe-js";

const CheckoutProducts = ({ priceAndProductIds, setPriceAndProductIds }) => {
  const cartItems = useSelector((state) => state.entities.shoppingCart.list);
  const dispatch = useDispatch();
  const total = useSelector(getSubtotal);

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem.id, cartItem.selectedPlatform));
  };

  const handleCheckout = async () => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    const lineItems = priceAndProductIds.map((priceIdWProductId) => ({
      price: priceIdWProductId.priceId,
      quantity: 1,
    }));

    const { sessionId } = await fetch("/api/checkout/session", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(lineItems),
    }).then((res) => res.json());

    const { error } = await stripe.redirectToCheckout({ sessionId });
    console.log(lineItems);
  };

  return (
    <div className={classes.checkoutproductscontainer}>
      <div className={classes.subheader}>Order Summary</div>
      <div>
        <table className={classes.table}>
          <tbody>
            {cartItems.map((cartItem, index) => (
              <tr
                key={`${cartItem.id}-${cartItem.selectedPlatform.value}`}
                className={classes.row}
              >
                <td>
                  <div className={classes.firstrow}>
                    <div className={classes.imagecontainer}>
                      <img
                        className={classes.image}
                        src={cartItem.background_image}
                        alt={cartItem.slug}
                      />
                    </div>
                    <div className={classes.titlecontainer}>
                      <div className={classes.title}>{cartItem.name}</div>
                      <div className={classes.subtitle}>{cartItem.name}</div>
                      <div>
                        <button
                          onClick={() => handleRemoveFromCart(cartItem)}
                          className={classes.button}
                        >
                          <AiOutlineClose size="1.25rem" /> <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </td>

                <td>
                  <span className={classes.platform}>
                    {cartItem.selectedPlatform.label}
                  </span>
                </td>
                <td>
                  <span className={classes.price}>
                    {formatPrice(cartItem.price)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={classes.monetaryinfo}>
          <div className={classes.monetaryentry}>
            <span>Subtotal</span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className={classes.monetaryentry}>
            <span>VAT</span>
            <span>Included</span>
          </div>
          <div className={classes.monetaryentry}>
            <span>Total</span>
            <span className={classes.totalprice}>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
      <div className={classes.buttoncontainer}>
        <button onClick={handleCheckout} className="mainbutton">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutProducts;
