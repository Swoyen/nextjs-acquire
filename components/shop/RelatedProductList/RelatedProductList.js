import RelatedProduct from "./RelatedProduct";
import Carousel from "react-multi-carousel";
import classes from "./RelatedProductList.module.css";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  largeDesktop: {
    breakpoint: { max: 3000, min: 2000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 2000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
  },
};
const RelatedProductList = ({ relatedProducts, title }) => {
  return (
    <div className={classes.relatedproductlist}>
      <span className={classes.title}>{title}</span>
      {/* <div className={classes.productcontainer}> */}
      <Carousel
        className={classes.productcontainer}
        responsive={responsive}
        showDots={true}
      >
        {relatedProducts?.map((dlc) => (
          <RelatedProduct key={dlc.id} dlc={dlc} />
        ))}
      </Carousel>
      {/* </div> */}
    </div>
  );
};

export default RelatedProductList;
