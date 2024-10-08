"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "../ui/Button";
import { useState } from "react";
import { FaGithub } from "react-icons/fa6";

export default function GitHubAuthButton(props: { nextUrl?: string }) {
  const [clicked, setClicked] = useState(false);
  const supabase = createClient();

  const handleLogin = async () => {
    setClicked(true);
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${props.nextUrl || ""}`,
      },
    });
  };

  return (
    <Button
      size="big"
      color="secondary"
      className="justify-center py-3 text-lg"
      icon={<FaGithub size={20} />}
      loading={clicked}
      disabled={clicked}
      onClick={handleLogin}
    >
      <span className="ml-2">Log in with GitHub</span>
    </Button>
  );
}
