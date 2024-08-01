import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

interface WithAuthProps {
  children: ReactNode;
}

const WithAuth = async ({ children }: WithAuthProps) => {
    const supabase = createClient();

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        redirect("/login");
    }

  return <>{session ? children : null}</>;
};

export default WithAuth;
