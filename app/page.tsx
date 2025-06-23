import { Metadata } from "next";
import { MiddlePanel } from "@/components/GridPanels";
import { MainLayout } from "@/components/MainLayout";
import { TabletSidebar } from "@/components/TabletSidebar";
import { LeftPanel } from "@/components/LeftPanel";
import { RightPanel } from "./RightPanel";
import WithAuth from "@/components/auth/WithAuth";
import { StickyChildren } from "./StickyChildren";
import { Clips } from "@/components/Clips";

export const metadata: Metadata = {
  title: "Home - VoidCast",
  description: "Welcome to the world of VoidCast",
};

export default function Home() {
  return (
    <WithAuth>
      <MainLayout
        tabletSidebar={<TabletSidebar />}
        leftPanel={<LeftPanel />}
        rightPanel={<RightPanel />}
      >
        <MiddlePanel stickyChildren={<StickyChildren />}>
          <Clips />
        </MiddlePanel>
      </MainLayout>
    </WithAuth>
  );
}
