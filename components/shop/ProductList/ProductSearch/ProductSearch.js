import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { searchGame } from "../../../../store/products";
import classes from "./ProductSearch.module.css";

const ProductSearch = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e, searchTerm) => {
    e.preventDefault();
    if (searchTerm === "" || !searchTerm) return;
    dispatch(searchGame(searchTerm));
  };

  return (
    <form
      className={classes.form}
      noValidate
      autoComplete="off"
      onSubmit={(e) => handleSearch(e, searchTerm)}
    >
      <button type="submit" className={`${classes.formsearch} actionbutton`}>
        <AiOutlineSearch size="1.3rem" />
      </button>
      <input
        className={classes.productsearch}
        name="search"
        value={searchTerm}
        placeholder="Search for games..."
        onChange={(e) => setSearchTerm(e.target.value)}
      ></input>
    </form>
  );
};

export default ProductSearch;
