"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  Home,
  LayoutDashboard,
  ShoppingBag,
  Settings,
  Users,
  CreditCard,
  FileText,
  ChevronDown,
  Calendar,
  BarChart3,
} from "lucide-react";
import Logo from "./logo";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const pathname = usePathname();

  // Close drawer when route changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-white transition-all duration-500 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-[280px] bg-background z-50 shadow-xl flex flex-col">
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <Logo />
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-muted transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 py-4 overflow-y-auto">
          <MobileNav />
        </div>

        <div className="p-4 border-t border-border">
          <MobileProfileSection />
        </div>
      </div>
    </>
  );
}

function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="space-y-1 px-3">
      <NavItem
        href="/"
        icon={<Home size={20} />}
        label="Home"
        isActive={pathname === "/"}
      />

      <NavItem
        href="/dashboard"
        icon={<LayoutDashboard size={20} />}
        label="Dashboard"
        isActive={pathname === "/dashboard"}
      />

      <NavGroup icon={<ShoppingBag size={20} />} label="Menu Items">
        <NavItem
          href="/menu/all"
          label="All Items"
          isActive={pathname === "/menu/all"}
          isNested
        />
        <NavItem
          href="/menu/categories"
          label="Categories"
          isActive={pathname === "/menu/categories"}
          isNested
        />
        <NavItem
          href="/menu/specials"
          label="Specials"
          isActive={pathname === "/menu/specials"}
          isNested
        />
      </NavGroup>

      <NavItem
        href="/orders"
        icon={<FileText size={20} />}
        label="Orders"
        isActive={pathname === "/orders"}
      />

      <NavItem
        href="/calendar"
        icon={<Calendar size={20} />}
        label="Schedule"
        isActive={pathname === "/calendar"}
      />

      <NavItem
        href="/analytics"
        icon={<BarChart3 size={20} />}
        label="Analytics"
        isActive={pathname === "/analytics"}
      />

      <NavItem
        href="/customers"
        icon={<Users size={20} />}
        label="Customers"
        isActive={pathname === "/customers"}
      />

      <NavItem
        href="/payments"
        icon={<CreditCard size={20} />}
        label="Payments"
        isActive={pathname === "/payments"}
      />

      <NavItem
        href="/settings"
        icon={<Settings size={20} />}
        label="Settings"
        isActive={pathname === "/settings"}
      />
    </div>
  );
}

interface NavItemProps {
  href: string;
  icon?: React.ReactNode;
  label: string;
  isActive: boolean;
  isNested?: boolean;
}

function NavItem({
  href,
  icon,
  label,
  isActive,
  isNested = false,
}: NavItemProps) {
  return (
    <Link
      href={href}
      className={`
        flex items-center gap-3 px-3 py-2 rounded-md transition-colors
        ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"}
        ${isNested ? "pl-10" : ""}
      `}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="truncate">{label}</span>
    </Link>
  );
}

interface NavGroupProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}

function NavGroup({ icon, label, children }: NavGroupProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors hover:bg-muted
          ${isOpen ? "bg-muted" : ""}
        `}
      >
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0">{icon}</span>
          <span className="truncate">{label}</span>
        </div>
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && <div className="mt-1 space-y-1">{children}</div>}
    </div>
  );
}

function MobileProfileSection() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
        JD
      </div>
      <div>
        <div className="font-medium">John Doe</div>
        <div className="text-xs text-muted-foreground">
          owner@streetfood.com
        </div>
      </div>
    </div>
  );
}
