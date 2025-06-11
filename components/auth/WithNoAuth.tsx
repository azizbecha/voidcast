import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

interface Props {
  children: ReactNode;
}

const WithNoAuth = async ({ children }: Props) => {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  if (data.user) {
    redirect("/");
  }

  return children;
};

export default WithNoAuth;
