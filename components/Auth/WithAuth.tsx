import { ReactNode, useEffect } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { redirect } from "next/navigation";

interface WithAuthProps {
  children: ReactNode;
}

const WithAuth = async ({ children }: WithAuthProps) => {
    const supabase = createSupabaseServerClient();

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        redirect("/login");
    }

  return <>{session ? children : null}</>;
};

export default WithAuth;
