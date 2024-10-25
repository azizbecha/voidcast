"use client"

import { useState } from "react";

import validator from "validator";
import toast from "react-hot-toast";

import { createClient } from "@/utils/supabase/client";

import { BaseDropdownSm, BaseDropdownSmItem } from "@/components/ui/BaseDropdownSm";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { FaAt, FaLink } from "react-icons/fa6";

import { UserProfile } from "@/interfaces";

interface Props {
    profile: UserProfile;
}

export const ProfileTab: React.FC<Props> = ({ profile }) => {

    const supabase = createClient();

    // Store initial values
    const initialValues = {
        displayName: profile.full_name || "",
        username: profile.username || "",
        bio: profile.bio || "",
        website: profile.url || ""
    };

    // State to track form inputs
    const [displayName, setDisplayName] = useState(initialValues.displayName);
    const [username, setUsername] = useState(initialValues.username);
    const [bio, setBio] = useState(initialValues.bio);
    const [website, setWebsite] = useState(initialValues.website);
    const [originalUsername] = useState(profile.username); // Store original username for comparison

    // State for validation errors
    const [errors, setErrors] = useState({
        displayName: "",
        username: "",
        bio: "",
        website: "",
    });

    // Reset function to revert the form to its initial state
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

    // Function to check if the username exists in the database
    const checkUsernameExists = async (newUsername: string) => {
        const { data, error } = await supabase
            .from("profiles")
            .select("id")
            .eq("username", newUsername)
            .single();

        if (error) {
            // If there's an error, assume the username does not exist
            return false;
        }
        return !!data;
    };

    // Validation function for the profile form
    const handleSaveChanges = async () => {
        let error = false;

        setErrors({
            displayName: "",
            username: "",
            bio: "",
            website: "",
        });

        const newErrors = {
            displayName: "",
            username: "",
            bio: "",
            website: "",
        };

        // Validate Display Name (not empty)
        if (validator.isEmpty(displayName.trim())) {
            newErrors.displayName = "Display Name cannot be empty.";
            error = true;
        }

        if (displayName.trim().length > 60) {
            newErrors.displayName = "Display Name's max length is 60 characters";
            error = true;
        }
        // Validate Username (not empty, valid format)
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (validator.isEmpty(username.trim())) {
            newErrors.username = "Username cannot be empty.";
            error = true;
        } else if (!usernameRegex.test(username)) {
            newErrors.username = "Username can only contain letters, numbers, and underscores.";
            error = true;
        } else if (username !== originalUsername) {
            // Check if the username exists in the database if it has changed
            const usernameExists = await checkUsernameExists(username);
            if (usernameExists) {
                newErrors.username = "Username is already taken.";
                error = true;
            }
        }

        // Validate Bio (maximum 150 characters)
        if (!validator.isLength(bio, { max: 150 })) {
            newErrors.bio = "Bio cannot exceed 150 characters.";
            error = true;
        }

        // Validate Website (if provided, it must be a valid URL)
        if (website && !validator.isURL(website)) {
            newErrors.website = "Please provide a valid website URL.";
            error = true;
        }

        // If there are no errors, proceed with saving
        if (!newErrors.displayName && !newErrors.username && !newErrors.bio && !newErrors.website) {
            console.log("Form is valid, proceed with saving changes.");

            const { data, error } = await supabase
                .from("profiles")
                .update({
                    full_name: displayName,
                    username: username,
                    bio: bio,
                    url: website,
                })
                .eq("id", profile.id)
                .select();

            if (error) {
                throw new Error("Error updating profile: " + error.message);
            }

            console.log(data);

            toast.success("Profile updated successfully.");
        } else {
            setErrors(newErrors); // Set error messages
            error = true;
            toast.error("Please fix errors before saving.");
        }
    };

    return (
        <div className="bg-primary-800 rounded-lg p-3">
            <h4 className="mb-2">Public Profile</h4>
            <div className="space-y-2">
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
                    <div>
                        <p className="text-sm text-primary-300 mb-2">Pronouns</p>
                        <BaseDropdownSm>
                            <BaseDropdownSmItem>He/him</BaseDropdownSmItem>
                            <BaseDropdownSmItem>She/her</BaseDropdownSmItem>
                            <BaseDropdownSmItem>They/them</BaseDropdownSmItem>
                        </BaseDropdownSm>
                    </div>
                </div>

                <div>
                    <div className="flex space-x-2 items-center flex-row mt-4">
                        <Button onClick={handleSaveChanges}>Save changes</Button>
                        <Button color="secondary-800" onClick={handleReset}>Reset</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}