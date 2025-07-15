
import Link from "next/link";
import ThemeToggle from "./Theme-toggle";
import { Logo } from "./logo";

export default function NavBar() {
  return (
    <div className="h-14 flex justify-between items-center p-7 md:px-15 md:py-10 border-b border-gray-200 dark:border-gray-700">
        <Link
            href="/dashboard"
            className="flex items-center font-semibold text-lg"
        >
            <Logo />
            <span className="text-xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">
            Savvio
            </span>
        </Link>
        <div className="flex items-center gap-4">
            <ThemeToggle />
        </div>
    </div>
  );
}