/* eslint-disable @next/next/no-img-element */
import * as React from "react"
import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
    HTMLSpanElement,
    React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
    return (
        <span
            {...props}
            ref={ref}
            className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
            data-slot="avatar"
        />
    )
})
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef<
    HTMLImageElement,
    React.ImgHTMLAttributes<HTMLImageElement> & { alt?: string; src: string }
>(({ 
    className, 
    alt = "", 
    src, 
    width,
    height,
    ...props 
}, ref) => {
    return (
        <img
            {...props}
            src={src}
            ref={ref}
            alt={alt}
            className={cn("aspect-square h-full w-full object-cover", className)}
            data-slot="avatar-image"
            width={width}
            height={height}
        />
    )
})
AvatarImage.displayName = "AvatarImage"

export { Avatar, AvatarImage }