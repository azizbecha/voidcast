import React from "react";

import Image from "next/image";
import Link from "next/link";

import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import { FaBug, FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";

interface Props {
    user: User | null;
}

export default function UserMenu({ user }: Props) {
    const supabase = createClient();
    const logout = async () => await supabase.auth.signOut();

    const menuItems = [
        { label: "Profile", href: "/profile", icon: FaUser },
        { label: "Settings", href: "/settings", icon: FaCog },
        { label: "Report a bug", href: "https://github.com/issues", icon: FaBug, blank: true },
    ];

    return (
        <Menu as="div" className="relative">
            <div>
                <MenuButton className="relative flex rounded-full text-sm focus:none">
                    <Image
                        src={user?.user_metadata.avatar_url}
                        className="h-6 w-6 rounded-full"
                        alt={`Image of  ${user?.user_metadata.full_name}`}
                        width={40}
                        height={40}
                    />
                </MenuButton>
            </div>
            <MenuItems className="absolute right-0 z-50 mt-3 w-56 origin-top-right rounded-lg bg-primary-700 shadow-lg">
                <div className="text-white px-4 py-2 font-medium">Signed as {user?.user_metadata.full_name}</div>
                <hr />
                {menuItems.map((item, key) => (
                    <MenuItem key={key}>
                        <Link
                            href={item.href}
                            className={`hover:bg-primary-600 flex items-center gap-2 px-4 py-2 transition text-base font-medium text-white`}
                        >
                            <item.icon /> {item.label}
                        </Link>
                    </MenuItem>
                ))}
                <hr />
                <MenuItem>
                    <span
                        onClick={logout}
                        className={`w-full bg-primary-600 hover:bg-accent cursor-pointer rounded-b-lg flex justify-start items-center gap-2 px-4 py-2 transition text-base text-start font-medium text-white`}
                    >
                        <FaSignOutAlt /> Sign out
                    </span>
                </MenuItem>
            </MenuItems>
        </Menu>
    );
}
