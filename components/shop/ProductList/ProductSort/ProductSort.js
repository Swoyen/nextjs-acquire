import classes from "./ProductSort.module.css";
import { useState } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { sortBy } from "../../../../store/products";
import { useRouter } from "next/router";
const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    // width: state.selectProps.width,
    // borderBottom: "1px dotted pink",
    // color: state.selectProps.menuColor,
    // padding: 20,
  }),

  // control: (_, { selectProps: { width } }) => ({
  //   width: width,
  // }),

  // singleValue: (provided, state) => {
  //   const opacity = state.isDisabled ? 0.5 : 1;
  //   const transition = "opacity 300ms";

  //   return { ...provided, opacity, transition };
  // },
};
const ProductSort = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [options, setOptions] = useState([
    { label: "Name", value: "-name" },
    { label: "Released", value: "-released" },
    { label: "Added", value: "-added" },
    { label: "Created", value: "-created" },
    { label: "Updated", value: "-updated" },
    { label: "Rating", value: "-rating" },
    { label: "Metacritic", value: "-metacritic" },
  ]);
  const [selectedOption, setSelectedOption] = useState(null);
  const handleChange = (e) => {
    if (selectedOption?.value === e.value) {
      dispatch(sortBy(e.value.replace("-", ""), router.query));
    } else {
      dispatch(sortBy(e.value, router.query));
    }
    setSelectedOption(e);
  };
  return (
    <div className={classes.productsort}>
      <label htmlFor="filter">Sort by</label>
      <Select
        styles={customStyles}
        id="filter"
        options={options}
        onChange={handleChange}
        value={selectedOption}
        //    isDisabled={disabled}
      />
    </div>
  );
};

export default ProductSort;
