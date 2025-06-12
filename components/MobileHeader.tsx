import { useEffect, useState } from "react";
import { CirclePlus } from "lucide-react";
import { SearchInput } from "./SearchInput";
import { UserDropdown } from "./UserDropdown";
import { createClient } from "@/lib/supabase/client";

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
      <CirclePlus size={30} />
    </div>
  );
};
