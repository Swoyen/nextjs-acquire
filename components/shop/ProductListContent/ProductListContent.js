import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loadGames, loadMoreGames } from "../../../store/products";
import Loading from "../../loading/Loading";
import ProductList from "../ProductList/ProductList";
import ProductLoader from "../ProductList/ProductLoader.js/ProductLoader";

const ProductListContent = () => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.entities.products.games);
  const loading = useSelector((state) => state.entities.products.loading);
  const moreLoading = useSelector(
    (state) => state.entities.products.moreLoading
  );

  const handleLoadMore = () => {
    dispatch(loadMoreGames());
  };

  return (
    <>
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
    </>
  );
};

export default ProductListContent;
