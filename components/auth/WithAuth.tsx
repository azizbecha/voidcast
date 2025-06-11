import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

interface WithAuthProps {
  children: ReactNode;
}

const WithAuth = async ({ children }: WithAuthProps) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  return children;
};

export default WithAuth;
