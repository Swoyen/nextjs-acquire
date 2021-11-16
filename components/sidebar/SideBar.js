import classes from "./SideBar.module.css";
import Link from "next/link";
const SideBar = () => {
  return (
    <div className={classes.sidebar}>
      <div className={`${classes.sidesection} desktophidden`}>
        <div className={`${classes.link} ${classes.heading}`}>
          <Link href="/about">About </Link>
        </div>
      </div>
      <div className={`${classes.sidesection} desktophidden`}>
        <div className={`${classes.link} ${classes.heading}`}>
          <Link href="/contact">Contact </Link>
        </div>
      </div>
      <div className={classes.sidesection}>
        <div className={`${classes.link} ${classes.heading}`}>
          <Link href="/shop/all-games">All games</Link>
        </div>
      </div>
      <div className={classes.sidesection}>
        <div className={classes.heading}>New Releases</div>
        <ul className={classes.list}>
          <li className={`${classes.link} ${classes.subheading}`}>
            <Link href="/shop/discover/last-30-days">Last 30 days</Link>
          </li>
          <li className={`${classes.link} ${classes.subheading}`}>
            <Link href="/shop/discover/this-week">This week</Link>
          </li>
          <li className={`${classes.link} ${classes.subheading}`}>
            <Link href="/shop/discover/next-week">Next week</Link>
          </li>
        </ul>
      </div>
      <div className={classes.sidesection}>
        <div className={classes.heading}>Top</div>
        <ul className={classes.list}>
          <li className={`${classes.link} ${classes.subheading}`}>
            <Link href="/shop/top/best-of-the-year">Best of the year</Link>
          </li>
          <li className={`${classes.link} ${classes.subheading}`}>
            <Link href="/shop/top/popular-in-2020"> Popular in 2020</Link>
          </li>
          <li className={`${classes.link} ${classes.subheading}`}>
            <Link href="/shop/top/all-time-top-250">All time top 250</Link>
          </li>
        </ul>
      </div>
      <div className={classes.sidesection}>
        <div className={classes.heading}>Browse</div>
        <ul className={classes.list}>
          <li className={`${classes.link} ${classes.subheading}`}>
            <Link href="/shop/browse/platforms">Platforms</Link>
          </li>
          <li className={`${classes.link} ${classes.subheading}`}>
            <Link href="/shop/browse/stores">Stores</Link>
          </li>
          <li className={`${classes.link} ${classes.subheading}`}>
            <Link href="/shop/browse/creators">Creators</Link>
          </li>
          <li className={`${classes.link} ${classes.subheading}`}>
            <Link href="/shop/browse/tags">Tags</Link>
          </li>
          <li className={`${classes.link} ${classes.subheading}`}>
            <Link href="/shop/browse/developers">Developers</Link>
          </li>
          <li className={`${classes.link} ${classes.subheading}`}>
            <Link href="/shop/browse/publishers">Publishers</Link>
          </li>
        </ul>
      </div>

      <div className={classes.sidesection}>
        <div className={classes.heading}>Genres</div>
      </div>
    </div>
  );
};

export default SideBar;
