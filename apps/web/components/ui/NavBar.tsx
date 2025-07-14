"use client";
import { useUserStore } from "@repo/store";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import ThemeToggle from "../Theme-toggle";
import { Menu } from "@headlessui/react";
import { authClient } from "../../lib/auth-client";
import { useRouter } from "next/navigation";
import { Logo } from "../logo";
import Link from "next/link";

export function NavBar() {
  const { user, logout } = useUserStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
            logout();
          },
          onError: (error) => {
            console.error("Logout failed:", error);
          },
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="h-14 flex justify-between items-center px-7 py-10 border-b border-gray-200 dark:border-gray-700">
      <Link
        href="/dashboard"
        className="flex items-center font-semibold text-lg"
      >
        <Logo />
        Savvio
      </Link>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-[#2F2F2F] rounded-full p-1 transition-colors cursor-pointer">
            <Image
              src={user?.image || "/default-avatar.png"}
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full cursor-pointer"
            />
            <ChevronDown className="w-4 h-4 text-[#4B5563] dark:text-[#A1A1AA]" />
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-[#2A2A2A] border border-[#E5E7EB] dark:border-[#333] shadow-lg focus:outline-none z-50">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`w-full text-left px-4 py-2 text-sm cursor-pointer ${
                      active
                        ? "bg-gray-100 dark:bg-[#3A3A3A]"
                        : "text-[#1F1F1F] dark:text-[#FFFFFFCF]"
                    }`}
                    onClick={() => router.push("/dashboard/profile")}
                  >
                    My Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`w-full text-left px-4 py-2 text-sm cursor-pointer ${
                      active
                        ? "bg-gray-100 dark:bg-[#3A3A3A]"
                        : "text-[#1F1F1F] dark:text-[#FFFFFFCF]"
                    }`}
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </div>
    </div>
  );
}
