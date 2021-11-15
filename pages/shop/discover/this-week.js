import React from "react";
import ProductSearch from "../../../components/shop/ProductList/ProductSearch/ProductSearch";
import ProductListContent from "../../../components/shop/ProductListContent/ProductListContent";
import ShopLayout from "../../../components/shop/ShopLayout/ShopLayout";
import { loadLast30Days } from "../../../store/products";

const index = () => {
  return (
    <ShopLayout>
      <div className="section-header">Last 30 days</div>
      <ProductSearch />
      <ProductListContent dataToLoad={loadLast30Days} />
    </ShopLayout>
  );
};

export default index;
