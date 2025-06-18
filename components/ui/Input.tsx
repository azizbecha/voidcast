import React, { forwardRef, ReactElement, ChangeEvent } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
  textarea?: boolean;
  rows?: number;
  error?: string;
  transparent?: boolean;
  icon?: ReactElement;
  placeholder?: string;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      textarea,
      error,
      transparent,
      icon = false,
      placeholder,
      label,
      onChange,
      ...props
    },
    ref
  ) => {
    const bg = transparent ? `bg-transparent` : `bg-primary-700`;
    const ring = error ? `ring-1 ring-secondary` : "";

    const c = cn([
      "w-full py-2 px-4 text-primary-100 placeholder-sm placeholder-primary-300 focus:outline-none",
      bg,
      ring,
      className,
    ]);

    return textarea ? (
      <div>
        {label && (
          <span className="text-base font-medium text-white">{label}</span>
        )}
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          placeholder={placeholder}
          className={`${c} rounded-8`}
          data-testid="textarea"
          onChange={onChange}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
        {error && (
          <span className="text-xs font-medium text-secondary">{error}</span>
        )}
      </div>
    ) : (
      <div className="rounded-8 w-full">
        {label && (
          <span className="text-base font-medium text-white">{label}</span>
        )}
        <div className="flex items-stretch">
          {icon && (
            <div className="flex items-center justify-center text-primary-300 pl-4 py-2 bg-primary-700 rounded-l-8">
              {icon}
            </div>
          )}
          <input
            placeholder={placeholder}
            ref={ref}
            className={`${c} ${icon ? "rounded-r-8" : "rounded-8"}`}
            onChange={onChange}
            {...props}
          />
        </div>
        {error && (
          <span className="text-xs font-medium text-secondary">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
