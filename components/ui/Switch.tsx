"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    ref={ref}
    className={cn(
      // Container (track)
      "peer inline-flex w-5.5 h-4 relative rounded-full border transition duration-200 ease-in-out-hard shrink-0 cursor-pointer items-center",
      // Border color depending on state
      "data-[state=checked]:border-primary-100 data-[state=unchecked]:border-primary-300",
      // Accessibility & disabled state
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        // Thumb element
        "pointer-events-none block h-2 w-2 rounded-full absolute top-1/2 left-1/2 transform -translate-y-1/2 transition duration-200 ease-in-out-hard",
        // Translate & background based on state
        "data-[state=checked]:translate-x-0 data-[state=checked]:bg-primary-100",
        "data-[state=unchecked]:-translate-x-full data-[state=unchecked]:bg-primary-300"
      )}
    />
  </SwitchPrimitives.Root>
));

Switch.displayName = SwitchPrimitives.Root.displayName;
export { Switch };
