import ProductSearch from "../../components/shop/ProductList/ProductSearch/ProductSearch";
import ShopLayout from "../../components/shop/ShopLayout/ShopLayout";
import { loadGames } from "../../store/products";
import ProductListContent from "../../components/shop/ProductListContent/ProductListContent";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getPageTitle } from "../../api_helper";
import ReactLoader from "react-loader-spinner";
import axios from "axios";

const Shop = () => {
  const router = useRouter();
  const [pageTitle, setPageTitle] = useState("Shop");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let mounted = true;
    if (router && Object.keys(router.query).length > 0) {
      setLoading(true);
      const query = router.query;
      if (Object.keys(query).length !== 0) {
        const key = Object.keys(query)[0];
        const value = Object.values(query)[0];
        axios
          .get(`/api/pagetitle?${key}=${value}`)
          .then((res) => {
            if (mounted) {
              setLoading(false);
              setPageTitle(res.data);
            }
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
