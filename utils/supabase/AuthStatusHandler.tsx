"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onLogout, authChannel } from '@/utils/supabase/broadcast'; // Adjust the import according to your project structure
import { createClient } from '@/utils/supabase/client'; // Adjust the import according to your project structure

export default function AuthStatusHandler() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handleLogout = async () => {
      await supabase.auth.signOut();
      router.push('/login'); // Adjust the route according to your project structure
    };

    onLogout(handleLogout);

    return () => {
      authChannel.close();
    };
  }, [router, supabase]);

  return null; // This component does not render any UI
}
