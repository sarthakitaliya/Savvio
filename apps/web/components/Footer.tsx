import { Github, Twitter } from "lucide-react";
import { Logo } from "./logo";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-[#202020] border-t border-gray-200 dark:border-gray-700 mt-16 px-7">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <div className="flex items-center gap-2">
              <Logo />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Savvio
              </h2>
            </div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 ml-2">
              Save and organize your web effortlessly.
            </p>
            
          </div>

          <div className="flex flex-col gap-2 text-sm ml-2">
            <a
              href="/privacy"
              className="text-gray-500 hover:text-indigo-600"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-gray-500 hover:text-indigo-600"
            >
              Terms of Service
            </a>
            <div className="flex gap-4 mt-3">
              <a
                href="https://github.com/yourusername/savvio"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5 text-gray-500 hover:text-indigo-600" />
              </a>
              <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5 text-gray-500 hover:text-indigo-600" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
