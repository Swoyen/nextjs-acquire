import classes from "./MainNavigation.module.css";
import Link from "next/link";
import {
  FiInstagram,
  FiShoppingCart,
  FiTwitter,
  FiFacebook,
  FiSidebar,
  FiAtSign,
} from "react-icons/fi";

import { RiAccountBoxLine } from "react-icons/ri";
import { GoSignIn, GoSignOut } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubtotal,
  getTotalItems,
  showShoppingCartSideBar,
} from "../../../store/shoppingCart";
import { useContext, useEffect, useRef, useState } from "react";
import { SideBarContext } from "../../../context/SideBarContext";
import { useRouter } from "next/router";
import { signin, signIn, signOut, useSession } from "next-auth/client";
import Loader from "react-loader-spinner";
import Menu from "../../menu/Menu";
import Email from "../../../utils/email";
import axios from "axios";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [session, loading] = useSession();
  const totalItems = useSelector(getTotalItems);
  const [visible, setVisible] = useContext(SideBarContext);
  const [accountMenuVisible, setAccountMenuVisible] = useState(false);
  const buttonRef = useRef(null);
  const cart = useSelector((state) => state.entities.shoppingCart.list);
  const total = useSelector(getSubtotal);

  const handleGoto = (url) => {
    router.push(url);
  };

  const getMenuItems = (session) => {
    if (!session) {
      return [
        <div key={1} onClick={signIn}>
          Login
        </div>,
      ];
    } else {
      return [
        <div key={2} onClick={() => handleGoto("/orders")}>
          Orders
        </div>,
        // <div onClick={() => handleGoto("/user")}>Details</div>,
        <div key={3} onClick={signOut}>
          Logout
        </div>,
      ];
    }
  };

  const handleSendEmail = async () => {
    const items = cart.map((item) => ({
      name: item.name,
      image: item.background_image,
      price: item.price,
      platform: item.selectedPlatform.label,
      age_rating: item.esrb_rating?.name ? item.esrb_rating?.name : "N/A",
    }));
    const name = session?.user.name;
    const email = session?.user.email;
    const data = { items, total, user: { name, email } };

    // Name
    // background_image
    // Price
    // Selected Platform
    // Age Rating: esrb_rating.name

    axios
      .post("/api/mail", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));
  };

  return (
    <div className={classes.mainnavigation}>
      <div className={classes.navbar}>
        <div className={classes.brand}>Acquire</div>
        <nav className={classes.navlinks}>
          <ul className={classes.links}>
            {/* <button onClick={() => handleSendEmail()}>Send Email</button> */}
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
          <div className={classes.sidebuttoncontainer}>
            <div className={classes.sidebarbutton}>
              <button
                className="roundedbutton"
                onClick={() => setVisible(!visible)}
              >
                <FiSidebar />
              </button>
            </div>

            <div className={classes.account}>
              <button
                data-tip="Account"
                ref={buttonRef}
                onClick={() => setAccountMenuVisible((vis) => !vis)}
                className="roundedbutton"
              >
                <RiAccountBoxLine />
              </button>
              <Menu
                visible={accountMenuVisible}
                setVisible={setAccountMenuVisible}
                items={getMenuItems(session)}
                buttonRef={buttonRef}
              />
            </div>

            <div className={classes.cart} data-tip="View Cart">
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
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MainNavigation;
