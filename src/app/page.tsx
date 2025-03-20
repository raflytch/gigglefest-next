"use strict";
"use client";

import { Button } from "@/components/ui/button";

const Home = () => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Button clicked");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Button onClick={handleClick}>Click me</Button>
      <div className="flex justify-center">
        <h1 className="text-4xl font-bold">Welcome to GigglesFest</h1>
      </div>
      <Button variant="outline" className="mt-4" onClick={handleClick}>
        Click me
      </Button>
    </div>
  );
};

export default Home;
