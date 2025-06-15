"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export const StickyChildren = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-start mb-3">
      <h4 className="text-primary-100">{t("yourFeed")}</h4>
      <Button onClick={() => router.push('create')}>{t("create")}</Button>
    </div>
  );
};
