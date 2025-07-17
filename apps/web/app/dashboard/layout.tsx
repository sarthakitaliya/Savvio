import { RequireAuth } from "../../components/RequireAuth";
import ToastListener from "../../components/ToastListener";
import { NavBar } from "../../components/ui/NavBar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth>
        <div>
          <ToastListener />
          <NavBar />
          {children}
        </div>
    </RequireAuth>
  );
}
