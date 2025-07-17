import { Github, Twitter } from "lucide-react";
import { Logo } from "./logo";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-[#202020] border-t border-gray-200 dark:border-gray-700 mt-16 px-7">
      <div className="max-w-7xl mx-auto p-10">
        <div className="flex flex-wrap justify-between gap-8">
          <div>
            <div className="flex items-center gap-2">
              <Logo />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Savvio
              </h2>
            </div>
            <p className="mt-1 text-sm text-[#6B7280] dark:text-gray-400 ml-2">
              Stay organized. Stay Savvio.
            </p>
            <div className="flex gap-4 mt-3 ml-2">
              <a
                href="https://github.com/sarthakitaliya/Savvio"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5 text-gray-500 hover:text-indigo-600" />
              </a>
              <a
                href="https://x.com/sarthaktwtt"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5 text-gray-500 hover:text-indigo-600" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-1 text-sm">
            <h3 className="font-bold mb-2">Quick Links</h3>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-indigo-600 dark:text-gray-400"
            >
              Dashboard
            </Link>
            <Link
              href="/privacy-policy"
              className="text-gray-600 hover:text-indigo-600 dark:text-gray-400"
            >
              Privacy Policy
            </Link>
            <Link
              href="/#"
              className="text-gray-600 hover:text-indigo-600 dark:text-gray-400"
            >
              Extension
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-indigo-600 dark:text-gray-400"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
