import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  getDlcs,
  getGame,
  getGames,
  getGameTrailer,
  getParentGames,
  getScreenshots,
  getSeries,
} from "../../api";
import ProductDetail from "../../components/shop/ProductDetail/ProductDetail";
import RelatedProductList from "../../components/shop/RelatedProductList/RelatedProductList";

const Product = ({ game }) => {
  const router = useRouter();
  const slug = router.query.slug;
  // const [game, setGame] = useState(null);
  const [gameTrailer, setGameTrailer] = useState(null);
  const [screenshots, setScreenshots] = useState(null);
  const [dlcs, setDlcs] = useState(null);
  const [relatedGames, setRelatedGames] = useState(null);
  const [parentGames, setParentGames] = useState(null);

  useEffect(() => {
    if (slug) {
      getGameTrailer(slug).then((res) => setGameTrailer(res.data));
      getScreenshots(slug).then((res) => setScreenshots(res.data));
      getDlcs(slug).then((res) => {
        setDlcs(res.data);
      });
      getSeries(slug).then((res) => setRelatedGames(res.data));
      getParentGames(slug).then((res) => setParentGames(res.data));
    }
    return () => {
      setGameTrailer(null);
      setScreenshots(null);
      setDlcs(null);
      setRelatedGames(null);
      setParentGames(null);
    };
  }, [slug]);

  return (
    <>
      <ProductDetail
        game={game}
        gameTrailer={gameTrailer}
        screenshots={screenshots}
      />
      {dlcs?.results?.length > 0 && (
        <RelatedProductList title={"DLC"} relatedProducts={dlcs} />
      )}
      {relatedGames?.results?.length > 0 && (
        <RelatedProductList
          title={"Related Games"}
          relatedProducts={relatedGames}
        />
      )}
      {parentGames?.results?.length > 0 && (
        <RelatedProductList title={"Part of"} relatedProducts={parentGames} />
      )}
    </>
  );
};

export const getStaticPaths = async (context) => {
  const response = await getGames();
  const slugs = response.data.results.map((game) => `/shop/${game.slug}`);
  return {
    fallback: "blocking",
    paths: slugs,
  };
};

export const getStaticProps = async (context) => {
  const slug = context.params.slug;

  const game = (await getGame(slug))?.data;

  return {
    props: {
      game,
    },
    revalidate: 1000,
  };
};

export default Product;
