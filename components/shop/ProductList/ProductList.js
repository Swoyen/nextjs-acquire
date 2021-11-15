import Product from "../Product/Product";
import classes from "./ProductList.module.css";
const ProductList = ({ games }) => {
  return (
    <div className={classes.productlist}>
      {games?.map((game, index) => {
        return <Product key={game.id} game={game} index={index} />;
      })}
    </div>
  );
};

export default ProductList;
