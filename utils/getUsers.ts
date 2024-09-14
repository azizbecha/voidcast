import { UserProfile } from "@/interfaces";
import { createClient } from "./supabase/server";

export const getUsers = async (): Promise<UserProfile[]> => {
    const supabase = createClient();
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*');

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return []; // Return an empty array on error
    }
};