"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import MobileDrawer from "./mobile-drawer";
import TopBar from "./top-bar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)

  // Handle drawer toggle
  const toggleMobileDrawer = () => {
    setIsMobileDrawerOpen(!isMobileDrawerOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar - visible on large screens */}
      <div
        className={`hidden lg:block transition-all duration-300 ease-in-out`}
      >
        <Sidebar
        />
      </div>

      {/* Mobile Drawer - visible when open on small screens */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
      />

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar
          onMenuClickAction={toggleMobileDrawer}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
