import React from 'react';
import clsx from 'clsx';

interface Props {
    children: React.ReactNode,
    className?: string,
    [key: string]: any
}

const Container = (props: Props) => {
    const { children, className, ...otherProps } = props;

    const containerClasses = `flex flex-col min-h-screen w-full text-white px-4 sm:px-8 md:px-10 lg:px-32`;

    return (
        <div {...otherProps} className={clsx(containerClasses, className)}>
            {children}
        </div>
    )
}

export default Container;