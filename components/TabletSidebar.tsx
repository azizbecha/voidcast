"use server";

import React from "react";
import Link from "next/link";
import { Home, Calendar, Edit } from "lucide-react"; // Example icons
import { createClient } from "@/lib/supabase/server";

import { Avatar } from "./UserAvatar/Avatar";
import { Separator } from "./ui/Separator";

export const TabletSidebar = async () => {
  const supabase = await createClient();

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="w-full flex flex-col overflow-y-auto">
      {/* Fixed buttons */}
      <div className="flex flex-col items-center gap-4">
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
        {data?.map((user, key) => (
          <Link key={key} href={`u/${user.username}`}>
            <Avatar
              key={key}
              size="sm"
              src={user.avatar}
              className="justify-center mx-auto"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
