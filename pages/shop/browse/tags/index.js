import React from "react";
import { getTags } from "../../../../api";
import BrowseCard from "../../../../components/shop/Browse/BrowseCard";
import ShopLayout from "../../../../components/shop/ShopLayout/ShopLayout";
import classes from "../../../../styles/Browse.module.css";

const tags = ({ tags }) => {
  return (
    <ShopLayout>
      <div className={"section-header"}>#Tags</div>
      <div className={classes.container}>
        {tags.map((tag) => (
          <BrowseCard
            baseUrl="/shop/browse/tags"
            data={tag}
            url="tags"
            subHeading={"Top Games"}
            key={tag.id}
          />
        ))}
      </div>
    </ShopLayout>
  );
};

export const getStaticProps = async () => {
  // const slug = context.params.slug;
  const tags = (await getTags())?.data.results;

  return {
    props: {
      tags,
    },
    revalidate: 1000,
  };
};
export default tags;
