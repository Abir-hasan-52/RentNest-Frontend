import { Button } from "@/components/ui/button";
import React from "react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <p>Welcome to the Dashboard Layout</p>
      {children}
      <Button>Click Me</Button>
    </div>
  );
}

export default DashboardLayout;
