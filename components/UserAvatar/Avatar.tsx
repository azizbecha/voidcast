"use client";

import React, { useState } from "react";
import Image from "next/image";

export const avatarSizeMap = {
  default: 80,
  lg: 60,
  md: 50,
  sm: 40,
  xs: 20,
  xxs: 30,
};

export interface AvatarProps {
  src?: string;
  size?: keyof typeof avatarSizeMap;
  className?: string;
  username?: string;
  hover?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  size = "default",
  className = "",
  username,
  hover = false,
}) => {
  const [isError, setError] = useState(false);

  const fallbackSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    username || "?"
  )}&rounded=true&background=B23439&bold=true&color=FFFFFF`;

  const finalSrc = !src || isError ? fallbackSrc : src;

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{
        width: avatarSizeMap[size],
        height: avatarSizeMap[size],
      }}
    >
      <Image
        alt={username ? `${username}-avatar` : "user-avatar"}
        src={finalSrc}
        width={avatarSizeMap[size]}
        height={avatarSizeMap[size]}
        className="object-cover rounded-full"
        onError={() => setError(true)}
      />
      {hover && (
        <div className="bg-primary-900 hover:opacity-20 transition duration-200 opacity-0 absolute w-full h-full top-0 left-0 rounded-full" />
      )}
    </div>
  );
};
