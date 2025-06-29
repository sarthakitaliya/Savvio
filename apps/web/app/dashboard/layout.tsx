"use client";
import { RequireAuth } from "../../components/RequireAuth";
import { NavBar } from "../../components/ui/NavBar";
import { authClient, useSession } from "../../lib/auth-client";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth>
      <div>
        <NavBar />
        {children}
      </div>
    </RequireAuth>
  );
}
