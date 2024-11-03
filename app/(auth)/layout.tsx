import Logo from "@/components/logo";
import React from "react";

function LayoutAuth({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Logo />
      {children}{" "}
    </div>
  );
}

export default LayoutAuth;
