"use client";

import Link from "next/link";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "./UserAvatar/Avatar";
import {
  FaUser,
  FaCog,
  FaBug,
  FaGithub,
  FaDiscord,
  FaGlobe,
} from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n/config";
import { DISCORD_URL, GITHUB_URL, ISSUES_URL } from "@/constants";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type Props = {
  image: string | null;
  align?: "start" | "end";
};

export const UserDropdown = ({ image, align = "end" }: Props) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [langDialogOpen, setLangDialogOpen] = useState(false);

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    // setLangDialogOpen(false);
  };

  const logout = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
    router.replace("/login");
  };

  const internalLinks = [
    { label: t("Profile"), href: "/profile", icon: <FaUser size={10} /> },
    { label: t("Settings"), href: "/settings", icon: <FaCog size={10} /> },
  ];

  const externalLinks = [
    { label: t("reportBug"), href: ISSUES_URL, icon: <FaBug size={10} /> },
    { label: "GitHub", href: GITHUB_URL, icon: <FaGithub size={10} /> },
    { label: "Discord", href: DISCORD_URL, icon: <FaDiscord size={10} /> },
  ];

  return (
    <>
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

          <DropdownMenuItem
            onClick={() => setLangDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <FaGlobe size={10} />
            <span>{t("Language")}</span>
          </DropdownMenuItem>

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

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="bg-primary-700 hover:bg-accent font-bold"
            onClick={logout}
          >
            {t("Log out")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={langDialogOpen} onOpenChange={setLangDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("Select a language")}</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="flex flex-col gap-2 py-2">
            <Button onClick={() => changeLanguage("fr")}>FR</Button>
            <Button onClick={() => changeLanguage("en")}>EN</Button>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button
                size="small"
                color="secondary-800"
                onClick={() => changeLanguage("fr")}
              >
                {t("Cancel")}
              </Button>
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
