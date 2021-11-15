import SideBar from "../../sidebar/SideBar";
import classes from "./ShopLayout.module.css";

const ShopLayout = (props) => {
  return (
    <div className={classes.contentcontainer}>
      <div className={classes.sidebar}>
        <SideBar />
      </div>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

export default ShopLayout;
