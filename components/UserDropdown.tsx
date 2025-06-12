// components/UserDropdown.tsx
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar } from "./UserAvatar/Avatar";

import {
  FaUser,
  FaCog,
  FaBug,
  FaGithub,
  FaDiscord,
} from "react-icons/fa";
import { DISCORD_URL, GITHUB_URL, ISSUES_URL } from "@/constants";

type Props = {
  image: string | null;
  align?: "start" | "end";
};

const internalLinks = [
  { label: "Profile", href: "/profile", icon: <FaUser size={10} /> },
  { label: "Settings", href: "/settings", icon: <FaCog size={10} /> },
];

const externalLinks = [
  {
    label: "Report a bug",
    href: ISSUES_URL,
    icon: <FaBug size={10} />,
  },
  {
    label: "GitHub",
    href: GITHUB_URL,
    icon: <FaGithub size={10} />,
  },
  {
    label: "Discord",
    href: DISCORD_URL,
    icon: <FaDiscord size={10} />,
  },
];

export const UserDropdown = ({ image, align = "end" }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar src={image || ""} size="sm" />
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={16} align={align} alignOffset={-4}>
        {internalLinks.map(({ label, href, icon }) => (
          <DropdownMenuItem key={label} asChild>
            <Link href={href} className="flex items-center gap-2 w-full">
              {icon}
              <span>{label}</span>
            </Link>
          </DropdownMenuItem>
        ))}
        {externalLinks.map(({ label, href, icon }) => (
          <DropdownMenuItem key={label} asChild>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-full"
            >
              {icon}
              <span>{label}</span>
            </a>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem className="bg-primary-700 hover:bg-accent font-bold">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
