import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductSearch from "../../../components/shop/ProductList/ProductSearch/ProductSearch";
import ProductListContent from "../../../components/shop/ProductListContent/ProductListContent";
import ShopLayout from "../../../components/shop/ShopLayout/ShopLayout";
import { loadLast30Days, refreshState } from "../../../store/products";

const index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadLast30Days());
    return () => dispatch(refreshState());
  }, []);
  return (
    <ShopLayout>
      <div className="section-header">Last 30 days</div>
      <ProductSearch />
      <ProductListContent />
    </ShopLayout>
  );
};

export default index;
