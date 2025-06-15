"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "../ui/Button";
import { useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

export default function GitHubAuthButton() {
  const [clicked, setClicked] = useState(false);
  const supabase = createClient();
  const { t } = useTranslation();

  const handleLogin = async () => {
    setClicked(true);
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/oauth?next=/`,
      },
    });
  };

  return (
    <Button
      size="big"
      color="secondary"
      className="justify-center py-3 text-lg"
      icon={<FaGithub className="w-4 h-4" />}
      loading={clicked}
      disabled={clicked}
      onClick={handleLogin}
    >
      {t("loginWith")} GitHub
    </Button>
  );
}
