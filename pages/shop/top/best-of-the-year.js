import React from "react";
import ProductSearch from "../../../components/shop/ProductList/ProductSearch/ProductSearch";
import ProductListContent from "../../../components/shop/ProductListContent/ProductListContent";
import ShopLayout from "../../../components/shop/ShopLayout/ShopLayout";
import { loadBestOfTheYear, loadLast30Days } from "../../../store/products";

const index = () => {
  return (
    <ShopLayout>
      <div className="section-header">Best of the year</div>
      <ProductSearch />
      <ProductListContent dataToLoad={loadBestOfTheYear} />
    </ShopLayout>
  );
};

export default index;
