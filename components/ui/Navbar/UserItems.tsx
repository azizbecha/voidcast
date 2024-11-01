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
            <MenuButton className="flex rounded-full">
                <Image
                    src={user?.user_metadata.avatar_url}
                    alt={`Avatar of ${user?.user_metadata.full_name}`}
                    width={40}
                    height={40}
                    className="h-6 w-6 rounded-full"
                />
            </MenuButton>
            <MenuItems className="absolute right-0 mt-3 w-56 bg-primary-700 rounded-lg shadow-lg">
                <div className="px-4 py-2 text-white font-medium">Signed in as {user?.user_metadata.full_name}</div>
                {menuItems.map((item, index) => (
                    <MenuItem key={index}>
                        <Link href={item.href} className="flex items-center px-4 py-2 gap-2 text-white">
                            <item.icon /> {item.label}
                        </Link>
                    </MenuItem>
                ))}
                <MenuItem>
                    <span onClick={logout} className="flex items-center px-4 py-2 gap-2 text-white cursor-pointer">
                        <FaSignOutAlt /> Sign out
                    </span>
                </MenuItem>
            </MenuItems>
        </Menu>
    );
}
