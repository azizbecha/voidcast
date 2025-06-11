"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "../ui/Button";
import { FaGoogle } from "react-icons/fa6";

export default function GoogleAuthButton() {
  const [clicked, setClicked] = useState(false);
  const supabase = createClient();

  const handleLogin = async () => {
    setClicked(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
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
      icon={<FaGoogle className="w-4 h-4" />}
      loading={clicked}
      disabled={clicked}
      onClick={handleLogin}
    >
      Log in with Google
    </Button>
  );
}
