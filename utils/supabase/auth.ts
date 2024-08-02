// utils/auth.ts
import { createClient } from "./client";
import { broadcastLogout } from "./broadcast";

export const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    broadcastLogout();
};
