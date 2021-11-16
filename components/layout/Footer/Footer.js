import classes from "./Footer.module.css";
import { FiInstagram, FiTwitter, FiFacebook } from "react-icons/fi";

import Link from "next/link";
const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.linkcontainer}>
        <ul className={classes.sociallinks}>
          <li>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <FiInstagram size="1.5rem" />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <FiFacebook size="1.5rem" />
            </a>
          </li>
          <li>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
              <FiTwitter size="1.5rem" />
            </a>
          </li>
        </ul>
        <ul className={classes.navlinks}>
          <li>
            <Link href="/shop">Shop</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className={classes.textcontainer}>
        <div className={classes.title}>
          Data Obtained from{" "}
          <a
            className={classes.apilink}
            href="https://api.rawg.io/docs"
            target="_blank"
            rel="noreferrer"
          >
            api.rawg.io
          </a>
        </div>
        <div className={classes.title}>Made with ReactJS and NextJS © 2021</div>
      </div>
    </footer>
  );
};

export default Footer;
