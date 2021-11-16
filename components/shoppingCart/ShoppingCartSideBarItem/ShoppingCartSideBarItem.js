import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../../store/shoppingCart";
import { formatPrice } from "../../../utils/text";
import classes from "./ShoppingCartSideBarItem.module.css";
import Image from "next/image";
import { rgbDataURL } from "../../../utils/image";

const ShoppingCartItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const handleRemoveCartItem = (cartItem) => {
    dispatch(removeFromCart(cartItem.id, cartItem.selectedPlatform));
  };
  return (
    <div className={classes.item}>
      <div className={classes.imagecontainer}>
        <Image
          layout="responsive"
          width={150}
          height={220}
          className={classes.image}
          src={
            cartItem?.background_image
              ? cartItem?.background_image
              : "/notfound_placeholder.svg"
          }
          placeholder="blur"
          blurDataURL={rgbDataURL(200, 200, 200)}
          alt={classes.slug}
        />
      </div>
      <div className={classes.contentcontainer}>
        <div className={classes.description}>
          <span className={classes.header}>{cartItem.name}</span>
          <span className={classes.subheader}>
            {cartItem.selectedPlatform.label}
          </span>
          <span className={`${classes.price} desktophidden`}>
            {formatPrice(cartItem.price)}
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
      <span className={`${classes.price} mobilehidden`}>
        {formatPrice(cartItem.price)}
      </span>
    </div>
  );
};

export default ShoppingCartItem;
