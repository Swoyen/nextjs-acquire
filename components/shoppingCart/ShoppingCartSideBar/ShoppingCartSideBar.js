import classes from "./ShoppingCartSideBar.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { hideShoppingCartSideBar } from "../../../store/shoppingCart";
import { useEffect, useRef } from "react";
import ShoppingCartItem from "../ShoppingCartSideBarItem/ShoppingCartSideBarItem";
import { useRouter } from "next/router";
const ShoppingCartSideBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const visible = useSelector(
    (state) => state.entities.shoppingCart.sideBarVisible
  );
  const cartItems = useSelector((state) => state.entities.shoppingCart.list);

  const handleViewCart = () => {
    handleHideSideBar();
    router.push("/cart");
  };
  const sideBarRef = useRef(null);

  const handleHideSideBar = () => {
    dispatch(hideShoppingCartSideBar());
  };

  const handleOpenCheckout = () => {
    handleHideSideBar();
    router.push("/checkout");
  };

  useEffect(() => {
    if (visible) {
      const handleClickOutside = (e) => {
        if (sideBarRef.current && !sideBarRef.current.contains(e.target)) {
          handleHideSideBar();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible]);

  return (
    <div
      className={`${classes.sidebarcontainer} ${
        visible ? "" : classes.sidebarcontainerhidden
      }`}
    >
      <div
        ref={sideBarRef}
        className={`${classes.sidebar} ${visible ? "" : classes.sidebarhidden}`}
      >
        <div className={classes.close} onClick={() => handleHideSideBar()}>
          <AiOutlineClose size="1.5rem" />
        </div>
        <div className={classes.sidebarinnercontainer}>
          {cartItems.length > 0 ? (
            <div>
              <div className={classes.itemscontainer}>
                {cartItems.map((cartItem) => (
                  <ShoppingCartItem
                    cartItem={cartItem}
                    key={`${cartItem.id}-${cartItem.selectedPlatform.value}`}
                  />
                ))}
              </div>
              <div className={classes.buttonscontainer}>
                <button
                  className="alternatemainbutton"
                  onClick={handleViewCart}
                >
                  View Cart
                </button>
                <button className="mainbutton" onClick={handleOpenCheckout}>
                  Checkout
                </button>
              </div>
              <div className={classes.continue}>
                <span
                  onClick={() => {
                    handleHideSideBar();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Continue Shopping
                </span>
              </div>
            </div>
          ) : (
            <span>Your shopping cart is empty</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartSideBar;
