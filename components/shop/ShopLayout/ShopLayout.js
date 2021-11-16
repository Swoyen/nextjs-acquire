import SideBar from "../../sidebar/SideBar";
import classes from "./ShopLayout.module.css";
import { FiX } from "react-icons/fi";

const ShopLayout = (props) => {
  return (
    <div className={classes.contentcontainer}>
      <div className={`${classes.sidebar}`}>
        <SideBar />

        <button className={classes.closebutton}>
          <FiX size="1.5rem" />
        </button>
      </div>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

export default ShopLayout;
