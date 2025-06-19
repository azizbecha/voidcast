"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Home, Edit } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/create", label: "Create", icon: Edit },
];

export const FixedButtons: React.FC = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col items-center gap-4">
      {links.map((link, index) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link key={index} href={link.href}>
            <button className={cn("p-2 rounded-full", `bg-${isActive ? 'accent' : 'primary-700'}`)}>
              <Icon className="text-primary-100" />
            </button>
          </Link>
        );
      })}
    </div>
  );
};
