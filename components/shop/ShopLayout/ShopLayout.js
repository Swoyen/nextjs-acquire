import SideBar from "../../sidebar/SideBar";
import classes from "./ShopLayout.module.css";
import { FiSidebar } from "react-icons/fi";
import { useState } from "react";

const ShopLayout = (props) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  return (
    <div className={classes.contentcontainer}>
      <div
        className={`${classes.sidebar} ${
          !sidebarVisible ? classes.sidebarcollapsed : ""
        }`}
      >
        <SideBar />
        <button
          className={`roundedbutton ${classes.sidebarbutton} ${
            !sidebarVisible ? classes.sidebarbuttoncollpased : ""
          }`}
          onClick={() => setSidebarVisible(!sidebarVisible)}
        >
          <FiSidebar size="1.5rem" />
        </button>
      </div>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

export default ShopLayout;
