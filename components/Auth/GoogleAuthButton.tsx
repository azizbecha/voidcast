"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "../Button";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

export default function GoogleAuthButton(props: { nextUrl?: string }) {
  const [clicked, setClicked] = useState(false);
  const supabase = createClient();

  const handleLogin = async () => {
    setClicked(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${props.nextUrl || ""}`,
      },
    });
  };

  return (
    <Button
      size="big"
      color="secondary"
      className="justify-center py-3 text-lg"
      icon={<FcGoogle size={20} />}
      loading={clicked}
      disabled={clicked}
      onClick={handleLogin}
    >
      <span className="ml-2">Log in with Google</span>
    </Button>
  );
}