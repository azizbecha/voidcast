"use client";

import { useTranslation } from "react-i18next";

export const StickyChildren = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-start mb-3">
      <h4 className="text-primary-100">{t("create")}</h4>
    </div>
  );
};
