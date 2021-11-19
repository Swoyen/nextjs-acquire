import React from "react";
import ProductSearch from "../../../components/shop/ProductList/ProductSearch/ProductSearch";
import ProductListContent from "../../../components/shop/ProductListContent/ProductListContent";
import ShopLayout from "../../../components/shop/ShopLayout/ShopLayout";
import { loadLast30Days, loadTop250 } from "../../../store/products";

const index = () => {
  return (
    <ShopLayout>
      <div className="section-header">All Time 250</div>
      <ProductSearch />
      <ProductListContent dataToLoad={loadTop250} />
    </ShopLayout>
  );
};

export default index;
