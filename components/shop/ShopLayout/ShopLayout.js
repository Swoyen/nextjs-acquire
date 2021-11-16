import SideBar from "../../sidebar/SideBar";
import classes from "./ShopLayout.module.css";
import { FiX } from "react-icons/fi";
import { useContext } from "react";
import { SideBarContext } from "../../../context/SideBarContext";

const ShopLayout = (props) => {
  const [visible, setVisible] = useContext(SideBarContext);

  return (
    <div className={classes.contentcontainer}>
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
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

export default ShopLayout;
