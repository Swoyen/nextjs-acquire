import { useSelector } from "react-redux";
import { getDisplay } from "../../../store/products";
import Product from "../Product/Product";
import classes from "./ProductList.module.css";
const ProductList = ({ games }) => {
  const display = useSelector(getDisplay);
  return (
    <div
      className={display === "grid" ? classes.productgrid : classes.productlist}
    >
      {games?.map((game, index) => {
        return <Product key={game.id} game={game} index={index} />;
      })}
    </div>
  );
};

export default ProductList;
