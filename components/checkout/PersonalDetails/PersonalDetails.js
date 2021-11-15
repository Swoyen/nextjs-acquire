import classes from "./PersonalDetails.module.css";
const PersonalDetails = () => {
  return (
    <div className={classes.personaldetails}>
      <div className={classes.subheader}>Personal Details</div>
      <div className={classes.inputs}>
        <div className={classes.inputcontainer}>
          <label className={classes.inputlabel} htmlFor="fullname">
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            label="fullname"
            placeholder="Enter your full name here.."
          />
        </div>
        <div className={classes.inputcontainer}>
          <label className={classes.inputlabel} htmlFor="email">
            Email
          </label>
          <input
            type="text"
            id="email"
            label="email"
            placeholder="Enter your email here.."
          />
        </div>
        <div className={classes.inputcontainer}>
          <label className={classes.inputlabel} htmlFor="street">
            Street
          </label>
          <input type="text" id="street" label="street" />
        </div>
        <div className={classes.multiinputcontainer}>
          <div className={classes.inputcontainer}>
            <label className={classes.inputlabel} htmlFor="state">
              State
            </label>
            <input type="text" id="state" label="state" />
          </div>
          <div className={classes.inputcontainer}>
            <label className={classes.inputlabel} htmlFor="postcode">
              Post Code
            </label>
            <input type="text" id="postcode" label="postcode" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
