import ContentLoader from "react-content-loader";

const CustomLoader = () => {
  return (
    <ContentLoader
      width={275}
      style={{ margin: 0, padding: 0 }}
      height={400}
      viewBox="0 0 275 350"
    >
      {/* Only SVG shapes */}
      <rect x="0" y="0" rx="15" ry="15" width="275" height="180" />
      <rect x="2" y="200" rx="15" ry="15" width="275" height="40" />
      <rect x="2" y="260" rx="15" ry="15" width="275" height="25" />
      <rect x="2" y="300" rx="15" ry="15" width="100" height="50" />
    </ContentLoader>
  );
};

export default CustomLoader;
