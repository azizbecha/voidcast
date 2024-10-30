"use client";

import { useState } from "react";

import validator from "validator";
import toast from "react-hot-toast";

import { createClient } from "@/utils/supabase/client";

import { BaseDropdownSm, BaseDropdownSmItem } from "@/components/ui/BaseDropdownSm";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { FaAt, FaDiscord, FaLink } from "react-icons/fa6";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { FaGithub, FaGoogle } from "react-icons/fa";

import { UserProfile } from "@/interfaces";
import { capitalizeWords } from "@/utils/capitalizeWords";
import { withHttp } from "@/utils/withUrl";

interface Props {
    profile: UserProfile;
}

interface SocialProviders {
    provider: "google" | "github" | "discord";
}

const socialIcons: Record<SocialProviders["provider"], JSX.Element> = {
    google: <FaGoogle size={12} />,
    github: <FaGithub size={12} />,
    discord: <FaDiscord size={12} />,
};

export const ProfileTab: React.FC<Props> = ({ profile }) => {
    const supabase = createClient();

    const initialValues = {
        displayName: profile.full_name || "",
        username: profile.username || "",
        bio: profile.bio || "",
        website: profile.url || ""
    };

    const [displayName, setDisplayName] = useState(initialValues.displayName);
    const [username, setUsername] = useState(initialValues.username);
    const [bio, setBio] = useState(initialValues.bio);
    const [website, setWebsite] = useState(initialValues.website);
    const [originalUsername] = useState(profile.username);

    const [errors, setErrors] = useState({
        displayName: "",
        username: "",
        bio: "",
        website: "",
    });

    const handleReset = () => {
        setDisplayName(initialValues.displayName);
        setUsername(initialValues.username);
        setBio(initialValues.bio);
        setWebsite(initialValues.website);
        setErrors({
            displayName: "",
            username: "",
            bio: "",
            website: "",
        });
    };

    const checkUsernameExists = async (newUsername: string) => {
        const { data, error } = await supabase
            .from("profiles")
            .select("id")
            .eq("username", newUsername)
            .single();

        return !error && !!data;
    };

    const handleSaveChanges = async () => {
        let error = false;
        setErrors({ displayName: "", username: "", bio: "", website: "" });

        const newErrors = {
            displayName: "",
            username: "",
            bio: "",
            website: "",
        };

        if (validator.isEmpty(displayName.trim())) {
            newErrors.displayName = "Display Name cannot be empty.";
            error = true;
        } else if (displayName.trim().length > 60) {
            newErrors.displayName = "Display Name's max length is 60 characters";
            error = true;
        }

        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (validator.isEmpty(username.trim())) {
            newErrors.username = "Username cannot be empty.";
            error = true;
        } else if (!usernameRegex.test(username)) {
            newErrors.username = "Username can only contain letters, numbers, and underscores.";
            error = true;
        } else if (username !== originalUsername) {
            const usernameExists = await checkUsernameExists(username);
            if (usernameExists) {
                newErrors.username = "Username is already taken.";
                error = true;
            }
        }

        if (!validator.isLength(bio, { max: 150 })) {
            newErrors.bio = "Bio cannot exceed 150 characters.";
            error = true;
        }

        if (website && !validator.isURL(website)) {
            newErrors.website = "Please provide a valid website URL.";
            error = true;
        }

        if (!error) {
            const { data, error } = await supabase
                .from("profiles")
                .update({
                    full_name: capitalizeWords(displayName),
                    username: username,
                    bio: bio,
                    url: website ? withHttp(website) : null,
                })
                .eq("id", profile.id)
                .select();

            if (error) {
                toast.error("Error updating profile.");
                return;
            }

            toast.success("Profile updated successfully.");
        } else {
            setErrors(newErrors);
            toast.error("Please fix errors before saving.");
        }
    };

    return (
        <div className="bg-primary-800 rounded-lg p-3 overflow-y-scroll h-full">
            <h4 className="mb-2">Public Profile</h4>
            <div className="space-y-2">
                <div className="flex items-center gap-2 flex-row bg-primary-700 rounded-md p-3 w-full sm:w-fit">
                    <Image
                        src={profile?.avatar}
                        alt="Profile"
                        className="z-10 rounded-full object-cover bg-primary-800"
                        width={70}
                        height={70}
                    />
                    <div>
                        <div className="flex flex-row space-x-1.5 items-center justify-start">
                            <span className="font-bold text-base">{profile?.full_name}</span>
                            <div className="flex items-center gap-2">
                                {profile?.verified && (
                                    <MdVerified className="text-blue-500" size={15} />
                                )}
                                <div className="flex items-center gap-1.5">
                                    {profile.app_metadata.providers.map((provider: string, key: number) =>
                                        <div key={key} className="flex justify-center items-center p-1 rounded-md bg-secondary">
                                            {socialIcons[provider as SocialProviders["provider"]]}
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                        <p className="text-primary-300 text-sm font-medium">@{profile?.username}</p>
                        {
                            profile.url && <a href={profile?.url} target="_blank" className="text-accent text-xs font-bold">{profile?.url}</a>
                        }
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Display Name"
                        placeholder="Enter your display name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        error={errors.displayName || undefined}
                    />
                    <Input
                        label="Username"
                        icon={<FaAt />}
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        error={errors.username || undefined}
                    />
                </div>

                <Input
                    label="Bio"
                    textarea
                    rows={4}
                    maxLength={150}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    error={errors.bio || undefined}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        error={errors.website || undefined}
                        icon={<FaLink />}
                    />
                </div>

                <div className="flex space-x-2 items-center flex-row mt-4">
                    <Button onClick={handleSaveChanges}>Save changes</Button>
                    <Button color="secondary-800" onClick={handleReset}>Reset</Button>
                </div>
            </div>
        </div>
    );
};
