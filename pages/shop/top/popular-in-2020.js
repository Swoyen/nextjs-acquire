import React from "react";
import ProductSearch from "../../../components/shop/ProductList/ProductSearch/ProductSearch";
import ProductListContent from "../../../components/shop/ProductListContent/ProductListContent";
import ShopLayout from "../../../components/shop/ShopLayout/ShopLayout";
import { loadLast30Days, loadPopularIn2020 } from "../../../store/products";

const index = () => {
  return (
    <ShopLayout>
      <div className="section-header">Popular in 2020</div>
      <ProductSearch />
      <ProductListContent dataToLoad={loadPopularIn2020} />
    </ShopLayout>
  );
};

export default index;
