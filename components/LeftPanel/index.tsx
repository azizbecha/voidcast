import Link from "next/link";
import { UserMinimizedCard } from "@/components/UserMinimizedCard";
import { createClient } from "@/lib/supabase/server";
import { Title } from "./Title";

export const LeftPanel = async () => {
  const supabase = await createClient();

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="w-full flex flex-col flex-1 overflow-y-auto">
      <Title />
      <div className="flex flex-col mt-3 overflow-y-auto scrollbar-thin scrollbar-thumb-primary-700 overflow-x-hidden scrollbar-hide">
        {data?.map((user, key) => (
          <Link key={key} href={`u/${user.username}`}>
            <UserMinimizedCard
              key={key}
              avatar={user.avatar}
              fullname={user.full_name}
              username={user.username}
              verified={user.verified}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
