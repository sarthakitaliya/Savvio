"use client";
import { NavBar } from "../../components/ui/NavBar";

NavBar;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col">
      <NavBar />
      <main className="flex-1 overflow-y-auto p-4">
        {children}
      </main>
    </div>
  );
}
