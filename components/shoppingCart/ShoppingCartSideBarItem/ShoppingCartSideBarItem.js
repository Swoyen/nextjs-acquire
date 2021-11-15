import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../../store/shoppingCart";
import { formatPrice } from "../../../utils/text";
import classes from "./ShoppingCartSideBarItem.module.css";

const ShoppingCartItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const handleRemoveCartItem = (cartItem) => {
    dispatch(removeFromCart(cartItem.id, cartItem.selectedPlatform));
  };
  return (
    <div className={classes.item}>
      <div className={classes.imagecontainer}>
        <img
          className={classes.image}
          src={cartItem.background_image}
          alt={classes.slug}
        />
      </div>
      <div className={classes.contentcontainer}>
        <div className={classes.description}>
          <span className={classes.header}>{cartItem.name}</span>
          <span className={classes.subheader}>
            {cartItem.selectedPlatform.label}
          </span>
        </div>
        <div>
          <button
            className={classes.button}
            onClick={() => handleRemoveCartItem(cartItem)}
          >
            <AiOutlineClose size="1.25rem" />
            <span>Remove</span>
          </button>
        </div>
      </div>
      <span className={classes.price}>{formatPrice(cartItem.price)}</span>
    </div>
  );
};

export default ShoppingCartItem;
