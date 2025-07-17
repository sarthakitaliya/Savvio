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
      <body className="bg-[#F5F5F4] text-[#1F1F1F] dark:bg-[#202020] dark:text-white min-h-screen">
        <div>
          <ToastListener />
          <NavBar />
          {children}
        </div>
      </body>
    </RequireAuth>
  );
}
