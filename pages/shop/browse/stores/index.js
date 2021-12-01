import React from "react";

import BrowseCard from "../../../../components/shop/Browse/BrowseCard";
import ShopLayout from "../../../../components/shop/ShopLayout/ShopLayout";
import classes from "../../../../styles/Browse.module.css";
import { getStores } from "../../../api/browse";

const stores = ({ stores }) => {
  return (
    <ShopLayout>
      <div className="section-header">Stores</div>
      <div className={classes.container}>
        {stores.map((store) => (
          <BrowseCard
            data={store}
            key={store.id}
            url="stores"
            baseUrl={"/shop/browse/stores"}
          />
        ))}
      </div>
    </ShopLayout>
  );
};

export const getStaticProps = async (context) => {
  // const slug = context.params.slug;
  const stores = await getStores();

  return {
    props: {
      stores,
    },
    revalidate: 1000,
  };
};
export default stores;
