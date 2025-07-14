import { authClient } from "../auth/auth-client";
import Loading from "./Loading";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const apiUrl = import.meta.env.VITE_WEB_APP_URL;

  if (isPending) {
    return (
      <Loading />
    );
  }

  if (!session) {
    return (
      <div className="w-80 h-[450px] flex flex-col items-center justify-center bg-[#2A2A2A] px-4 text-center">
        <p className="text-gray-300 text-sm mb-4">
          Log in to Savvio to save and manage your bookmarks.
        </p>
        <a
          href={`${apiUrl}/login?source=extension`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Log in to Savvio
        </a>
      </div>
    );
  }

  return <>{children}</>;
}
