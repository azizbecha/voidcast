import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server-client";

interface Props {
  children: ReactNode;
}

const WithNoAuth = async ({ children }: Props) => {
    const supabase = createSupabaseServerClient();

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (session) {
        redirect("/");
    }

  return <>{!session ? children : null}</>;
};

export default WithNoAuth;
