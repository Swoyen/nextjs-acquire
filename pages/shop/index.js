import ProductSearch from "../../components/shop/ProductList/ProductSearch/ProductSearch";
import ShopLayout from "../../components/shop/ShopLayout/ShopLayout";
import { loadGames } from "../../store/products";
import ProductListContent from "../../components/shop/ProductListContent/ProductListContent";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getPageTitle } from "../../api";
import ReactLoader from "react-loader-spinner";

const Shop = () => {
  const router = useRouter();
  const [pageTitle, setPageTitle] = useState("Shop");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let mounted = true;
    if (router && Object.keys(router.query).length > 0) {
      setLoading(true);
      console.log(router.query);
      const query = router.query;
      if (Object.keys(query).length !== 0) {
        const key = Object.keys(query)[0];
        const value = Object.values(query)[0];
        getPageTitle({ key, value })
          .then((res) => {
            setLoading(false);
            mounted && setPageTitle(res.data.name);
          })
          .catch((err) => console.log(err));
      }
    }
  }, [router]);
  return (
    <>
      <ShopLayout>
        <div className="section-header">
          {loading ? (
            <ReactLoader type="ThreeDots" color="blueviolet" height={30} />
          ) : (
            pageTitle
          )}
        </div>
        <ProductSearch />
        <ProductListContent dataToLoad={(query) => loadGames(true, query)} />
      </ShopLayout>
    </>
  );
};

export default Shop;
