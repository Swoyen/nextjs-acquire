import { useContext } from "react";
import { FiX } from "react-icons/fi";
import { SideBarContext } from "../../context/SideBarContext";
import ShoppingCartSideBar from "../shoppingCart/ShoppingCartSideBar/ShoppingCartSideBar";
import SideBar from "../sidebar/SideBar";
import Footer from "./Footer/Footer";
import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation/MainNavigation";

const Layout = (props) => {
  const [visible, setVisible] = useContext(SideBarContext);

  return (
    <div className={classes.layout}>
      <MainNavigation />
      <div
        className={`${classes.sidebar} ${
          !visible ? classes.sidebarcollapsed : ""
        }`}
      >
        <SideBar />

        <button
          className={classes.closebutton}
          onClick={() => setVisible(false)}
        >
          <FiX size="1.5rem" />
        </button>
      </div>
      <main className={classes.container}>{props.children}</main>
      <ShoppingCartSideBar />
      <Footer />
    </div>
  );
};

export default Layout;
