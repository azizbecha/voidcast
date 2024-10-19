import React, { forwardRef, ReactElement, ChangeEvent } from "react";

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
  textarea?: boolean;
  rows?: number;
  error?: string;
  transparent?: boolean;
  icon?: ReactElement;
  placeholder?: string;
  required?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, textarea, error, transparent, icon = false, placeholder, label, onChange, required, ...props }, ref) => {
    const bg = transparent ? `bg-transparent` : `bg-primary-700`;
    const ring = error ? `ring-1 ring-secondary` : "";
    const cn = `w-full py-2 px-4 text-primary-100 placeholder-primary-300 focus:outline-none ${bg} ${ring} ${className}`;

    return textarea ? (
      <div>
        {label && (
          <p className='text-base font-bold text-primary-100 mb-1'>{label} {required && <span className="text-accent font-bold">*</span>}</p>
        )}
        <textarea
          ref={ref as any}
          placeholder={placeholder}
          className={`${cn} rounded-8`}
          data-testid="textarea"
          onChange={onChange}
          required={required}
          {...(props as any)}
        />
        <span className="text-xs font-semibold text-secondary">{error}</span>
      </div>
    ) : (
      <div className="rounded-8 w-full">
        {label && (
          <p className='text-base font-bold text-primary-100 mb-1'>{label} {required && <span className="text-accent font-bold">*</span>}</p>
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
            className={`${cn} ${icon ? 'rounded-r-8' : 'rounded-8'}`}
            data-testid="input"
            onChange={onChange}
            required={required}
            {...props}
          />
        </div>
        <span className="text-xs font-semibold text-secondary">{error}</span>
      </div>
    );
  }
);

Input.displayName = "Input";
