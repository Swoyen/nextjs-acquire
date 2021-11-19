import { useEffect, useState } from "react";
import classes from "./ProductView.module.css";
import Select from "react-select";
import { IoGrid } from "react-icons/io5";
import { MdOutlineTableRows } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getDisplay, setProductsDisplay } from "../../../../store/products";

const grid = {
  value: "grid",
  label: (
    <div className={classes.label}>
      <IoGrid />
      <span>Grid</span>
    </div>
  ),
};

const list = {
  value: "list",
  label: (
    <div className={classes.label}>
      <MdOutlineTableRows />
      <span>List</span>
    </div>
  ),
};

const ProductView = () => {
  const dispatch = useDispatch();
  const display = useSelector(getDisplay);
  const [options, setOptions] = useState([grid, list]);
  const handleChange = (e) => {
    dispatch(setProductsDisplay(e.value));
  };
  const [selectedOption, setSelectedOption] = useState(grid);

  useEffect(() => {
    if (display) {
      setSelectedOption(display === "grid" ? grid : list);
    }
  }, [display, dispatch]);

  return (
    <div className={classes.productview}>
      <label htmlFor="display">Display</label>
      <Select
        id="display"
        options={options}
        onChange={handleChange}
        value={selectedOption}
        //    isDisabled={disabled}
      />
    </div>
  );
};

export default ProductView;
