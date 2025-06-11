import React from "react";
import { Avatar } from "./UserAvatar/Avatar";
import { Home, Calendar, Edit } from "lucide-react"; // Example icons
import { Separator } from "./ui/Separator";

export const TabletSidebar: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Fixed buttons */}
      <div className="flex flex-col items-center gap-5">
        <button className="bg-accent p-2 rounded-full">
          <Home className="text-white" />
        </button>
        <button className="bg-primary-700 p-2 rounded-full">
          <Calendar className="text-white" />
        </button>
        <button className="bg-primary-700 p-2 rounded-full">
          <Edit className="text-white" />
        </button>
      </div>

      {/* Divider */}
      <Separator className="border-t border-gray-700 my-4" />

      {/* Scrollable avatar list */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-2 space-y-4">
        {Array(20)
          .fill(0)
          .map((_, key) => (
            <Avatar
              key={key}
              size="sm"
              src="https://avatars.githubusercontent.com/u/63454940?s=96&v=4"
              className="justify-center mx-auto"
            />
          ))}
      </div>
    </div>
  );
};
