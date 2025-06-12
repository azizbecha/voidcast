import WithAuth from "@/components/auth/WithAuth";
import { MainLayout } from "@/components/MainLayout";
import { TabletSidebar } from "@/components/TabletSidebar";
import { LeftPanel } from "../LeftPanel";
import { RightPanel } from "../RightPanel";
import { MiddlePanel } from "@/components/GridPanels";

export default function Page() {
  return (
    <WithAuth>
      <MainLayout
        tabletSidebar={<TabletSidebar />}
        leftPanel={<LeftPanel />}
        rightPanel={<RightPanel />}
      >
        <MiddlePanel
          stickyChildren={
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-primary-100">Create clip</h4>
            </div>
          }
        >
          <div
            className={`flex flex-col overflow-y-auto max-h-screen scrollbar-hide`}
          >
            
          </div>
        </MiddlePanel>
      </MainLayout>
    </WithAuth>
  );
}
