"use client";
import { useTranslation } from "react-i18next";

export const Title = () => {
  const { t } = useTranslation();
  return <h4 className="text-primary-100">{t("people")}</h4>;
};
