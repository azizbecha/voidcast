"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

const avatarSizeMap: Record<string, string> = {
  default: "80px",
  lg: "60px",
  md: "50px",
  sm: "40px",
  xs: "30px",
  xxs: "20px",
};

interface CustomAvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  src?: string;
  size?: keyof typeof avatarSizeMap;
  alt?: string;
  fallback?: React.ReactNode;
}

export const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  CustomAvatarProps
>(
  (
    { className, src, size = "default", alt = "Avatar", fallback, ...props },
    ref
  ) => {
    const sizeStyle = avatarSizeMap[size] ?? avatarSizeMap.default;

    return (
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex shrink-0 overflow-hidden rounded-full",
          className
        )}
        style={{ width: sizeStyle, height: sizeStyle }}
        {...props}
      >
        {src && (
          <AvatarPrimitive.Image
            src={src}
            alt={alt}
            className="aspect-square h-full w-full object-cover"
          />
        )}
        <AvatarPrimitive.Fallback className="flex h-full w-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground">
          {fallback || "?"}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    );
  }
);

Avatar.displayName = "Avatar";
