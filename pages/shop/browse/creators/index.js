import React from "react";

import BrowseCard from "../../../../components/shop/Browse/BrowseCard";
import ShopLayout from "../../../../components/shop/ShopLayout/ShopLayout";

import classes from "../../../../styles/Browse.module.css";
import { getCreators } from "../../../api/browse";
const creators = ({ creators }) => {
  return (
    <ShopLayout>
      <div className={"section-header"}>Creators</div>
      <div className={classes.container}>
        {creators.map((creator) => (
          <BrowseCard
            url="creators"
            baseUrl="/shop/browse/creators"
            data={creator}
            subHeading={"Top Games"}
            key={creator.id}
          />
        ))}
      </div>
    </ShopLayout>
  );
};

export const getStaticProps = async (context) => {
  // const slug = context.params.slug;
  const creators = await getCreators();

  return {
    props: {
      creators,
    },
    revalidate: 1000,
  };
};

export default creators;
