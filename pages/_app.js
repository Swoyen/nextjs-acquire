import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";
import { Provider } from "react-redux";
import configureStore from "../store/configureStore";
import Aos from "aos";
import "aos/dist/aos.css";
import Scrollbars from "react-custom-scrollbars-2";

const store = configureStore();

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const ref = useRef(null);

  useEffect(() => {}, []);

  useEffect(() => {
    if (router) {
      const handleStart = (url) => {
        url !== router.pathname
          ? ref?.current?.continuousStart(1, 200)
          : ref?.current?.complete();
      };

      const handleComplete = (url) => {
        ref?.current?.complete();
      };

      router.events.on("routeChangeStart", handleStart);
      router.events.on("routeChangeComplete", handleComplete);
      router.events.on("routeChangeError", handleComplete);
    }
  }, [router]);

  return (
    <>
      <Provider store={store}>
        <Layout>
          <LoadingBar ref={ref} shadow={true} />
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;
