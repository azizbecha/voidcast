import { MiddlePanel } from "@/components/GridPanels";
import { MainLayout } from "@/components/MainLayout";
import { TabletSidebar } from "@/components/TabletSidebar";
import { LeftPanel } from "./LeftPanel";
import { RightPanel } from "./RightPanel";
import WithAuth from "@/components/auth/WithAuth";
import { StickyChildren } from "./StickyChildren";

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
            className={`flex flex-col overflow-y-auto max-h-screen scrollbar-hide`}
          >
            {Array(20)
              .fill(0)
              .map((_, key) => (
                <div key={key} className="w-full p-4 bg-primary-800 mb-4">
                  <h4>room</h4>
                </div>
              ))}
          </div>
        </MiddlePanel>
      </MainLayout>
    </WithAuth>
  );
}
