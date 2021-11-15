import ShoppingCartSideBar from "../shoppingCart/ShoppingCartSideBar/ShoppingCartSideBar";
import Footer from "./Footer/Footer";
import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation/MainNavigation";

const Layout = (props) => {
  return (
    <>
      <MainNavigation />
      <main className={classes.container}>{props.children}</main>
      <ShoppingCartSideBar />
      <Footer />
    </>
  );
};

export default Layout;
