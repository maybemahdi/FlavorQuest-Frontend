/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";
import Swal from "sweetalert2";

interface TopBarProps {
  onMenuClickAction: () => void;
}

export default function TopBar({ onMenuClickAction }: TopBarProps) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign out!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        Swal.fire({
          title: "Success!",
          text: "Sign out successful.",
          icon: "success",
        });
        router.push("/");
      }
    });
  };

  return (
    <header className="h-16 border-b border-border flex items-center px-4 gap-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-[1000]">
      {/* Mobile menu button - visible on small screens */}
      <button
        onClick={onMenuClickAction}
        className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <h5 className="font-semibold text-lg flex-1">Dashboard</h5>

      {/* Theme toggle */}
      {/* <ThemeToggle /> */}

      {/* User account - smaller screens only */}
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="flex items-center text-sm rounded-full focus:outline-none"
        >
          <RxAvatar size={30} />
        </button>

        {profileOpen && (
          <div className="absolute right-0 z-10 w-48 mt-2 origin-top-right rounded-md shadow-lg dark:bg-white text-black focus:outline-none">
            <div className="py-1">
              <Link href="#" className="block px-4 py-2 text-sm">
                Your Profile
              </Link>
              <Link href="#" className="block px-4 py-2 text-sm">
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-left"
              >
                <FiLogOut className="mr-2" />
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
