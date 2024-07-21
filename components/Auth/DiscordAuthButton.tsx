"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "../Button";
import { useState } from "react";
import { IoLogoDiscord } from "react-icons/io5";

export default function DiscordAuthButton(props: { nextUrl?: string }) {
    const [clicked, setClicked] = useState(false);
    const supabase = createClient();

    const handleLogin = async () => {
        setClicked(true);
        await supabase.auth.signInWithOAuth({
            provider: "discord",
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
            icon={<IoLogoDiscord size={20} />}
            loading={clicked}
            disabled={clicked}
            onClick={handleLogin}
        >
            <span className="ml-2">Log in with Discord</span>
        </Button>
    );
}
