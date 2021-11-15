import classes from "./ProductDetail.module.css";
import ReactPlayer from "react-player";
import {
  MdOutlineAddShoppingCart,
  MdOutlineRemoveShoppingCart,
} from "react-icons/md";
import PlatformSelect from "./PlatformSelect";
import GenresTags from "./GenresTags";
import ReactStars from "react-stars";
import { AiFillStar } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addToCart,
  getIsAddedToCart,
  removeFromCart,
  showShoppingCartSideBar,
} from "../../../store/shoppingCart";
import { useSelector } from "react-redux";
import { formatPrice } from "../../../utils/text";
import Image from "next/image";
import { rgbDataURL } from "../../../utils/image";

const productPrice = 69.99;

const ProductDetail = ({ game, gameTrailer, screenshots }) => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);
  const [platformError, setPlatformError] = useState(false);
  const addedToCart = useSelector(getIsAddedToCart(game?.id, selectedOption));

  const handleAddToCart = (game) => {
    if (validate()) {
      dispatch(addToCart({ ...game, price: productPrice }, selectedOption));
      dispatch(showShoppingCartSideBar());
    }
  };

  const handleRemoveFromCart = (game) => {
    dispatch(removeFromCart(game.id, selectedOption));
  };

  const validate = () => {
    if (!selectedOption) {
      setPlatformError(true);
      return false;
    }
    setPlatformError(false);
    return true;
  };

  useEffect(() => {
    setSelectedOption(null);
    return () => {
      setSelectedOption(null);
    };
  }, [game]);

  return (
    <div className={classes.productdetail}>
      <div className={classes.imagesvideocontainer}>
        <div className={classes.covercontainer}>
          <Image
            className={classes.coverimage}
            src={
              game?.background_image
                ? game?.background_image
                : "/notfound_placeholder.svg"
            }
            alt={game?.gamedetails}
            layout="fill"
            priority
            placeholder="blur"
            blurDataURL={rgbDataURL(237, 181, 6)}
          />
        </div>
        <div className={classes.starcontainer}>
          <ReactStars
            value={game?.rating}
            count={5}
            edit={false}
            size={35}
            color2={"#ffd700"}
          />
          <span>{`${game?.rating} out of ${game?.ratings_count} ratings.`}</span>
        </div>
        <div style={{ textAlign: "center" }}>
          <a
            className={classes.weblink}
            href={game?.website}
            target="_blank"
            rel="noreferrer"
          >
            Visit Website
          </a>
        </div>
        {/* <div className={classes.videocontainer}>
          {gameTrailer?.results && gameTrailer.results.length > 0 && (
            <ReactPlayer
              className={classes.videoplayer}
              url={gameTrailer.results[0].data.max}
              playing
              muted={true}
              controls={true}
              //  light={gameTrailer.results[0].preview}
              width="100%"
              height="100%"
            />
          )}
        </div>
        <div className={classes.imagescontainer}>
          {screenshots?.results &&
            screenshots.results.length > 0 &&
            screenshots.results.map((screenshot) => (
              <div key={screenshot.id} className={classes.imagecontainer}>
                <img
                  className={classes.imagetile}
                  src={screenshot.image}
                  alt="Screenshot"
                />
              </div>
            ))}
        </div> */}
      </div>
      <div className={classes.gamedetails}>
        <header className={classes.heading}>{game?.name}</header>
        <div className={classes.price}>{formatPrice(productPrice)}</div>
        <p className={classes.description}>{game?.description_raw}</p>
        <GenresTags genres={game?.genres} />
        <PlatformSelect
          disabled={addedToCart}
          platforms={game?.platforms}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          platformError={platformError}
          setPlatformError={setPlatformError}
        />
        <div className={classes.section}>
          <div className={classes.label}>Developer</div>
          <div className={classes.sectioncontent}>
            {game?.developers?.length
              ? game.developers[0].name
              : "Not Available"}
          </div>
        </div>
        <div className={classes.section}>
          <div className={classes.label}>Publisher</div>
          <div className={classes.sectioncontent}>
            {game?.publishers?.length
              ? game.publishers[0].name
              : "Not Available"}
          </div>
        </div>
        <div className={classes.section}>
          <div className={classes.label}>Age Rating</div>
          <div className={classes.sectioncontent}>
            {game?.esrb_rating ? game?.esrb_rating.name : "Not Available"}
          </div>
        </div>
        {!addedToCart ? (
          <button
            className={`${classes.addbutton} mainbutton`}
            onClick={() => handleAddToCart(game)}
          >
            <MdOutlineAddShoppingCart size="1.5rem" />
            <span>Add to Cart</span>
          </button>
        ) : (
          <button
            className={`${classes.addbutton} mainbutton`}
            onClick={() => handleRemoveFromCart(game)}
          >
            <MdOutlineRemoveShoppingCart size="1.5rem" />
            <span>Remove</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
