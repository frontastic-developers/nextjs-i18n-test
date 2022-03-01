import React from "react";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

function FrontasticStarter({ Component, pageProps, router }: AppProps) {
  return <Component {...pageProps} router={router} />;
}

// export default appWithTranslation(FrontasticStarter);
export default appWithTranslation(
  FrontasticStarter,
  require("../i18next.config")
);
