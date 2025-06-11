"use client";

import { toast } from "sonner";
import { MiddlePanel } from "@/components/GridPanels";
import { MainLayout } from "@/components/MainLayout";
import { TabletSidebar } from "@/components/TabletSidebar";
import { Button } from "@/components/ui/Button";
import { LeftPanel } from "./LeftPanel";
import { RightPanel } from "./RightPanel";

export default function Home() {
  return (
    <MainLayout
      tabletSidebar={<TabletSidebar />}
      leftPanel={<LeftPanel />}
      rightPanel={<RightPanel />}
    >
      <MiddlePanel
        stickyChildren={
          <div className="flex justify-between items-start mb-3">
            <h4 className="text-primary-100">Your feed</h4>
            <Button
              onClick={() =>
                toast("New Room", {
                  description: "@azizbecha started a new room",
                })
              }
            >
              Create
            </Button>
          </div>
        }
      >
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
  );
}
