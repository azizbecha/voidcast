"use client"

import React, { useState } from "react";

import { LeftColumn } from "@/components/ui/Grid/LeftColumn";
import { UserProfile } from "@/interfaces";

import { ProfileTab } from "./ProfileTab";

interface ProfileTabsProps {
    profile: UserProfile;
}

const menus = [
    {
        title: 'User settings',
        tabs: [
            {
                title: 'Profile',
                label: 'profile',
            },
            {
                title: 'Account',
                label: 'account',
            },
        ]
    },
    {
        title: 'App settings',
        tabs: [
            {
                title: 'Appearance',
                label: 'appearance',
            },
        ]
    },
];

export const MyProfileTabs: React.FC<ProfileTabsProps> = ({ profile }) => {
    
    const [currentTab, setCurrentTab] = useState('profile');

    // Function to render content based on the current tab
    const renderTabContent = () => {
        switch (currentTab) {
            case 'profile':
                return <ProfileTab profile={profile} />
            case 'account':
                return <div>Account Settings</div>;
            case 'appearance':
                return <div>Appearance Settings</div>;
            default:
                return <div>Select a tab</div>;
        }
    };

    return (
        <>
            <LeftColumn>
                <h3 className="text-white mb-4">Settings</h3>
                {menus.map((menu, key) => (
                    <div key={key}>
                        <div className="space-y-2">
                            <span className="text-primary-300 font-bold uppercase">{menu.title}</span>
                            {menu.tabs.map((tab, key) => (
                                <button
                                    onClick={() => setCurrentTab(tab.label)}
                                    key={key}
                                    className={`w-full text-start font-bold bg-primary-${tab.label === currentTab ? '600' : '500'} px-3 py-1 text-sm rounded-md`}
                                >
                                    {tab.title}
                                </button>
                            ))}
                        </div>
                        <hr className="border-primary-700 my-3" />
                    </div>
                ))}
            </LeftColumn>
            <div className="md:block sm:col-span-9">
                {renderTabContent()}
            </div>
        </>
    );
};
