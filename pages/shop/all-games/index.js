import React from "react";
import ProductSearch from "../../../components/shop/ProductList/ProductSearch/ProductSearch";
import ProductListContent from "../../../components/shop/ProductListContent/ProductListContent";
import ShopLayout from "../../../components/shop/ShopLayout/ShopLayout";
import { loadGames, loadLast30Days } from "../../../store/products";

const index = () => {
  return (
    <ShopLayout>
      <div className="section-header">All Games</div>
      <ProductSearch />
      <ProductListContent dataToLoad={() => loadGames(true)} />
    </ShopLayout>
  );
};

export default index;
