"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";

export const StickyChildren = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex justify-between items-start mb-3">
      <h4 className="text-primary-100">{t("yourFeed")}</h4>
      <Button onClick={() => changeLanguage("fr")}>{t("create")}</Button>
    </div>
  );
};
