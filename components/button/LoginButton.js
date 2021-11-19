import { signIn } from "next-auth/client";
import classes from "./LoginButton.module.css";

const LoginButton = ({ provider, background, color, icon }) => {
  return (
    <button
      className={classes.button}
      style={{ background: background, color: color }}
      onClick={() => signIn(provider.id)}
    >
      {icon} <span>Sign in with {provider?.name}</span>
    </button>
  );
};

LoginButton.defaultProps = {
  color: "white",
  background: "black",
};

export default LoginButton;
