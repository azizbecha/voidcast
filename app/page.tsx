
import WithAuth from "@/components/Auth/WithAuth";

import { GridProvider } from "@/components/ui/Grid/GridProvider";
import { LeftColumn } from "@/components/ui/Grid/LeftColumn";
import { MiddleColumn } from "@/components/ui/Grid/MiddleColumn";
import { RightColumn } from "@/components/ui/Grid/RightColumn";

import Navbar from "@/components/ui/Navbar";

import ClipsScroller from "@/components/ClipsScroller";
import { UsersList } from "@/components/UsersList";

import { createClient } from "@/utils/supabase/server";

export default async function Home() {

  const supabase = createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  return (
    <WithAuth>
      <Navbar user={user} />
      <div className="bg-primary-900 text-white h-screen">
        <GridProvider>
          <LeftColumn>
            <h3 className="text-white mb-4">People</h3>
            <UsersList />
          </LeftColumn>
          <MiddleColumn>
            <h3 className="text-white mb-4">Your feed</h3>
            <ClipsScroller />
          </MiddleColumn>
          <RightColumn>
            <div className="bg-primary-700 p-4 rounded-lg">
              
            </div>
          </RightColumn>
        </GridProvider>
      </div>
    </WithAuth>
  );
}
