"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "dark" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      swipeDirections={["right", "left"]}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-primary-800 group-[.toaster]:text-primary-100 group-[.toaster]:border-border group-[.toaster]:shadow-lg flex items-center justify-between",
          title: "text-primary-100 text-xl font-bold",
          description: "group-[.toast]:text-primary-300 text-md",
          actionButton:
            "group-[.toast]:bg-accent group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
