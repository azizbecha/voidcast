import Image from "next/image";

import { getServerT } from "@/i18n/i18n-server";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import GitHubAuthButton from "@/components/auth/GitHubAuthButton";
import DiscordAuthButton from "@/components/auth/DiscordAuthButton";

import { FaDiscord, FaGithub } from "react-icons/fa6";
import LogoIcon from "@/components/LogoIcon";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();

  return {
    title: `${t("login")} - VoidCast`,
  };
}

const Login = async () => {
  const t = await getServerT();
  return (
    <>
      <div
        className="grid w-full h-full"
        style={{
          gridTemplateRows: "1fr auto 1fr",
        }}
      >
        <div className="flex" />
        <div className="flex m-auto flex-col p-5 gap-5 bg-primary-800 rounded-8 z-10 sm:w-400 w-11/12">
          <div className="flex gap-1 flex-col">
            <div className="flex justify-self-center self-center mb-2">
              <Image
                width={65}
                height={65}
                alt="VoidCast logo"
                src="/logo.png"
              />
            </div>
            <span className="text-3xl text-primary-100 font-bold text-center">
              {t("welcomeTo")} VoidCast
            </span>
            <div className="text-primary-100 flex-wrap text-center">
              {t("loginDescription")}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <GoogleAuthButton />
            <DiscordAuthButton />
            <GitHubAuthButton />
          </div>
        </div>
        <div className="flex flex-row absolute bottom-0 w-full justify-between px-5 py-2 mt-auto items-center sm:px-7">
          <div className="hidden sm:flex">
            <LogoIcon />
          </div>
          <div className="flex flex-row gap-4 text-primary-300">
            <a
              href="https://github.com/azizbecha/voidcast/issues"
              className="ml-2 hover:text-primary-200"
              target="_blank"
            >
              {t("reportBug")}
            </a>
            <div className="flex flex-row gap-6 sm:gap-4">
              <a
                href="https://github.com/azizbecha/voidcast"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub className="w-4 h-4 ml-2 cursor-pointer hover:text-primary-200" />
              </a>
              <a
                href="https://discord.gg/ur6DMXumrA"
                target="_blank"
                rel="noreferrer"
              >
                <FaDiscord className="w-4 h-4 ml-2 hover:text-primary-200" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
