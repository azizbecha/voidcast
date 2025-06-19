"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";

export const StickyChildren = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-start mb-3">
      <h4 className="text-primary-100">{t("yourFeed")}</h4>
      <Link href="create">
        <Button>{t("create")}</Button>
      </Link>
    </div>
  );
};
