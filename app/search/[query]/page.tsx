import { Metadata } from "next";

import { createClient } from "@/utils/supabase/server";

import WithAuth from "@/components/Auth/WithAuth";

import Navbar from "@/components/ui/Navbar";

import { GridProvider } from "@/components/ui/Grid/GridProvider";
import { LeftColumn } from "@/components/ui/Grid/LeftColumn";
import { MiddleColumn } from "@/components/ui/Grid/MiddleColumn";
import { RightColumn } from "@/components/ui/Grid/RightColumn";

import { UsersList } from "@/components/UsersList";
import { Tab, TabsProvider } from "@/components/Tabs";
import { ClipsTab } from "./ClipsTab";
import { PeopleTab } from "./PeopleTab";

export const metadata: Metadata = {
    title: "Search • VoidCast",
};

const SearchResults = async ({ params }: { params: { query: string } }) => {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    const { query } = params;

    return (
        <WithAuth>
            <Navbar user={user} />
            <GridProvider>
                <LeftColumn>
                    <h3 className="text-white mb-4">People</h3>
                    <UsersList />
                </LeftColumn>
                <MiddleColumn>
                    <div className="flex justify-between items-center">
                        <h3 className="text-white">Search results for: {query}</h3>
                    </div>
                    <TabsProvider>
                        <Tab className="p-0" label="Clips">
                            <ClipsTab query={query} />
                        </Tab>
                        <Tab label="People">
                            <PeopleTab query={query} />
                        </Tab>
                    </TabsProvider>
                </MiddleColumn>
                <RightColumn>
                    <h3 className="text-white mb-4">Right Col</h3>
                </RightColumn>
            </GridProvider>
        </WithAuth>
    );
}

export default SearchResults