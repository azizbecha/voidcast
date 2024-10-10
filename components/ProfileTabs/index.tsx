"use client";

import React, { useState } from "react";

import { About } from "./About";
import { Clips } from "./Clips";
import { Followers } from "./Followers";
import { Following } from "./Following";

import { UserProfile } from "@/interfaces";

interface ProfileTabsProps {
    profile: UserProfile;
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({ profile }) => {
    const [activeTab, setActiveTab] = useState("about"); // Default tab

    const tabStyle = "py-2 px-2 text-base font-bold border-b-2 w-1/4";
    const activeTabStyle = "border-accent text-accent";
    
    const tabs = [
        {
            name: 'About',
            label: 'about',
            component: <About profile={profile} />
        },
        {
            name: 'Clips',
            label: 'clips',
            component: <Clips userId={profile.id} />
        },
        {
            name: 'Followers',
            label: 'followers',
            component: <Followers />,
        },
        {
            name: 'Following',
            label: 'following',
            component: <Following />,
        },
    ];

    return (
        <div className="w-full mx-auto mt-2">
            {/* Tab Header */}
            <div className="flex justify-around border-b border-gray-700 transition-all duration-100">
                {
                    tabs.map((tab, key) => (
                        <button
                            key={key}
                            className={`${tabStyle} ${activeTab === tab.label ? activeTabStyle : "border-transparent"}`}
                            onClick={() => setActiveTab(tab.label)}
                        >
                            {tab.name}
                        </button>
                    ))
                }
            </div>

            {/* Tab Content */}
            <div className="p-4 bg-primary-800 rounded-lg mt-4">
                {
                    tabs.map((tab) => (
                        activeTab === tab.label && tab.component
                    ))
                }
            </div>
        </div>
    );
};
