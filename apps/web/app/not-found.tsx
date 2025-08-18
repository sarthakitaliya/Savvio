import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4 sm:px-6 md:px-6">
      <div className="flex flex-col items-center border border-[#E5E7EB] dark:border-[#333333] rounded-xl bg-white dark:bg-[#2A2A2A] p-6 sm:p-10 max-w-md w-full shadow-md">
        {/* Icon */}
        <div className="mb-6 sm:mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 sm:h-24 sm:w-24 text-blue-500 dark:text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
            />
          </svg>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white mb-3">404</h1>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-5">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-sm leading-relaxed text-sm sm:text-base">
          The page you’re looking for doesn’t exist or might have been moved.
        </p>
        <Link
          href="/dashboard"
          className="inline-block px-6 py-2 sm:px-7 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-colors duration-200"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}