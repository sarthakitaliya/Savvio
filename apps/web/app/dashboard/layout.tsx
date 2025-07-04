
import { RequireAuth } from "../../components/RequireAuth";
import ToastListener from "../../components/ToastListener";
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
        <ToastListener/>
        <NavBar />
        {children}
      </div>
    </RequireAuth>
  );
}
