import { useEffect, useRef } from "react";
import classes from "./Menu.module.css";

const Menu = ({ visible, setVisible, items, buttonRef }) => {
  const menuRef = useRef(null);

  const handleHide = () => {
    setVisible(false);
  };
  {
    console.log(items);
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        handleHide();
      }
    };

    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, visible, buttonRef]);

  return (
    <div
      ref={menuRef}
      className={`${classes.menu} ${!visible ? classes.hidden : ""}`}
    >
      <div className={classes.menuitemscontainer}>
        {items?.map((item, index) => (
          <div key={index}>
            <div onClick={() => handleHide()} className={classes.menuitem}>
              {item}
            </div>
            {index !== items.length - 1 && <hr />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
