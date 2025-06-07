"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/Switch";

export default function Home() {
  const [checked, setChecked] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Switch checked={checked} onClick={() => setChecked((c) => !c)} />
    </div>
  );
}
