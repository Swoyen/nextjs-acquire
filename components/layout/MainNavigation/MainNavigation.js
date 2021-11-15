import classes from "./MainNavigation.module.css";
import Link from "next/link";
import {
  FiInstagram,
  FiShoppingCart,
  FiTwitter,
  FiFacebook,
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { showShoppingCartSideBar } from "../../../store/shoppingCart";

const MainNavigation = () => {
  const dispatch = useDispatch();
  return (
    <div className={classes.navbar}>
      <div className={classes.brand}>Acquire</div>
      <nav className={classes.navlinks}>
        <ul className={classes.links}>
          <li>
            <Link href="/shop">Shop</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
        <ul className={classes.sociallinks}>
          <li>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <FiInstagram size="1.5rem" />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <FiFacebook size="1.5rem" />
            </a>
          </li>
          <li>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
              <FiTwitter size="1.5rem" />
            </a>
          </li>
          <div className={classes.cart}>
            <button
              className="roundedbutton"
              onClick={() => dispatch(showShoppingCartSideBar())}
            >
              <FiShoppingCart size="1.5rem" />
            </button>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default MainNavigation;
