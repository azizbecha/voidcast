import Image from "next/image";

import { createClient } from "@/utils/supabase/server";

import WithAuth from "@/components/Auth/WithAuth";
import Navbar from "@/components/ui/Navbar";

import { AuthProviderBadge } from "@/components/ui/AuthProviderBadge";
import { GridProvider } from "@/components/ui/Grid/GridProvider";
import { LeftColumn } from "@/components/ui/Grid/LeftColumn";
import { MiddleColumn } from "@/components/ui/Grid/MiddleColumn";
import { RightColumn } from "@/components/ui/Grid/RightColumn";

export default async function Profile() {
    const supabase = createClient();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
        console.error('Error fetching user:', error);
        return <div>Error loading profile</div>;
    }

    return (
        <WithAuth>
            <div className="h-screen bg-primary-900 w-full">
                <Navbar user={user} />
                <div className="w-full mx-auto px-2 sm:px-5.5 py-4">
                    <GridProvider>
                        <LeftColumn>
                            <h3 className="text-white mb-4">Left Col</h3>
                            {/* Additional user-related information can be added here */}
                        </LeftColumn>
                        <MiddleColumn>
                            <div className="flex items-center mb-4">
                                <Image
                                    src={user?.user_metadata.avatar_url}
                                    className="rounded-full"
                                    alt={`Image of ${user?.user_metadata.full_name}`}
                                    width={60}
                                    height={60}
                                />
                                <div className="ml-4">
                                    <h4 className="text-white text-lg">{user?.user_metadata.full_name}</h4>
                                    <span className="text-primary-300">@{user?.user_metadata.user_name}</span>
                                </div>
                            </div>
                            <div className="text-white mb-4">
                                <p><strong>Email:</strong> {user?.email}</p>
                                <p><strong>Join date:</strong> {new Date(`${user?.created_at}`).toLocaleString()}</p>
                                <p><strong>Last sign-in:</strong> {new Date(`${user?.last_sign_in_at}`).toLocaleString()}</p>
                                <div className="flex items-center space-x-2">
                                    <p><strong>Login providers:</strong></p>
                                    <div className="flex space-x-2">
                                        {
                                            user?.identities?.map((provider, key) => (
                                                <AuthProviderBadge provider={`${provider.provider}`} key={key} />
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </MiddleColumn>
                        <RightColumn>
                            <div className="text-white">
                                <h3 className="mb-4">Right Col</h3>
                            </div>
                        </RightColumn>
                    </GridProvider>
                </div>
            </div>
        </WithAuth>
    );
}
