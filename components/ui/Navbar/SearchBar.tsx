import React, { useState, useEffect, useRef } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { createClient } from "@/utils/supabase/client";

import { Input } from "../Input";
import { Button } from "../Button";
import { Spinner } from "../Spinner";
import { UserCard } from "@/components/UserCard";

import { FaSearch } from "react-icons/fa";

import { UserProfile } from "@/interfaces";

export default function SearchBar() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [profiles, setProfiles] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchQuery) fetchResults();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchResults = async () => {
        const supabase = createClient();
        setLoading(true);
        const { data: profilesData, error } = await supabase
            .from("profiles")
            .select("*")
            .or(`full_name.ilike.%${searchQuery.trim()}%`)
            .limit(5);

        if (error) console.error("Error fetching data:", error);
        else setProfiles(profilesData || []);
        setLoading(false);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) router.push(`/search/${encodeURIComponent(searchQuery)}`);
    };

    return (
        <form className="relative" onSubmit={handleSearch}>
            <Input
                icon={<FaSearch />}
                placeholder="Search for clips, episodes, users or communities"
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(e.target.value.length > 0);
                }}
            />
            {showSuggestions && (
                <div ref={dropdownRef} className="absolute z-50 top-12 bg-primary-700 rounded-lg shadow-lg p-2 w-full">
                    {loading ? (
                        <div className="p-5 flex justify-center items-center"><Spinner /></div>
                    ) : (
                        <div className="flex flex-col space-y-2">
                            {profiles.map((profile, index) => <UserCard key={index} user={profile} minimized />)}

                            <Link href={`/search/${encodeURIComponent(searchQuery)}`}>
                                <Button icon={<FaSearch />} color="accent-secondary" size="small" className="w-full">Show more results</Button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </form>
    );
}
