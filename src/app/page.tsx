"use strict";
"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log("Button clicked");
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Button onClick={handleClick}>Click me</Button>
    </div>
  );
}
