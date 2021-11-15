import ContentLoader from "react-content-loader";
import CustomLoader from "./CustomLoader";
import classes from "./ProductLoader.module.css";

const ProductLoader = () => {
  return (
    <>
      <div className={classes.loaders}>
        <CustomLoader className={classes.customloader} />
        <CustomLoader className={classes.customloader} />

        <CustomLoader className={classes.customloader} />
        <CustomLoader className={classes.customloader} />

        <CustomLoader className={classes.customloader} />
        <CustomLoader className={classes.customloader} />

        <CustomLoader className={classes.customloader} />
        <CustomLoader className={classes.customloader} />
      </div>
    </>
  );
};

export default ProductLoader;
