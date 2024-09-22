import Link from "next/link";

import WithAuth from "@/components/Auth/WithAuth";

import { GridProvider } from "@/components/ui/Grid/GridProvider";
import { LeftColumn } from "@/components/ui/Grid/LeftColumn";
import { MiddleColumn } from "@/components/ui/Grid/MiddleColumn";
import { RightColumn } from "@/components/ui/Grid/RightColumn";

import Navbar from "@/components/ui/Navbar";

import ClipsScroller from "@/components/ClipsScroller";
import { UsersList } from "@/components/UsersList";

import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/Button";
import { FaScissors } from "react-icons/fa6";

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
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white">Your feed</h3>
              <Link href='create'>
                <Button size="small" color="primary-300" icon={<FaScissors />}>
                  Create
                </Button>
              </Link>
            </div>
            <ClipsScroller />
          </MiddleColumn>
          <RightColumn>
            <h3 className="text-white mb-4">Hello World</h3>
            <div className="bg-primary-800 p-4 rounded-lg">
              <p>im too tired to complete working on this, thanks for understanding 👍</p>
            </div>
          </RightColumn>
        </GridProvider>
      </div>
    </WithAuth>
  );
}
