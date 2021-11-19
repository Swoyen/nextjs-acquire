import React from "react";
import { getDevelopers } from "../../../../api";
import BrowseCard from "../../../../components/shop/Browse/BrowseCard";
import ShopLayout from "../../../../components/shop/ShopLayout/ShopLayout";

import classes from "../../../../styles/Browse.module.css";
const developers = ({ developers }) => {
  return (
    <ShopLayout>
      <div className={"section-header"}>Developers</div>
      <div className={classes.container}>
        {developers.map((developer) => (
          <BrowseCard
            baseUrl="/shop/browse/developers"
            url="developers"
            data={developer}
            subHeading={"Top Games"}
            key={developer.id}
          />
        ))}
      </div>
    </ShopLayout>
  );
};

export const getStaticProps = async (context) => {
  // const slug = context.params.slug;
  const developers = (await getDevelopers())?.data.results;

  return {
    props: {
      developers,
    },
    revalidate: 1000,
  };
};

export default developers;
