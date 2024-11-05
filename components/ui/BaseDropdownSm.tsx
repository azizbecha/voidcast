import React from "react";
import { VscTriangleDown } from "react-icons/vsc";

type BaseDropdownSmItemProps = React.OptionHTMLAttributes<HTMLOptionElement> & {
    children: React.ReactNode;
};

export const BaseDropdownSmItem: React.FC<BaseDropdownSmItemProps> = ({
    children,
    className = "",
    ...props
}) => (
    <option
        className={`text-primary-100 bg-primary-900 hover:bg-primary-800 focus:bg-primary-700 disabled:text-primary-500 ${className}`}
        {...props}
    >
        {children}
    </option>
);

type BaseDropdownSmProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    children: React.ReactNode;
};

export const BaseDropdownSm: React.FC<BaseDropdownSmProps> = ({
    children,
    className = "",
    ...props
}) => (
    <div className="relative w-full">
        <select
            className={`w-full py-2 px-4 font-medium text-primary-100 placeholder-primary-300 focus:outline-none bg-primary-700 text-sm rounded-8 appearance-none pr-10 ${className}`}
            {...props}
        >
            {children}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <VscTriangleDown size={15} className="text-primary-100" />
        </div>
    </div>
);
