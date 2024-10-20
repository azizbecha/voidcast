"use client"

import { useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/client";
import { Loader } from "@/components/ui/Loader";

import { UserCard } from "@/components/UserCard";

import { UserProfile } from "@/interfaces";

interface Props {
    query: string;
}

export const PeopleTab: React.FC<Props> = ({ query }) => {

    const [profiles, setProfiles] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            const supabase = createClient();
            setLoading(true);

            // Query Supabase for profiles
            const { data: profilesData, error: profilesError } = await supabase
                .from("profiles")
                .select("*")
                .order('verified', { ascending: false }) // show verified users first
                .or(`full_name.ilike.%${query}%,username.ilike.%${query}%,bio.ilike.%${query}%`);

            if (profilesError) {
                console.error("Error fetching data:", profilesError);
            } else {
                setProfiles(profilesData || []);
            }

            setLoading(false);
        };

        if (query) {
            fetchResults();
        }
    }, [query]);

    if (loading) return <div className="flex justify-center items-center p-4"><Loader /></div>;
    if (profiles.length === 0) return <div className="flex justify-center items-center h-full p-4">No results found</div>;

    return (
        <div className="flex flex-col space-y-2">
            {
                profiles.map((profile, key) => <UserCard key={key} user={profile} />)
            }
        </div>
    )
}