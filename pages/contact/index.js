import Loader from "react-loader-spinner";
import classes from "../../styles/Contact.module.css";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {};
    Array.from(e.currentTarget.elements).forEach((field) => {
      if (!field.name) return;
      formData[field.name] = field.value;
    });
    fetch("/api/mail", {
      method: "post",
      body: JSON.stringify(formData),
    });
    console.log(formData);
  };
  return (
    <div>
      <h2>Send me a message</h2>
      <form className={classes.form} onSubmit={handleSubmit} method="post">
        <div className={classes.formline}>
          <label htmlFor="name">Name</label>
          <input className={classes.input} type="text" name="name" />
        </div>
        <div className={classes.formline}>
          <label htmlFor="email">Email</label>
          <input className={classes.input} type="text" name="email" />
        </div>
        <div className={classes.formline}>
          <label htmlFor="message">Message</label>
          <textarea className={classes.input} rows="4" name="message" />
        </div>
        <button type="submit" className="mainbutton" disabled>
          <Loader type="ThreeDots" color="white" height="30" /> Under
          Construction
        </button>
      </form>
    </div>
  );
};

export default Contact;
