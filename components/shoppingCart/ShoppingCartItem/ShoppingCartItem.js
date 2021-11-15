import classes from "./ShoppingCartItem.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { removeFromCart } from "../../../store/shoppingCart";
import { useDispatch } from "react-redux";
import { formatPrice } from "../../../utils/text";
import Image from "next/image";
import { rgbDataURL } from "../../../utils/image";

const ShoppingCartItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem.id, cartItem.selectedPlatform));
  };
  return (
    <>
      <div className={classes.shoppingcartitem}>
        <div className={classes.imagecontainer}>
          <Image
            layout="responsive"
            width={250}
            height={400}
            className={classes.image}
            src={
              cartItem?.background_image
                ? cartItem?.background_image
                : "/notfound_placeholder.svg"
            }
            placeholder="blur"
            blurDataURL={rgbDataURL(200, 200, 200)}
            alt={cartItem?.slug}
          />
        </div>
        <div className={classes.content}>
          <div className={classes.header}>{cartItem?.name}</div>
          <div className={classes.platform}>
            <div className={classes.label}>Selected Platform</div>
            {cartItem?.selectedPlatform.label}
          </div>
          <div>
            <div className={classes.label}>Genres</div>
            <div className={classes.genretagcontainer}>
              {cartItem?.genres?.map((genre) => (
                <div className={classes.genretag} key={genre.id}>
                  {genre.name}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className={classes.label}>Age Rating</div>
            <div className={classes.sectioncontent}>
              {cartItem?.esrb_rating
                ? cartItem?.esrb_rating.name
                : "Not Available"}
            </div>
          </div>
          <div className={classes.bottomcontainer}>
            <button
              onClick={() => handleRemoveFromCart(cartItem)}
              className={classes.button}
            >
              <AiOutlineClose size="1.25rem" /> <span>Remove</span>
            </button>
            <span className={classes.price}>{formatPrice(cartItem.price)}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCartItem;
