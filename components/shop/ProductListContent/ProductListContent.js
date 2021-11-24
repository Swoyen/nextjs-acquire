import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
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
  const { ref, inView, entry } = useInView();

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
    if (!moreLoading) dispatch(loadMoreGames());
  };

  useEffect(() => {
    if (inView) handleLoadMore();
  }, [inView]);

  return (
    <div className={classes.productlistcontainer}>
      {loading && <ProductLoader />}
      {!loading && <ProductList games={games} />}
      {moreLoading && <Loading loading={true}></Loading>}
      {!moreLoading && !loading && (
        <div className="buttoncontainer">
          <button
            ref={ref}
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
