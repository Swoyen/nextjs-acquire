import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { getGamesA, getPlatformGames } from "../../../../api_helper";
import ShopLayout from "../../../../components/shop/ShopLayout/ShopLayout";

const Platforms = () => {
  const router = useRouter();
  const slug = router.query.slug;

  useEffect(() => {
    if (slug) getGamesA({ platforms: slug }).then((res) => console.log(res));
  }, [slug]);
  return <ShopLayout>{slug}</ShopLayout>;
};

export default Platforms;
