import { UserSummaryCard } from "@/components/UserSummaryCard";
import { createClient } from "@/lib/supabase/server";

export const RightPanel = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data } = await supabase
    .from("profiles")
    .select(`*`)
    .eq("id", user.id)
    .single();

  return (
    <UserSummaryCard
      avatarUrl={data.avatar}
      displayName={data.full_name}
      username={data.username}
      bio={data.bio}
      website={data.url}
    />
  );
};
