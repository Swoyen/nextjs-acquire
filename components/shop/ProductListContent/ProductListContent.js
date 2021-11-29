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
  const { loading, error } = useSelector((state) => state.entities.products);

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
      {!loading && !error && <ProductList games={games} />}
      {moreLoading && <Loading loading={true}></Loading>}
      {!error && !moreLoading && !loading && (
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
      {error && (
        <div className={classes.fourofour}>
          <iframe
            src="https://giphy.com/embed/14uQ3cOFteDaU"
            width="480"
            height="360"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default ProductListContent;
