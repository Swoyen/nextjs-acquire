import React from "react";
import classes from "../../styles/About.module.css";
import Image from "next/image";

const About = () => {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.item}>
          <div className={classes.gamingcontent}>
            <div className={classes.heading}>
              A Gaming Shop For All Platforms
            </div>
            <div className={classes.subheading}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse
              laborum aliquid hic dolores blanditiis cupiditate impedit alias,
              adipisci ea dicta a! Aspernatur ipsa minima voluptatem. Corporis,
              pariatur vero recusandae id vitae nemo, atque aliquam aperiam ab
              non alias quaerat nobis.
            </div>
          </div>
          <div className={classes.gamingpicture}>
            {/* <a href='https://www.freepik.com/vectors/technology'>Technology vector created by freepik - www.freepik.com</a> */}
            <Image
              className={classes.image}
              src={"/platforms.jpg"}
              width={1200}
              height={900}
            ></Image>
          </div>
        </div>
        {/* </div> */}
        <div className={classes.item}>
          <div className={classes.gamingpicture}>
            {/* <a href='https://www.freepik.com/vectors/technology'>Technology vector created by freepik - www.freepik.com</a> */}
            <Image
              className={classes.image}
              src={"/worry.jpg"}
              width={1200}
              height={900}
            ></Image>
          </div>
          <div className={classes.gamingcontent}>
            <div className={classes.heading}>Play to win</div>
            <div className={classes.subheading}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse
              laborum aliquid hic dolores blanditiis cupiditate impedit alias,
              adipisci ea dicta a! Aspernatur ipsa minima voluptatem. Corporis,
              pariatur vero recusandae id vitae nemo, atque aliquam aperiam ab
              non alias quaerat nobis.
            </div>
          </div>
        </div>
      </div>
    </> //
  );
};

export default About;
