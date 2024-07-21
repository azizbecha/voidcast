import { type NextRequest, type NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

// Helper function to manage cookies using next/headers
const getCookie = (name: string) => {
  const cookieStore = cookies();
  return cookieStore.get(name)?.value || null;
};

const setCookie = (name: string, value: string, options: CookieOptions = {}) => {
  const cookieStore = cookies();
  cookieStore.set(name, value, options);
};

const deleteCookie = (name: string, options: CookieOptions = {}) => {
  const cookieStore = cookies();
  cookieStore.set(name, "", { ...options, maxAge: -1 });
};

// server component can only get cookies and not set them, hence the "component" check
export function createSupabaseServerClient(component: boolean = false) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return getCookie(name);
        },
        set(name: string, value: string, options: CookieOptions) {
          if (component) return;
          setCookie(name, value, options);
        },
        remove(name: string, options: CookieOptions) {
          if (component) return;
          deleteCookie(name, options);
        },
      },
    }
  );
}

export function createSupabaseServerComponentClient() {
  return createSupabaseServerClient(true);
}

export function createSupabaseReqResClient(req: NextRequest, res: NextResponse) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value || null;
        },
        set(name: string, value: string, options: CookieOptions) {
          res.cookies.set(name, value, options);
        },
        remove(name: string, options: CookieOptions) {
          res.cookies.set(name, "", { ...options, maxAge: -1 });
        },
      },
    }
  );
}
