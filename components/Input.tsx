/* eslint-disable no-unused-expressions */
import React, { forwardRef, ReactElement } from "react";
import { Button } from "./Button";
import { FaSearch } from "react-icons/fa";
import { IconType } from "react-icons";

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  textarea?: boolean;
  rows?: number;
  error?: string;
  transparent?: boolean;
  icon?: ReactElement;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, textarea, error, transparent, icon = false, ...props }, ref) => {
    const bg = transparent ? `bg-transparent` : `bg-primary-700`;
    const ring = error ? `ring-1 ring-secondary` : "";
    const cn = `w-full py-2 px-4 text-primary-100 placeholder-primary-300 focus:outline-none ${bg} ${ring} ${className}`;

    return textarea ? (
      <textarea
        ref={ref as any}
        className={`${cn} rounded-r-8`}
        data-testid="textarea"
        {...(props as any)}
      />
    ) : (
      <div className="flex items-stretch rounded-8 w-full">
        {icon && (
          <div className="flex items-center justify-center text-primary-300 pl-4 py-2 bg-primary-700 rounded-l-8">
            {icon}
          </div>
        )}
        <input ref={ref} className={`${cn} ${icon ? 'rounded-r-8' : 'rounded-8'}`} data-testid="input" {...props} />
      </div>
    );
  }
);

Input.displayName = "Input";
