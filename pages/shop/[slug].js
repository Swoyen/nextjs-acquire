import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import {
//   getDlcs,
//   getGame,
//   getGames,
//   getGameTrailer,
//   getParentGames,
//   getScreenshots,
//   getSeries,
// } from "../../api_helper";
import ProductDetail from "../../components/shop/ProductDetail/ProductDetail";
import RelatedProductList from "../../components/shop/RelatedProductList/RelatedProductList";
import { getGame } from "../api/game";
import { getGames } from "../api/games";

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
      // getGameTrailer(slug).then((res) => setGameTrailer(res.data));
      // getScreenshots(slug).then((res) => setScreenshots(res.data));
      // getDlcs(slug).then((res) => {
      //   setDlcs(res.data);
      // });

      axios
        .get(`/api/game/${slug}/dlcs`)
        .then((res) => setDlcs(res.data))
        .catch((err) => console.error(err));

      axios
        .get(`/api/game/${slug}/series`)
        .then((res) => setRelatedGames(res.data))
        .catch((err) => console.error(err));

      axios
        .get(`/api/game/${slug}/parent-games`)
        .then((res) => setParentGames(res.data))
        .catch((err) => console.error(err));
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
      {dlcs && dlcs.length > 0 && (
        <RelatedProductList title={"DLC"} relatedProducts={dlcs} />
      )}
      {relatedGames && relatedGames.length > 0 && (
        <RelatedProductList
          title={"Related Games"}
          relatedProducts={relatedGames}
        />
      )}
      {parentGames && parentGames.length > 0 && (
        <RelatedProductList title={"Part of"} relatedProducts={parentGames} />
      )}
    </>
  );
};

export const getStaticPaths = async (context) => {
  try {
    const games = await getGames();
    const slugs = games.results.map((game) => `/shop/${game.slug}`);
    return {
      fallback: "blocking",
      paths: slugs,
    };
  } catch {
    return {
      fallback: "blocking",
      paths: "",
    };
  }
};

export const getStaticProps = async (context) => {
  try {
    const slug = context.params.slug;
    const game = await getGame(slug);
    return {
      props: {
        game,
      },
      revalidate: 1000,
    };
  } catch (err) {
    console.error(err);
    return {
      props: {},
    };
  }
};

export default Product;
