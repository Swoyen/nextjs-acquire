import { providers, getSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import LoginButton from "../../components/button/LoginButton";
import classes from "../../styles/Login.module.css";
import { AiFillGithub } from "react-icons/ai";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const Login = ({ providers, session }) => {
  const router = useRouter();

  useEffect(() => {
    if (session && router) {
      router.query.callbackUrl
        ? router.push(router.query.callbackUrl)
        : router.push("/");
    }
  }, [session, router]);

  const handleGoBack = () => {
    // router.back();
    router.query.callbackUrl
      ? router.push(router.query.callbackUrl)
      : router.push("/");
  };

  return (
    <div className={classes.logincontainer}>
      <div className={classes.login}>
        <h1 className={classes.header}>Login to acquire</h1>
        <p className={classes.para}>Login with next auth</p>
        <div onClick={handleGoBack} className={classes.backcontainer}>
          <MdOutlineArrowBackIosNew size=".8rem" /> <span>Go back</span>
        </div>
        <div className={classes.buttoncontainer}>
          <LoginButton
            provider={providers.google}
            background={"white"}
            color={"black"}
            icon={<FcGoogle size="1.5rem" />}
          />
          <LoginButton
            provider={providers.github}
            icon={<AiFillGithub size="1.5rem" />}
          />
        </div>
      </div>
    </div>
  );
};

Login.getInitialProps = async (context) => {
  try {
    return {
      providers: await providers(context),
      session: await getSession(context),
    };
  } catch (ex) {
    console.log(ex);
  }
};

export default Login;
