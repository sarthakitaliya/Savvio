import { authClient } from "../auth/auth-client";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="w-80 h-[450px] flex items-center justify-center bg-[#2A2A2A]">
        <span className="text-gray-500 dark:text-gray-400">Loading...</span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="w-80 h-[450px] flex flex-col items-center justify-center bg-[#2A2A2A] px-4 text-center">
        <p className="text-gray-300 text-sm mb-4">
          Log in to Savvio to save and manage your bookmarks.
        </p>
        <a
          href={`${import.meta.env.VITE_WEB_APP_URL}/login?source=extension`}
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
