"use client"

import useSession from "@/hooks/useSession";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Input } from './Input';
import { FaBug, FaCompass, FaScissors, FaUser } from "react-icons/fa6";
import { FaCog, FaMagic, FaSearch, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";

const menuItems = [
  {
    label: "Profile",
    href: "/profile",
    icon: FaUser
  },
  {
    label: "Settings",
    href: "/settings",
    icon: FaCog
  },
  {
    label: "Report a bug",
    href: "https://github.com/azizbecha/voidcast",
    icon: FaBug
  }
]

export default function Navbar() {

  const { session: session } = useSession();
  const user = session?.user;

  return (
    <nav className="bg-primary-900 w-full z-20 top-0 start-0">
      <div className="w-full grid grid-cols-12 items-center p-2 sm:px-4 sm:py-3 md:px-5 md:py-4 lg:px-6 lg:py-5">
        <Link href="/" className="flex items-center col-span-2 sm:col-span-3">
          <img src="images/logo.png" className="h-6 w-6 mr-2" alt="VoidCast Logo" />
          <span className="self-center text-2xl font-bold whitespace-nowrap text-accent hidden md:block">VoidCast</span>
        </Link>
        <div className="flex items-center justify-center col-span-8 sm:col-span-6">
          <Input icon={<FaSearch />} placeholder="Search for clips, episodes, users or communities" />
        </div>
        <div className="flex items-center justify-end col-span-2 sm:col-span-3 gap-4">
          <div className="space-x-1 hidden md:flex">
            <div className="rounded-full p-2 bg-primary-600 text-white">
              <FaMagic />
            </div>
            <div className="rounded-full p-2 bg-primary-600 text-white">
              <FaCompass />
            </div>
            <div className="rounded-full p-2 bg-primary-600 text-white">
              <FaScissors />
            </div>
          </div>
          <div className="flex">
            <Menu as="div" className="relative">
              <div>
                <MenuButton className="relative flex rounded-full text-sm focus:none">
                  <img
                    src={user?.user_metadata.avatar_url}
                    className="h-6 w-6 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-3 w-56 origin-top-right rounded-lg bg-primary-700 shadow-lg transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                {
                  menuItems.map((item, key) => {
                    return (
                      <MenuItem key={key}>
                        <a href="#" className={`hover:bg-primary-600 flex items-center gap-2 px-4 py-2 transition text-base font-medium text-white ${(key == 0) && "rounded-t-lg"}`}>
                          <item.icon /> {item.label}
                        </a>
                      </MenuItem>
                    )
                  })
                }
                <hr />
                <MenuItem>
                  <a href="#" className={`bg-primary-600 rounded-b-lg flex items-center gap-2 px-4 py-2 transition text-base font-medium text-white`}>
                    <FaSignOutAlt /> Log out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
}
