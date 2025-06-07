"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/Radio";
import { Label } from "@/components/ui/Label";
import { useState } from "react";

export default function Home() {
  const [checked, setChecked] = useState(true);

  const toggle = () => setChecked(c => !c);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <RadioGroup defaultValue="option-one">
        <div className="flex items-center space-x-2">
          <RadioGroupItem onClick={toggle} checked={checked} value="option-one" id="option-one" />
          <Label htmlFor="option-one">Option One</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem onClick={toggle} checked={checked} value="option-two" id="option-two" />
          <Label htmlFor="option-two">Option Two</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
