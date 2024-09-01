import WithAuth from "@/components/Auth/WithAuth";
import ClipsScroller from "@/components/ClipsScroller";
import { GridProvider } from "@/components/ui/Grid/GridProvider";
import { LeftColumn } from "@/components/ui/Grid/LeftColumn";
import { MiddleColumn } from "@/components/ui/Grid/MiddleColumn";
import { RightColumn } from "@/components/ui/Grid/RightColumn";
import Navbar from "@/components/ui/Navbar";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {

  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // console.log(user);

  return (
    <>
      <Navbar user={user} />
      <div className="bg-primary-900 text-white h-screen">
        <GridProvider>
          <LeftColumn>
            <h3 className="text-white mb-4">Left Col</h3>
          </LeftColumn>
          <MiddleColumn>
            {/* <h3>Clips</h3> */}
            <ClipsScroller />
          </MiddleColumn>
          <RightColumn>
            <div className="text-white">
              <h3 className="mb-4">Right Col</h3>
            </div>
          </RightColumn>
        </GridProvider>
      </div>
    </>
  );
}
