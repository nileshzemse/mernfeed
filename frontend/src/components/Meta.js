import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <meta description={description} />
      <meta keyword={keywords} />
      <title>{title}</title>
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Pro Shop",
  description: "Best Products as best price",
  keywords: "electronics, Shirts",
};
export default Meta;
