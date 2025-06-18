"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      swipeDirections={["right", "left"]}
      closeButton
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-primary-800 group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg active:cursor-grabbing",
          title: "text-primary-100 text-lg font-bold",
          description: "group-[.toast]:text-primary-300 text-md",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-primary-100",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
