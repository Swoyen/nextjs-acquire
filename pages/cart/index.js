import { useRouter } from "next/dist/client/router";
import { useSelector } from "react-redux";
import ShoppingCartItem from "../../components/shoppingCart/ShoppingCartItem/ShoppingCartItem";
import { getSubtotal } from "../../store/shoppingCart";
import classes from "../../styles/Cart.module.css";
import { formatPrice } from "../../utils/text";
const Cart = () => {
  const cartItems = useSelector((state) => state.entities.shoppingCart.list);
  const total = useSelector(getSubtotal);
  const router = useRouter();
  const handleUrlClick = (link) => {
    router.push(link);
  };
  return (
    <div>
      <div className="section-header">Cart</div>
      <div className={classes.cartitemscontainer}>
        {cartItems.map((cartItem) => (
          <ShoppingCartItem
            cartItem={cartItem}
            key={`${cartItem.id}-${cartItem.selectedPlatform.value}`}
          />
        ))}
      </div>
      <div className={classes.subtotalcontainer}>
        <div className={classes.subtotal}>
          Subtotal:{" "}
          <span className={classes.subtotalprice}> {formatPrice(total)}</span>
        </div>
      </div>
      <div className={classes.buttoncontainer}>
        <button
          className="alternatemainbutton"
          onClick={() => handleUrlClick("/shop")}
        >
          Continue Shopping
        </button>
        <button
          className="mainbutton"
          onClick={() => handleUrlClick("/checkout")}
        >
          Continue to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
