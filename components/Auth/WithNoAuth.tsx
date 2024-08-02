import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

interface Props {
  children: ReactNode;
}

const WithNoAuth = async ({ children }: Props) => {
    const supabase = createClient();

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (session) {
        redirect("/");
    }

  return <>{!session ? children : null}</>;
};

export default WithNoAuth;
