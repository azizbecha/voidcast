"use client";

import { Avatar } from "@/components/ui/Avatar";

export default function Home() {
  return (
    <div className="min-h-screen w-1/4 flex items-center justify-center">
      <Avatar url="https://avatars.githubusercontent.com/u/63454940?s=64&v=4" size="md" fallback="JD" />
    </div>
  );
}
