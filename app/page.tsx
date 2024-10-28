import { Metadata } from "next";
import Link from "next/link";

import WithAuth from "@/components/Auth/WithAuth";

import { GridProvider } from "@/components/ui/Grid/GridProvider";
import { LeftColumn } from "@/components/ui/Grid/LeftColumn";
import { MiddleColumn } from "@/components/ui/Grid/MiddleColumn";
import { RightColumn } from "@/components/ui/Grid/RightColumn";

import Navbar from "@/components/ui/Navbar";

import { ProfileCard } from "@/components/ProfileCard";
import ClipsScroller from "@/components/ClipsScroller";
import { UsersList } from "@/components/UsersList";

import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/Button";

import { FaScissors } from "react-icons/fa6";

export const metadata: Metadata = {
  title: "Home • VoidCast",
};

export default async function Home() {

  const supabase = createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  return (
    <WithAuth>
      <Navbar user={user} />
      <GridProvider>
        <LeftColumn>
          <h3 className="text-white mb-4">People</h3>
          <UsersList />
        </LeftColumn>
        <MiddleColumn>
          <div className="overflow-y-scroll h-full">
            <div className="flex justify-between items-center mb-4 relative">
              <h3 className="text-white">Your feed</h3>
              <Link href='create'>
                <Button size="small" color="primary" icon={<FaScissors />}>
                  Create
                </Button>
              </Link>
            </div>
            <ClipsScroller />
          </div>
        </MiddleColumn>
        <RightColumn>
          <ProfileCard user={user} />
        </RightColumn>
      </GridProvider>
    </WithAuth>
  );
}
