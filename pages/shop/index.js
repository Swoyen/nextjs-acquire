import { useEffect } from "react";
import ProductSearch from "../../components/shop/ProductList/ProductSearch/ProductSearch";
import ShopLayout from "../../components/shop/ShopLayout/ShopLayout";
import { useDispatch } from "react-redux";
import { loadGames } from "../../store/products";
import ProductListContent from "../../components/shop/ProductListContent/ProductListContent";

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGames());
  }, []);
  return (
    <>
      <ShopLayout>
        <div className="section-header">All Games</div>
        <ProductSearch />
        <ProductListContent />
      </ShopLayout>
    </>
  );
};

export default Shop;
