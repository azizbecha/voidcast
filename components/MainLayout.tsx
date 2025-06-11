"use client"

import React from "react";

import { useScreenType } from "@/shared-hooks/useScreenType";
import { MainInnerGrid } from "./MainGrid";
import { LeftPanel, RightPanel } from "./GridPanels";
import { TabletSidebar } from "./TabletSidebar";
import { MobileHeader } from "./MobileHeader";

interface MainLayoutProps {
  children: React.ReactNode;
  floatingRoomInfo?: React.ReactNode;
  tabletSidebar?: React.ReactNode;
  leftPanel?: React.ReactNode;
  rightPanel?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  leftPanel = <div />,
  rightPanel = <div />,
  tabletSidebar = <TabletSidebar />,
  floatingRoomInfo = <div />,
}) => {
  const screenType = useScreenType();

  let middle = null;
  let prepend = null;

  switch (screenType) {
    case "3-cols":
      middle = (
        <>
          <LeftPanel>{leftPanel}</LeftPanel>
          {children}
          <RightPanel>{rightPanel}</RightPanel>
        </>
      );
      break;
    case "2-cols":
      middle = (
        <>
          <LeftPanel>{tabletSidebar}</LeftPanel>
          {children}
          <RightPanel>{rightPanel}</RightPanel>
        </>
      );
      break;
    case "1-cols":
      middle = (
        <>
          <LeftPanel>{tabletSidebar}</LeftPanel>
          {children}
          {floatingRoomInfo}
        </>
      );
      break;
    case "fullscreen":
      prepend = <MobileHeader />;
      middle = <>{children}</>;
  }

  return (
    <>
      {prepend && (
        <div className={`fixed top-0 left-0 w-full z-10`}>{prepend}</div>
      )}
      <div
        className={`flex flex-col items-center w-full scrollbar-thin scrollbar-thumb-primary-700 ${
          prepend && "mt-7"
        } ${screenType === "fullscreen" ? "pb-12" : ""}`}
      >
        <MainInnerGrid>{middle}</MainInnerGrid>
      </div>
    </>
  );
};
