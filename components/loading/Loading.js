import classes from "./Loading.module.css";
const Loading = (props) => {
  return (
    <div className={props.loading ? classes.body_loading : classes.none}>
      <div className={classes.lds_ellipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
