import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-18 w-full max-w-5xl mx-auto">
      {/* Text */}
      <div className="flex-1 flex flex-col items-start gap-4 md:gap-6">
        <h1 className="text-3xl font-bold md:text-5xl lg:text-5xl md:font-extrabold text-[#1F1F1F] dark:text-white leading-tight">
          Stay Organized, <br />
          Stay Savvio
        </h1>
        <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300 max-w-lg">
          From bookmarks to notes, Savvio gives you a seamless way to save and
          manage everything you discover online.
        </p>
        <div className="flex gap-2 sm:gap-4 mt-2">
          <Link
            href="/login"
            className="px-4 py-2 lg:px-6 lg:py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white sm:font-semibold shadow transition-colors text-base"
          >
            Get Started
          </Link>
          <a
            href="https://chromewebstore.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 lg:px-6 lg:py-3 rounded-full bg-white dark:bg-[#232323] border border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold shadow hover:bg-indigo-50 dark:hover:bg-[#18181b] transition-colors text-base"
          >
            Install Extension
          </a>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <Image
          src="/default-preview.png"
          alt="Savvio dashboard preview"
          width={420}
          height={320}
          className="rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#232323]"
          priority
        />
      </div>
    </div>
  );
}
