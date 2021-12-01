import React from "react";

import BrowseCard from "../../../../components/shop/Browse/BrowseCard";
import ShopLayout from "../../../../components/shop/ShopLayout/ShopLayout";

import classes from "../../../../styles/Browse.module.css";
import { getPublishers } from "../../../api/browse";
const publishers = ({ publishers }) => {
  return (
    <ShopLayout>
      <div className={"section-header"}>Publishers</div>
      <div className={classes.container}>
        {publishers.map((publisher) => (
          <BrowseCard
            baseUrl="/shop/browse/publishers"
            data={publisher}
            url="publishers"
            subHeading={"Top Games"}
            key={publisher.id}
          />
        ))}
      </div>
    </ShopLayout>
  );
};

export const getStaticProps = async (context) => {
  // const slug = context.params.slug;

  const publishers = await getPublishers();

  return {
    props: {
      publishers,
    },
    revalidate: 1000,
  };
};

export default publishers;
