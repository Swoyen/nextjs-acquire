import classes from "./Product.module.css";
import { FcLinux } from "react-icons/fc";
import { AiFillWindows, AiFillApple, AiFillAndroid } from "react-icons/ai";
import { useRouter } from "next/router";
import {
  FaPlaystation,
  FaXbox,
  FaAppStoreIos,
  FaInternetExplorer,
} from "react-icons/fa";
import Image from "next/image";

import { RiSwitchFill } from "react-icons/ri";
import ReactTooltip from "react-tooltip";
import { minifyWords } from "../../../utils/text";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { rgbDataURL } from "../../../utils/image";

const getPlatformIcons = (platforms) => {
  return (
    <div className={classes.platformicons}>
      {platforms?.map((platform, i) => {
        const platformName = platform.platform.name;
        if (platformName === "Linux") return <FcLinux size="1.2rem" key={i} />;
        if (platformName === "iOS")
          return <FaAppStoreIos size="1.2rem" key={i} />;
        if (platformName === "PC")
          return <AiFillWindows size="1.2rem" key={i} />;
        if (platformName === "Xbox") return <FaXbox size="1.2rem" key={i} />;
        if (platformName === "Web")
          return <FaInternetExplorer size="1.2rem" key={i} />;
        if (platformName === "Android")
          return <AiFillAndroid size="1.2rem" key={i} />;
        if (platformName === "Nintendo")
          return <RiSwitchFill size="1.2rem" key={i} />;
        if (platformName === "Apple Macintosh")
          return <AiFillApple size="1.2rem" key={i} />;
        if (platformName === "PlayStation")
          return <FaPlaystation size="1.2rem" key={i} />;
        return <div key={i}>{platformName}</div>;
      })}
    </div>
  );
};

const getColor = (rating) => {
  let value = rating / 100;
  //value from 0 to 1
  var hue = (value * 120).toString(10);
  return ["hsl(", hue, ",100%,40%)"].join("");
};

const Product = ({ game, index }) => {
  const productRef = useRef();
  const router = useRouter();
  const showDetails = (game) => {
    router.push(`/shop/${game.slug}`);
  };

  useLayoutEffect(() => {
    const tween = gsap.fromTo(
      productRef.current,
      { y: 150, opacity: 0 },
      { duration: 0.5, y: 0, opacity: 1, delay: (index % 10) * 0.2 }
    );
    return () => {
      tween.kill();
    };
  }, [index]);

  return (
    <>
      <ReactTooltip effect="solid" delayShow={200} />
      <div ref={productRef} className={classes.productcontainer}>
        <div className={classes.product}>
          <div className={classes.cardmedia}>
            <Image
              className={classes.image}
              src={
                game.background_image
                  ? game.background_image
                  : "/notfound_placeholder.svg"
              }
              alt={game.name}
              width={500}
              height={450}
              layout="responsive"
              placeholder="blur"
              blurDataURL={rgbDataURL(100, 100, 100)}
            />
          </div>
          <div className={classes.cardcontent}>
            <div className={classes.topcontainer}>
              {getPlatformIcons(game?.parent_platforms)}
              {game?.metacritic && (
                <div
                  data-tip={`Metacritic Rating: ${game?.metacritic}`}
                  className={classes.rating}
                  style={{
                    borderColor: getColor(game?.metacritic),
                    color: getColor(game?.metacritic),
                  }}
                >
                  {game?.metacritic}
                </div>
              )}
            </div>
            <h3 data-tip={game.name} className={classes.cardheader}>
              {minifyWords(game.name)}
            </h3>
          </div>
          <div className={classes.cardaction}>
            <button
              className={classes.button}
              onClick={() => showDetails(game)}
            >
              Show Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
