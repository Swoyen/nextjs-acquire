import { useRouter } from "next/router";
import classes from "./RelatedProduct.module.css";

const RelatedProduct = ({ dlc }) => {
  const router = useRouter();

  const handleClick = (slug) => {
    router.push(`/shop/${slug}`);
  };
  return (
    <div
      onClick={() => handleClick(dlc.slug)}
      className={classes.relatedproduct}
    >
      <div className={classes.imagecontainer}>
        <img className={classes.image} src={dlc.background_image} alt="DLC" />
      </div>
      <div className={classes.title}> {dlc.name}</div>
    </div>
  );
};

export default RelatedProduct;
