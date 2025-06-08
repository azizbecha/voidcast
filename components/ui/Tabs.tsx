"use client";

import React, {
  useState,
  useRef,
  useEffect,
  ReactNode,
  ReactElement,
  useMemo,
  useCallback,
  memo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TabProps {
  label: string;
  children: ReactNode;
  className?: string;
}

interface TabsProps {
  children: ReactElement<TabProps>[];
  defaultTab?: string;
}

const tabStyles = {
  base: "transition-all duration-200 py-2 text-base font-bold border-b-2 border-gray-700 flex-1 text-center relative hover:bg-primary-800 rounded-t-md cursor-pointer",
  active: "text-accent",
  container: "w-full h-full mx-auto mt-2",
  header: "relative flex",
  content:
    "bg-primary-800 rounded-lg mt-4 overflow-y-auto h-full scrollbar-hide",
  underline: "absolute bottom-0 h-0.5 bg-accent",
};

export const Tabs: React.FC<TabsProps> = ({ children, defaultTab }) => {
  const tabElements = useMemo(
    () => React.Children.toArray(children) as ReactElement<TabProps>[],
    [children]
  );

  const [activeTab, setActiveTab] = useState<string>(() => {
    const labels = tabElements.map((tab) => tab.props.label);
    return defaultTab && labels.includes(defaultTab)
      ? defaultTab
      : labels[0] ?? "";
  });

  const [renderedTabs, setRenderedTabs] = useState<Set<string>>(
    new Set([activeTab])
  );

  const [underlinePosition, setUnderlinePosition] = useState({
    left: 0,
    width: 0,
  });

  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Update rendered tabs set
  useEffect(() => {
    setRenderedTabs((prev) => new Set(prev).add(activeTab));
  }, [activeTab]);

  // Update underline position
  const updateUnderlinePosition = useCallback(() => {
    const activeButton = tabRefs.current[activeTab];
    if (activeButton) {
      const { offsetLeft, offsetWidth } = activeButton;
      setUnderlinePosition({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab]);

  useEffect(() => {
    const timeout = setTimeout(updateUnderlinePosition, 10);
    return () => clearTimeout(timeout);
  }, [activeTab, updateUnderlinePosition]);

  const tabButtons = useMemo(
    () =>
      tabElements.map((tab) => (
        <button
          key={tab.props.label}
          ref={(el) => {
            tabRefs.current[tab.props.label] = el;
          }}
          data-label={tab.props.label}
          className={`${tabStyles.base} ${
            activeTab === tab.props.label ? tabStyles.active : ""
          }`}
          onClick={() => setActiveTab(tab.props.label)}
          role="tab"
          aria-selected={activeTab === tab.props.label}
          aria-controls={`tabpanel-${tab.props.label}`}
        >
          {tab.props.label}
        </button>
      )),
    [tabElements, activeTab]
  );

  return (
    <div className={tabStyles.container}>
      {/* Tab Headers */}
      <div className={tabStyles.header} ref={tabsRef}>
        {tabButtons}

        {/* Animated Underline */}
        <motion.div
          className={tabStyles.underline}
          initial={{ left: 0, width: 0 }}
          animate={{
            left: underlinePosition.left,
            width: underlinePosition.width,
          }}
          transition={{ type: "spring", stiffness: 250, damping: 30 }}
        />
      </div>

      {/* Tab Content */}
      <div className={tabStyles.content}>
        <AnimatePresence mode="wait" initial={false}>
          {(() => {
            const tab = tabElements.find((t) => t.props.label === activeTab);
            if (!tab || !renderedTabs.has(tab.props.label)) return null;

            return (
              <motion.div
                key={tab.props.label}
                id={`tabpanel-${tab.props.label}`}
                role="tabpanel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
                className={`${tab.props.className || ""} ${
                  (!tab.props.className ||
                    !tab.props.className.includes("p-")) &&
                  "p-4"
                }`}
              >
                {tab.props.children}
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const Tab = memo(({ children, className }: TabProps) => (
  <div className={className}>{children}</div>
));

Tab.displayName = "Tab";
