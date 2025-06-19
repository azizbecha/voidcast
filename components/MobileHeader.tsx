import { useEffect, useState } from "react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/client";

import { SearchInput } from "./SearchInput";
import { UserDropdown } from "./UserDropdown";
import { FaPen } from "react-icons/fa6";

export const MobileHeader = () => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserImage = async () => {
      const { data, error } = await createClient().auth.getSession();
      if (error) console.error(error);
      setImage(data.session?.user.user_metadata.avatar_url ?? null);
    };
    fetchUserImage();
  }, []);

  return (
    <div className="flex items-center justify-between px-2 py-2 gap-4">
      <UserDropdown image={image} align="start" />
      <SearchInput />
      <Link href="create">
        <FaPen size={30} />
      </Link>
    </div>
  );
};
