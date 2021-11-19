import { useRouter } from "next/router";
import React from "react";
import ShopLayout from "../../../../components/shop/ShopLayout/ShopLayout";

const Creator = () => {
  const router = useRouter();
  const slug = router.query.slug;
  return <ShopLayout>{slug}</ShopLayout>;
};

export default Creator;
