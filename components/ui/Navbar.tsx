"use client";

import React, { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

import { Input } from './Input';

import { FaBug, FaCompass, FaUser, FaCog, FaMagic, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { FaScissors } from "react-icons/fa6";

interface Props {
  user: User | null;
}

const menuItems = [
  {
    label: "Profile",
    href: "/profile",
    icon: FaUser,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: FaCog,
  },
  {
    label: "Report a bug",
    href: "https://github.com/azizbecha/voidcast/issues",
    icon: FaBug,
    blank: true,
  },
];

const items = [
  {
    label: "FYP",
    href: "/fyp",
    icon: FaMagic,
  },
  {
    label: "Discover",
    href: "/discover",
    icon: FaCompass,
  },
  {
    label: "Create",
    href: "/create",
    icon: FaScissors,
  },
];

export default function Navbar(props: Props) {
  const supabase = createClient();
  const router = useRouter();
  const { user } = props;

  const [searchQuery, setSearchQuery] = useState("");

  // Effect to check the current URL and set the placeholder
  useEffect(() => {
    const currentPath = window.location.pathname; // Get the current URL path
    const pathSegments = currentPath.split('/'); // Split the path into segments
    if (pathSegments[1] === 'search' && pathSegments[2]) {
      setSearchQuery(decodeURIComponent(pathSegments[2])); // Set the search query from the URL
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      router.push(`/search/${encodeURIComponent(searchQuery)}`);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <nav className="bg-primary-900 w-full z-20 top-0 start-0">
      <div className="w-full grid grid-cols-12 items-center p-2 sm:px-4 sm:py-3 md:px-6 md:py-4 lg:px-8 lg:py-5">
        <Link href="/" className="flex items-center justify-start col-span-2 sm:col-span-3 space-x-2">
          <Image width={40} height={40} src="/images/logo.png" className="h-6 w-6" alt="VoidCast Logo" />
          <span className="self-center text-2xl font-bold whitespace-nowrap text-accent hidden md:block">
            VoidCast
          </span>
          <span className="hidden md:block bg-accent px-2 py-0.5 rounded-full text-xs text-white font-bold">BETA</span>
        </Link>
        <form className="flex items-center justify-center col-span-8 sm:col-span-6" onSubmit={handleSearch}>
          <Input
            icon={<FaSearch />}
            required
            placeholder={`Search for clips, episodes, users or communities`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        <div className="flex items-center justify-end col-span-2 sm:col-span-3 gap-4">
          <div className="space-x-1 hidden md:flex">
            {items.map((item, key) => (
              <Link href={item.href} key={key}>
                <div className="rounded-full p-2 bg-primary-600 text-white">
                  <item.icon />
                </div>
              </Link>
            ))}
          </div>
          <div className="flex">
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
          </div>
        </div>
      </div>
    </nav>
  );
}
