import { useSelector } from "react-redux";
import classes from "./CheckoutProducts.module.css";
import { formatPrice } from "../../../../utils/text";
import { useDispatch } from "react-redux";
import { getSubtotal, removeFromCart } from "../../../../store/shoppingCart";
import { AiOutlineClose } from "react-icons/ai";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import Image from "next/image";
import { rgbDataURL } from "../../../../utils/image";
import axios from "axios";
import Loader from "react-loader-spinner";

const CheckoutProducts = () => {
  const cartItems = useSelector((state) => state.entities.shoppingCart.list);
  const dispatch = useDispatch();
  const total = useSelector(getSubtotal);
  const [priceAndProductIds, setPriceAndProductIds] = useState([]);

  useEffect(() => {
    (async () => {
      if (cartItems) {
        cartItems.forEach((cartItem) => {
          const product = {
            id: `game-${cartItem.id}-${cartItem.selectedPlatform.value}`,
            active: true,
            description: cartItem.description_raw,
            name: cartItem.name,
            images: [
              cartItem.background_image,
              cartItem.background_image_additional,
            ],
            livemode: false,
          };
          createProductIfNotExists(product);
        });
      }
    })();
  }, [cartItems]);

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem.id, cartItem.selectedPlatform));
  };
  const createProductIfNotExists = async (product) => {
    axios
      .post("/api/products", product)
      .then((res) =>
        setPriceAndProductIds((priceIds) => [
          ...priceIds,
          { productId: product.id, priceId: res.data },
        ])
      )
      .catch((err) => console.log(err));
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
    // console.log(lineItems);
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
                      <Image
                        layout="responsive"
                        height={250}
                        width={150}
                        className={classes.image}
                        placeholder="blur"
                        blurDataURL={rgbDataURL(244, 244, 244)}
                        src={
                          cartItem.background_image
                            ? cartItem.background_image
                            : "/notfound_placeholder.svg"
                        }
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
                      <span className={`${classes.platform} mobilehidden`}>
                        {cartItem.selectedPlatform.label}
                      </span>
                      <span className={`${classes.price} mobilehidden `}>
                        {formatPrice(cartItem.price)}
                      </span>
                    </div>
                  </div>
                </td>

                <td>
                  <span className={`${classes.platform} desktophidden`}>
                    {cartItem.selectedPlatform.label}
                  </span>
                </td>
                <td>
                  <span className={`${classes.price} desktophidden `}>
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
        {priceAndProductIds?.length !== cartItems?.length ? (
          <Loader type="ThreeDots" color="blueviolet" height={30} />
        ) : (
          <button onClick={handleCheckout} className="mainbutton">
            Place Order
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckoutProducts;
