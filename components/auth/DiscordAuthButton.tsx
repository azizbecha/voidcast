"use client";

import { useState } from "react";
import { SiDiscord } from "react-icons/si";
import { createClient } from "@/lib/supabase/client";
import { Button } from "../ui/Button";
import { useTranslation } from "react-i18next";

export default function DiscordAuthButton() {
  const [clicked, setClicked] = useState(false);
  const supabase = createClient();

  const { t } = useTranslation();

  const handleLogin = async () => {
    setClicked(true);
    await supabase.auth.signInWithOAuth({
      provider: "discord",
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
      icon={<SiDiscord className="w-4 h-4" />}
      loading={clicked}
      disabled={clicked}
      onClick={handleLogin}
    >
      {t("loginWith")} Discord
    </Button>
  );
}
