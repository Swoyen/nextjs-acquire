import React from "react";

import BrowseCard from "../../../../components/shop/Browse/BrowseCard";
import ShopLayout from "../../../../components/shop/ShopLayout/ShopLayout";

import classes from "../../../../styles/Browse.module.css";
import { getPlatforms } from "../../../api/browse";
const platforms = ({ platforms }) => {
  return (
    <ShopLayout>
      <div className={"section-header"}>Platforms</div>
      <div className={classes.container}>
        {platforms.map((platform) => (
          <BrowseCard
            baseUrl="/shop/browse/platforms"
            url="platforms"
            data={platform}
            subHeading={"Top Games"}
            key={platform.id}
          />
        ))}
      </div>
    </ShopLayout>
  );
};

export const getStaticProps = async () => {
  // const slug = context.params.slug;
  const platforms = await getPlatforms();

  return {
    props: {
      platforms,
    },
    revalidate: 1000,
  };
};
export default platforms;
