import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as NextProvider } from "next-auth/client";

import { store, persistor } from "../store/configureStore";
import { SideBarProvider } from "../context/SideBarContext";
import ReactTooltip from "react-tooltip";

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
        <PersistGate persistor={persistor}>
          <NextProvider session={pageProps.session}>
            <SideBarProvider>
              <Layout>
                <ReactTooltip effect="solid" delayShow={200} />
                <LoadingBar ref={ref} shadow={true} />
                <Component {...pageProps} />
              </Layout>
            </SideBarProvider>
          </NextProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
