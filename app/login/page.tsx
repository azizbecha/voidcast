import { NextPage } from "next";

import GoogleAuthButton from "@/components/Auth/GoogleAuthButton";
import GitHubAuthButton from "@/components/Auth/GithubAuthButton";
import DiscordAuthButton from "@/components/Auth/DiscordAuthButton";
import WithNoAuth from "@/components/Auth/WithNoAuth";

const Login: NextPage = () => {
    return (
        <WithNoAuth>
            <div
                className="grid w-full h-full"
                style={{
                    gridTemplateRows: "1fr auto 1fr",
                }}
            >
                <div className="flex" />
                <div className="flex m-auto flex-col p-6 gap-5 bg-primary-800 rounded-8 z-10 sm:w-400 w-11/12">
                    <div className="flex gap-1 flex-col">
                        <div className="flex justify-self-center self-center">
                            <img src="logo.png" className="w-8 h-8" />
                        </div>
                        <span className="text-3xl text-primary-100 font-bold text-center">Welcome to VoidCast</span>
                        <div className="text-primary-100 flex-wrap text-center">
                            Unlock the world of VoidCast by choosing your preferred sign-in method
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <GoogleAuthButton />
                        <DiscordAuthButton />
                        <GitHubAuthButton />
                    </div>
                </div>
            </div>
        </WithNoAuth>
    )
}

export default Login;