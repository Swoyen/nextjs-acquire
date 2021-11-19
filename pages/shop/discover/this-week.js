import React from "react";
import ProductSearch from "../../../components/shop/ProductList/ProductSearch/ProductSearch";
import ProductListContent from "../../../components/shop/ProductListContent/ProductListContent";
import ShopLayout from "../../../components/shop/ShopLayout/ShopLayout";
import { loadLast30Days, loadThisWeek } from "../../../store/products";

const index = () => {
  return (
    <ShopLayout>
      <div className="section-header">This Week</div>
      <ProductSearch />
      <ProductListContent dataToLoad={loadThisWeek} />
    </ShopLayout>
  );
};

export default index;
