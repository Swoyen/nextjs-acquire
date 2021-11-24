import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadGames,
  loadMoreGames,
  refreshState,
} from "../../../store/products";
import Loading from "../../loading/Loading";
import ProductList from "../ProductList/ProductList";
import ProductLoader from "../ProductList/ProductLoader.js/ProductLoader";
import classes from "./ProductListContent.module.css";

const ProductListContent = ({ dataToLoad }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const games = useSelector((state) => state.entities.products.games);
  const loading = useSelector((state) => state.entities.products.loading);
  const moreLoading = useSelector(
    (state) => state.entities.products.moreLoading
  );
  useEffect(() => {
    if (router) {
      dispatch(dataToLoad(router.query));
    }
    return () => dispatch(refreshState());
  }, [router, dataToLoad, dispatch]);

  const handleLoadMore = () => {
    dispatch(loadMoreGames());
  };

  return (
    <div className={classes.productlistcontainer}>
      {loading && <ProductLoader />}
      {!loading && <ProductList games={games} />}
      {moreLoading && <Loading loading={true}></Loading>}
      {!moreLoading && !loading && (
        <div className="buttoncontainer">
          <button
            onClick={() => handleLoadMore()}
            className={`secondarybutton`}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductListContent;
