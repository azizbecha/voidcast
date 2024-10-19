"use client";

import React, { useState, useRef, useEffect, ReactNode, ReactElement } from "react";
import { motion } from "framer-motion";

interface Tab {
    label: string;
    children: ReactNode;
    className?: string;
}

interface TabsProviderProps {
    children: ReactElement<Tab>[];
}

interface TabProps {
    label: string;
    children: ReactNode;
    className?: string;
}

const tabStyles = {
    base: "py-2 text-base font-bold border-b-2 border-gray-700 flex-1 text-center relative hover:bg-primary-800 rounded-t-md",
    active: "text-accent",
    container: "w-full mx-auto mt-2",
    header: "relative flex transition-all duration-100",
    content: "bg-primary-800 rounded-lg mt-4",
    underline: "absolute bottom-0 h-0.5 bg-accent"
};

export const TabsProvider: React.FC<TabsProviderProps> = ({ children }) => {
    const [activeTab, setActiveTab] = useState<string>(children[0].props.label); // Set default tab
    const [underlinePosition, setUnderlinePosition] = useState<{ left: number; width: number }>({ left: 0, width: 0 });
    const tabsRef = useRef<HTMLDivElement>(null);

    // Effect to set the underline position and width based on the active tab
    useEffect(() => {
        const updateUnderlinePosition = () => {
            if (tabsRef.current) {
                const activeButton = tabsRef.current.querySelector(`button[data-label="${activeTab}"]`) as HTMLButtonElement;
                if (activeButton) {
                    const { offsetLeft, offsetWidth } = activeButton;
                    setUnderlinePosition({ left: offsetLeft, width: offsetWidth });
                }
            }
        };
        
        updateUnderlinePosition();
    }, [activeTab]);

    return (
        <div className={tabStyles.container}>
            {/* Tab Header */}
            <div className={tabStyles.header} ref={tabsRef}>
                {React.Children.map(children, (child) => (
                    <button
                        key={child.props.label}
                        data-label={child.props.label}
                        className={`${tabStyles.base} ${activeTab === child.props.label && tabStyles.active}`}
                        onClick={() => setActiveTab(child.props.label)}
                    >
                        {child.props.label}
                    </button>
                ))}
                {/* Animated Underline */}
                <motion.div
                    className={tabStyles.underline}
                    initial={{ left: 0, width: 0 }}
                    animate={{ left: underlinePosition.left, width: underlinePosition.width }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            </div>

            {/* Tab Content */}
            <div className={tabStyles.content}>
                {React.Children.map(children, (child) => (
                    activeTab === child.props.label && <div className={`${child.props.className} p-4`} key={child.props.label}>{child.props.children}</div>
                ))}
            </div>
        </div>
    );
};

export const Tab: React.FC<TabProps> = ({ children, className }) => <div className={className}>{children}</div>;
