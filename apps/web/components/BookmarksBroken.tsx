import Link from "next/link";

export default function BookmarksBroken() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-10 mt-30 p-10 sm:px-6 lg:px-8">
      <div className="w-[85vw] sm:w-5/6  md:w-[400px] md:h-[465px] lg:h-[510px] lg:w-[500px] bg-[#F8F9FD] border border-[#CECEEA] p-10 rounded-3xl overflow-hidden">
        <h2 className="text-2xl sm:text-4xl font-bold dark:text-black">Bookmarks Are Broken.</h2>
        <p className="text-[#696969] text-sm sm:text-base mt-2 relative z-99">
          Browsers, devices, tabs — they don't talk. Your bookmarks are
          scattered, hard to find, and impossible to organize.
        </p>
        <video
          src="/videos/broken-bookmarks.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="-mt-10"
        />
      </div>
      <div className="w-[85vw] sm:w-5/6 md:w-[400px] md:h-[465px] lg:h-[510px] lg:w-[500px]  bg-[#000000] border border-[#CECEEA] dark:border-gray-600 p-10 rounded-3xl">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-4xl font-bold text-white">
            A Better Way to Manage Bookmarks
          </h2>
          <p className="text-[#B0B0B0] text-sm sm:text-base mt-2">
            Introducing a solution that brings all your bookmarks together in
            one place. <br />
            Across browsers. Across devices.
          </p>
        </div>
        <Link
          href="/login"
          className="px-4 py-3 bg-[#5D43E7] text-white rounded-xl shadow-lg hover:bg-[#4c35c6] transition-colors text-sm sm:text-base mt-10"
        >
          Get Started with Savvio
        </Link>
        <video
          src="/videos/Savvio.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="rounded-3xl w-full h-auto mt-20 md:mt-10 lg:mt-15"
        />
      </div>
    </section>
  );
}
