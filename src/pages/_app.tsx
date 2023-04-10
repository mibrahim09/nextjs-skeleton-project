import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

import nextI18NextConfig from "../../next-i18next.config";
import { Amplify, Auth } from "aws-amplify";
import { useTranslationHelper } from "@/hooks/i18n.hooks";
import { useEffect } from "react";
import { AMPLIFY_CONFIG, AUTH_CONFIG } from "@/common/aws-exports";

Amplify.configure(AMPLIFY_CONFIG);

function App({ Component, pageProps }: AppProps) {
  const { language } = useTranslationHelper();

  useEffect(() => {
    Auth.configure(AUTH_CONFIG(language));
  }, [language]);

  return <Component {...pageProps} />;
}

export default appWithTranslation(App, nextI18NextConfig);
