import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductSearch from "../../../components/shop/ProductList/ProductSearch/ProductSearch";
import ProductListContent from "../../../components/shop/ProductListContent/ProductListContent";
import ShopLayout from "../../../components/shop/ShopLayout/ShopLayout";
import { loadGames, refreshState } from "../../../store/products";

const AllGames = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGames());
    return () => dispatch(refreshState());
  }, []);
  return (
    <ShopLayout>
      <div className="section-header">All Games</div>
      <ProductSearch />
      <ProductListContent />
    </ShopLayout>
  );
};

export default AllGames;
