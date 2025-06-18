import { Metadata } from "next";

import { MiddlePanel } from "@/components/GridPanels";
import { MainLayout } from "@/components/MainLayout";
import { TabletSidebar } from "@/components/TabletSidebar";
import { LeftPanel } from "@/components/LeftPanel";
import { RightPanel } from "../RightPanel";
import WithAuth from "@/components/auth/WithAuth";
import { StickyChildren } from "./StickyChildren";
import AudioEditor from "./AudioEditor";

export const metadata: Metadata = {
  title: "Create - VoidCast",
  description: "Share your clips now on VoidCast!",
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
          <div
            className={`flex flex-col overflow-y-auto h-full scrollbar-hide`}
          >
            <AudioEditor />
          </div>
        </MiddlePanel>
      </MainLayout>
    </WithAuth>
  );
}
