import { useRouter } from "next/router";
import {
  I18N_DIRECTION_LTR,
  I18N_DIRECTION_RTL,
  I18N_DIRECTIONS,
  I18N_ISO_LOCALE,
} from "../constants/i18n.constants";
import { i18n, useTranslation } from "next-i18next";
import { addCookie } from "@/utils/utilities";

export const useTranslationHelper = (ns = ["common", "messages"]) => {
  const {
    t,
    i18n: { language },
  } = useTranslation(ns);
  const router = useRouter();
  const direction = I18N_DIRECTIONS[language];

  const setLanguage = (lang) => {
    addCookie("NEXT_LOCALE", lang);
    i18n?.changeLanguage(lang).then(() => {
      router
        .push(router.asPath, router.asPath, { locale: lang })
        .then(() => router.reload());
    });
  };

  const setNoLanguageRefresh = (lang) => {
    i18n?.changeLanguage(lang).then(() => {
      router
        .push(router.asPath, router.asPath, { locale: lang })
        .then(() => {});
    });
  };

  return {
    t,
    i18n,
    language,
    direction,
    locale: I18N_ISO_LOCALE[language],
    isDirectionLtr: direction === I18N_DIRECTION_LTR,
    isDirectionRtl: direction === I18N_DIRECTION_RTL,
    setLanguage,
    setNoLanguageRefresh,
  };
};
