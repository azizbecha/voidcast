import React from "react";
import { MdVerified } from "react-icons/md";

import { Avatar } from "./UserAvatar/Avatar";

interface Props {
  avatar: string;
  fullname: string;
  username: string;
  verified: boolean;
}

export const UserMinimizedCard: React.FC<Props> = ({
  avatar,
  fullname,
  username,
  verified,
}) => (
  <div className="flex items-center py-2 gap-2">
    <Avatar size="sm" src={avatar} alt={`Image of ${fullname}`} />
    <div>
      <div className="flex flex-row space-x-1.5 items-center justify-start">
        <span className="text-primary-100 text-md font-semibold">{fullname}</span>
        {verified && <MdVerified className="text-blue-500" size={15} />}
      </div>
      <p className="text-base text-primary-300">@{username}</p>
    </div>
  </div>
);
