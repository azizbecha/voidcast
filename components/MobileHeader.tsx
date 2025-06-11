import { CirclePlus } from "lucide-react";
import { Avatar } from "./UserAvatar/Avatar";
import { SearchInput } from "./SearchInput";

export const MobileHeader = () => (
  <div className="flex items-center justify-between px-2 py-2 gap-4">
    <Avatar
      src="https://avatars.githubusercontent.com/u/63454940?s=96&v=4"
      size="xs"
    />
    <SearchInput />
    <CirclePlus size={30} />
  </div>
);
