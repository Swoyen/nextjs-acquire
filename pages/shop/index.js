import ProductSearch from "../../components/shop/ProductList/ProductSearch/ProductSearch";
import ShopLayout from "../../components/shop/ShopLayout/ShopLayout";
import { loadGames } from "../../store/products";
import ProductListContent from "../../components/shop/ProductListContent/ProductListContent";

const Shop = () => {
  return (
    <>
      <ShopLayout>
        <div className="section-header">All Games</div>
        <ProductSearch />
        <ProductListContent dataToLoad={loadGames} />
      </ShopLayout>
    </>
  );
};

export default Shop;
