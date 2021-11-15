import classes from "./BrowseCard.module.css";
import Image from "next/image";
const BrowseCard = ({ data }) => {
  return (
    <div className={classes.browsecard}>
      <div
        className={classes.content}
        style={{ backgroundImage: `url("${data?.image_background}")` }}
      >
        <div className={classes.contentinside}>
          <div className={classes.title}>{data.name}</div>
        </div>
      </div>
      {/* <div className={classes.imagecontainer}>
        <Image
          className={classes.image}
          src={data?.image_background}
          layout="fill"
          alt={data?.name}
        />
      </div> */}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export default BrowseCard;
