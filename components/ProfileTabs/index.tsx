import React from "react";

import { About } from "./About";
import { Clips } from "./Clips";
import { Followers } from "./Followers";
import { Following } from "./Following";

import { UserProfile } from "@/interfaces";
import { Tab, TabsProvider } from "../Tabs";

interface ProfileTabsProps {
    profile: UserProfile;
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({ profile }) => {
    
    const tabs = [
        {
            name: 'About',
            component: <About profile={profile} />
        },
        {
            name: 'Clips',
            component: <Clips userId={profile.id} />
        },
        {
            name: 'Followers',
            component: <Followers />,
        },
        {
            name: 'Following',
            component: <Following />,
        },
    ];

    return (
        <TabsProvider>
            {
                tabs.map((tab, key) => <Tab label={tab.name} key={key}>{tab.component}</Tab>)
            }
        </TabsProvider>
    );
};
