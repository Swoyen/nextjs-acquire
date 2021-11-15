import RelatedProduct from "./RelatedProduct";
import classes from "./RelatedProductList.module.css";
const RelatedProductList = ({ relatedProducts, title }) => {
  return (
    <div className={classes.relatedproduct}>
      <span className={classes.title}>{title}</span>
      <div className={classes.productcontainer}>
        {relatedProducts?.results?.map((dlc) => (
          <RelatedProduct key={dlc.id} dlc={dlc} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProductList;
