import classes from "./MainNavigation.module.css";
import Link from "next/link";
import {
  FiInstagram,
  FiShoppingCart,
  FiTwitter,
  FiFacebook,
  FiSidebar,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  getTotalItems,
  showShoppingCartSideBar,
} from "../../../store/shoppingCart";
import { useContext } from "react";
import { SideBarContext } from "../../../context/SideBarContext";
import { useRouter } from "next/router";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const totalItems = useSelector(getTotalItems);
  const [visible, setVisible] = useContext(SideBarContext);
  return (
    <div className={classes.mainnavigation}>
      <div className={classes.navbar}>
        <div className={classes.brand}>Acquire</div>
        <nav className={classes.navlinks}>
          <ul className={classes.links}>
            <li>
              <Link href="/shop">
                <a>Shop</a>
              </Link>
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
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
              >
                <FiFacebook size="1.5rem" />
              </a>
            </li>
            <li>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noreferrer"
              >
                <FiTwitter size="1.5rem" />
              </a>
            </li>
          </ul>

          <div className={classes.sidebarbutton}>
            <button
              className="roundedbutton"
              onClick={() => setVisible(!visible)}
            >
              <FiSidebar />
            </button>
          </div>

          <div className={classes.cart}>
            <button
              className="roundedbutton"
              onClick={() => dispatch(showShoppingCartSideBar())}
            >
              <FiShoppingCart />
              {totalItems > 0 && (
                <span className={classes.badge}>{totalItems}</span>
              )}
            </button>
          </div>
        </nav>
      </div>
      {/* <ul className={classes.mobilelinks}>
        <li>
          <Link href="/shop">
            <a>Shop</a>
          </Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul> */}
    </div>
  );
};

export default MainNavigation;
