import classes from "./BrowseCard.module.css";
import Image from "next/image";
import { getGames } from "../../../api";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const BrowseCard = ({ baseUrl, data, subHeading, url }) => {
  const router = useRouter();
  const handleGoToUrl = () => {
    // router.push(`${baseUrl}/${url ? data[url] : data.slug}`);
    console.log();
    router.push(`/shop?${url}=${data.id}`);
  };
  return (
    <div onClick={() => handleGoToUrl()} className={classes.browsecard}>
      <div
        className={classes.content}
        style={{ backgroundImage: `url("${data?.image_background}")` }}
      >
        <div className={classes.contentinside}>
          <div className={classes.title}>{data.name}</div>
          <div className={classes.subheading}>{subHeading}</div>
          <div className={classes.gamecontainer}>
            <div className={classes.gameheader}>
              <div>Name</div>
              <div>Added</div>
            </div>

            {data?.games?.map((game) => (
              <div className={classes.game} key={game.id}>
                <div>{game.name}</div>
                <div>{game.added}</div>
              </div>
            ))}
          </div>
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
