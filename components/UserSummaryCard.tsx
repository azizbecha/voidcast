import { kFormatter } from "@/lib/kFormatter";
import { Link } from "./ui/Link";
import { Avatar } from "./UserAvatar/Avatar";

export interface UserSummaryCardProps {
  displayName: string;
  username: string;
  numFollowers?: number;
  numFollowing?: number;
  avatarUrl: string;
  bio?: string | null;
  website?: string;
}

export const UserSummaryCard: React.FC<UserSummaryCardProps> = ({
  displayName,
  username,
  numFollowers = 1100,
  numFollowing = 250,
  bio,
  website,
  avatarUrl,
}) => (
  <div className="flex flex-col rounded-8 bg-primary-800 p-4 w-full">
    <button className="flex">
      <div className="flex">
        <Avatar size="default" src={avatarUrl} />
      </div>
      <div className="flex mt-2">
        <div className="flex flex-col ml-3">
          <span className="text-primary-100 font-bold overflow-hidden break-all text-left">
            {displayName}
          </span>
          <span className="text-primary-300 text-left break-all">
            @{username}
          </span>
        </div>
      </div>
    </button>
    <div className="flex mt-3 gap-2">
      <div>
        <span className="text-primary-100 font-bold">
          {kFormatter(numFollowers)}
        </span>
        <span className="text-primary-300 ml-1.5 lowercase">Followers</span>
      </div>
      <div>
        <span className="text-primary-100 font-bold">
          {kFormatter(numFollowing)}
        </span>
        <span className="text-primary-300 ml-1.5 lowercase">Following</span>
      </div>
    </div>
    <div
      data-testid="current-user:bio"
      className="flex text-primary-300 mt-3 break-words text-left"
    >
      {bio}
    </div>
    {website && <Link link={website} />}
  </div>
);
