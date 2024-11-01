"use client";

import React from "react";

import { User } from "@supabase/supabase-js";

import SearchBar from "./SearchBar";
import NavigationItems from "./NavigationItems";
import UserMenu from "./UserItems";
import Logo from "./Logo";

interface Props {
    user: User | null;
}

export default function Navbar({ user }: Props) {
    return (
        <nav className="bg-primary-900 w-full z-20 top-0 start-0">
            <div className="w-full grid grid-cols-12 items-center p-2 sm:px-4 sm:py-3 md:px-6 md:py-4 lg:px-8 lg:py-5">
                <Logo />
                <div className="col-span-8 sm:col-span-6">
                    <SearchBar />
                </div>
                <div className="col-span-2 sm:col-span-3 flex items-center justify-end gap-4">
                    <NavigationItems />
                    <UserMenu user={user} />
                </div>
            </div>
        </nav>
    );
}
