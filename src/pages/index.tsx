import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getSsrLanguage } from "@/utils/utilities";
import nextI18NextConfig from "../../next-i18next.config";
import { GetServerSideProps } from "next";
import { useTranslationHelper } from "@/hooks/i18n.hooks";
import { Box } from "@mui/system";

export default function Index() {
  const { t } = useTranslationHelper();
  return <Box>lang={t("hello_nawy")}</Box>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const language = getSsrLanguage(context);
  return {
    props: {
      ...(await serverSideTranslations(
        language,
        ["common", "messages"],
        nextI18NextConfig
      )),
    },
  };
};
