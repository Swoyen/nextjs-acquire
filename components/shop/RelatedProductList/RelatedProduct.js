import { useRouter } from "next/router";
import classes from "./RelatedProduct.module.css";
import Image from "next/image";
import { rgbDataURL } from "../../../utils/image";

const RelatedProduct = ({ dlc }) => {
  const router = useRouter();

  const handleClick = (slug) => {
    router.push(`/shop/${slug}`);
  };

  return (
    <div className={classes.relatedproduct}>
      <div className={classes.imagecontainer}>
        <Image
          layout="responsive"
          width={350}
          placeholder="blur"
          blurDataURL={rgbDataURL(237, 181, 6)}
          height={250}
          className={classes.image}
          src={
            dlc.background_image
              ? dlc.background_image
              : "/notfound_placeholder.svg"
          }
          alt="DLC"
        />
      </div>
      <div className={classes.title}> {dlc.name}</div>
      <button
        className="button"
        style={{ padding: "0.5em 1em" }}
        onClick={() => handleClick(dlc.slug)}
      >
        View game
      </button>
    </div>
  );
};

export default RelatedProduct;
