import classes from "./SideBar.module.css";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { SideBarContext } from "../../context/SideBarContext";
import { genres as apiGenres } from "../../constants/genres";
import { useRouter } from "next/router";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const GenreLink = ({ genre, handleGoTo }) => {
  return (
    <li className={`${classes.link} ${classes.subheading}`}>
      <div>
        <div onClick={() => handleGoTo(`/shop?genres=${genre.id}`)}>
          {genre?.name}
        </div>
      </div>
    </li>
  );
};

const SideBar = () => {
  const genres = apiGenres;
  const router = useRouter();
  const [visible, setVisible] = useContext(SideBarContext);
  const [allGenresShown, setAllGenresShown] = useState(false);

  const handleGoTo = (url) => {
    router.push(url);
    setVisible(false);
  };

  return (
    <div className={classes.sidebar}>
      <div className={`${classes.sidesection} desktophidden`}>
        <div className={`${classes.link} ${classes.heading}`}>
          <Link passHref href="/about" onClick={() => console.log("click")}>
            About
          </Link>
        </div>
      </div>
      <div className={`${classes.sidesection} desktophidden`}>
        <div className={`${classes.link} ${classes.heading}`}>
          <Link passHref href="/contact">
            <div onClick={() => setVisible(false)}>Contact</div>
          </Link>
        </div>
      </div>
      <div className={classes.sidesection}>
        <div className={`${classes.link} ${classes.heading}`}>
          <Link passHref href="/shop/all-games">
            <div onClick={() => setVisible(false)}>All games</div>
          </Link>
        </div>
      </div>
      <div className={classes.sidesection}>
        <div className={classes.heading}>New Releases</div>
        <ul className={classes.list}>
          <li className={`${classes.link} ${classes.subheading}`}>
            <Link passHref href="/shop/discover/last-30-days">
              <div onClick={() => setVisible(false)}>Last 30 days</div>
            </Link>
          </li>
          <li className={`${classes.link} ${classes.subheading}`}>
            <Link passHrefhref="/shop/discover/this-week">
              <div onClick={() => setVisible(false)}>This week</div>
            </Link>
          </li>
          <li className={`${classes.link} ${classes.subheading}`}>
            <Link passHref href="/shop/discover/next-week">
              <div onClick={() => setVisible(false)}>Next week </div>
            </Link>
          </li>
        </ul>
      </div>
      <div className={classes.sidesection}>
        <div className={classes.heading}>Top</div>
        <ul className={classes.list}>
          <li className={`${classes.link} ${classes.subheading}`}>
            <Link passHref href="/shop/top/best-of-the-year">
              <div onClick={() => setVisible(false)}>Best of the year</div>
            </Link>
          </li>
          <li className={`${classes.link} ${classes.subheading}`}>
            <Link passHref href="/shop/top/popular-in-2020">
              <div onClick={() => setVisible(false)}>Popular in 2020</div>
            </Link>
          </li>
          <li className={`${classes.link} ${classes.subheading}`}>
            <Link passHref href="/shop/top/all-time-top-250">
              <div onClick={() => setVisible(false)}>All time top 250</div>
            </Link>
          </li>
        </ul>
      </div>
      <div className={classes.sidesection}>
        <div className={classes.heading}>Browse</div>
        <ul className={classes.list}>
          <li className={`${classes.link} ${classes.subheading}`}>
            <Link passHref href="/shop/browse/platforms">
              <div onClick={() => setVisible(false)}>Platforms</div>
            </Link>
          </li>
          <li className={`${classes.link} ${classes.subheading}`}>
            <Link href="/shop/browse/stores">
              <div passHref onClick={() => setVisible(false)}>
                Stores
              </div>
            </Link>
          </li>
          <li className={`${classes.link} ${classes.subheading}`}>
            <Link href="/shop/browse/creators">
              <div passHref onClick={() => setVisible(false)}>
                Creators
              </div>
            </Link>
          </li>
          <li className={`${classes.link} ${classes.subheading}`}>
            <Link href="/shop/browse/tags">
              <div passHref onClick={() => setVisible(false)}>
                Tags
              </div>
            </Link>
          </li>
          <li className={`${classes.link} ${classes.subheading}`}>
            <Link href="/shop/browse/developers">
              <div passHref onClick={() => setVisible(false)}>
                Developers
              </div>
            </Link>
          </li>
          <li className={`${classes.link} ${classes.subheading}`}>
            <Link href="/shop/browse/publishers">
              <div passHref onClick={() => setVisible(false)}>
                Publishers
              </div>
            </Link>
          </li>
        </ul>
      </div>

      <div className={classes.sidesection}>
        <div className={classes.heading}>Genres</div>
        <ul
          className={`${classes.list} ${
            allGenresShown ? classes.allgenrelist : classes.partialgenrelist
          }`}
        >
          {genres?.map((genre) => (
            <GenreLink key={genre.id} genre={genre} handleGoTo={handleGoTo} />
          ))}
        </ul>
        <button
          className={classes.button}
          onClick={() => setAllGenresShown(!allGenresShown)}
        >
          {!allGenresShown ? (
            <AiOutlineUp size="1rem" />
          ) : (
            <AiOutlineDown size="1rem" />
          )}
        </button>
      </div>
    </div>
  );
};

export default SideBar;
