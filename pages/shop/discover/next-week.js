import React from "react";
import ProductSearch from "../../../components/shop/ProductList/ProductSearch/ProductSearch";
import ProductListContent from "../../../components/shop/ProductListContent/ProductListContent";
import ShopLayout from "../../../components/shop/ShopLayout/ShopLayout";
import { loadNextWeek } from "../../../store/products";

const index = () => {
  return (
    <ShopLayout>
      <div className="section-header">Next Week</div>
      <ProductSearch />
      <ProductListContent dataToLoad={loadNextWeek} />
    </ShopLayout>
  );
};

export default index;
