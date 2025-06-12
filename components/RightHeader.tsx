import { useEffect, useState } from "react";
import { FaPen, FaBell } from "react-icons/fa";
import { UserDropdown } from "./UserDropdown";
import { createClient } from "@/lib/supabase/client";

const RightHeader = () => {
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
    <div className="flex space-x-4 items-center justify-end w-full">
      <button>
        <FaPen className="text-primary-200 w-4.5 h-4" />
      </button>
      <button>
        <FaBell className="text-primary-200 w-4.5 h-4.5" />
      </button>
      <UserDropdown image={image} />
    </div>
  );
};

export default RightHeader;
