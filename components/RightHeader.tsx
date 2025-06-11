"use client"

import { useRouter } from "next/navigation";
import { FaBell } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { createClient } from "@/lib/supabase/client";

const RightHeader = () => {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="flex space-x-4 items-center justify-end focus:outline-no-chrome w-full">
      <button onClick={logout}>
        <FaPen className="text-primary-200 w-4.5 h-4" />
      </button>
      <button>
        <FaBell className="text-primary-200 w-4.5 h-4.5" />
      </button>
    </div>
  );
};

export default RightHeader;
