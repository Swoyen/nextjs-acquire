import React from "react";
import { getStores } from "../../../api";
import BrowseCard from "../../../components/shop/Browse/BrowseCard";
import ShopLayout from "../../../components/shop/ShopLayout/ShopLayout";
import classes from "../../../styles/Browse.module.css";
const stores = ({ stores }) => {
  return (
    <ShopLayout>
      <div className="section-header">Stores</div>
      <div className={classes.container}>
        {stores.map((store) => (
          <BrowseCard data={store} key={store.id} />
        ))}
      </div>
    </ShopLayout>
  );
};

export const getStaticProps = async (context) => {
  // const slug = context.params.slug;
  const stores = (await getStores())?.data.results;
  console.log(stores);

  return {
    props: {
      stores,
    },
    revalidate: 1000,
  };
};
export default stores;
