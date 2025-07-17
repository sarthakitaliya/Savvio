import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-3 md:p-6 gap-4 mt-35">
      <div className="">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold">Stay Organized, Stay Savvio</h1>
        <p className="mt-3 text-sm md:text-lg text-[#696969] max-w-xl mx-auto">
          Save, search, and manage bookmarks & notes across devices all from one
          simple extension and dashboard.
        </p>
        <div className="flex flex-wrap gap-3 justify-center items-center mt-8 ">
          <Link
            href="/dashboard"
            className="px-4 py-3 bg-[#5D43E7] text-white rounded-xl shadow-lg hover:bg-[#4c35c6] transition-colors text-sm sm:text-base"
          >
            View Dashboard
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-3 bg-black text-white rounded-xl shadow-lg hover:bg-gray-800 transition-colors text-sm sm:text-base"
          >
            Install Extension
          </Link>
        </div>
      </div>
      <div className="relative w-full h-full lg:w-5xl mb-10 lg:mb-30">
        <Image
          src="/hero-image.png"
          alt="Hero Image"
          width={1200}
          height={600}
          layout="responsive"
          className="mt-10 rounded-3xl dark:border dark:border-gray-600 shadow-lg"
        />
      </div>
    </div>
  );
}
