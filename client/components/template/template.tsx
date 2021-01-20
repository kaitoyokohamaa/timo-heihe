import React from "react";
import { AppHeader } from "./header";
import { Navigation } from "./navigation";

type TemplateProps = {
  children: React.ReactNode;
};

export const Template: React.FC<TemplateProps> = ({
  children,
}: TemplateProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />

      <div className="flex flex-1">
        <Navigation />
        <main className="flex-1 bg-gray-100 p-10">{children}</main>
      </div>
    </div>
  );
};
