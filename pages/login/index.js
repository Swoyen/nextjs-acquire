import {
  providers,
  getSession,
  getProviders,
  useSession,
} from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import LoginButton from "../../components/button/LoginButton";
import classes from "../../styles/Login.module.css";
import { AiFillGithub } from "react-icons/ai";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import axios from "axios";

const Login = ({ headers, url, error }) => {
  const router = useRouter();
  const [session, loading] = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      axios
        .get("/api/providers")
        .then((res) => {
          if (mounted) {
            console.log("Providers: ", providers);
            setProviders(res.data.providers);
          }
        })
        .catch((err) => console.log(err));

      axios
        .get("/api/test")
        .then((res) => {
          if (mounted) {
            console.log(res);
          }
        })
        .catch((err) => console.log(err));
    })();
  }, []);

  // console.log({ providers, session, headers, url });
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
      {error ? (
        <pre>{JSON.stringify(error, null, 2)}</pre>
      ) : (
        <>
          <div className={classes.login}>
            <h1 className={classes.header}>Login to acquire</h1>
            <p className={classes.para}>Login with next auth</p>
            <div onClick={handleGoBack} className={classes.backcontainer}>
              <MdOutlineArrowBackIosNew size=".8rem" /> <span>Go back</span>
            </div>
            <div className={classes.buttoncontainer}>
              <LoginButton
                provider={providers?.google}
                background={"white"}
                color={"black"}
                icon={<FcGoogle size="1.5rem" />}
              />
              <LoginButton
                provider={providers?.github}
                icon={<AiFillGithub size="1.5rem" />}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// export const getServerSideProps = async (context) => {
//   try {
//     const providers = await getProviders(context);
//     const session = await getSession(context);

//     return {
//       props: {
//         providers,
//         session,
//         headers: context.req.headers,
//         url: process.env.NEXTAUTH_URL,
//         // context: JSON.stringify(context),
//       },
//     };
//   } catch (ex) {
//     console.log(ex);
//     return { props: { error: JSON.stringify(ex) } };
//   }
// };

export default Login;
