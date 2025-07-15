import Link from "next/link";

export default function Cta() {
  return (
    <section className="bg-white dark:bg-[#2A2A2A] shadow-2xl py-16 px-6 text-center mt-30 rounded-3xl">
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
        Ready to organize your web journey?
      </h2>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
        <Link
          href="/login"
          className="px-4 py-2 lg:px-6 lg:py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white sm:font-semibold shadow transition-colors text-base"
        >
          Create Your Account
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
    </section>
  );
}
