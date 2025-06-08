"use client";

import { Avatar, AvatarImage } from "@/components/ui/Avatar";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Avatar>
          <AvatarImage src="https://thumbs.dreamstime.com/b/fake-profile-social-networks-engineering-laptop-hacker-mask-vector-illustration-303125390.jpg" alt="User's profile picture" width={"60px"} height={"60px"} />
      </Avatar>
    </div>
  );
}
