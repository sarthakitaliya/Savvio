"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [imageSrc, setImageSrc] = useState("");
  useEffect(() => {
    if (isDark) {
      setImageSrc(
        "/hero-dark.png"
      );
    } else {
      setImageSrc(
        "/hero-light.png"
      );
    }
  }, [isDark]);
  if(!imageSrc) return null; 
  return (
    <div className="flex flex-col items-center justify-center text-center p-3 md:p-6 gap-4 mt-35">
      <div className="">
        <h1 className="text-4xl  md:text-6xl font-extrabold tracking-tight text-balance">
          Stay Organized, Stay Savvio
        </h1>
        <p className="mt-2 text-xs md:text-lg text-[#7f7f7f] max-w-xl mx-auto tracking-wide leading-4 md:leading-6">
          Save, search, and manage bookmarks & notes across devices all from one
          simple extension and dashboard.
        </p>
        <div className="flex flex-wrap gap-3 justify-center items-center mt-8 ">
          <Link
            href="/dashboard"
            className="px-4 py-3 bg-[#5D43E7] text-white rounded-2xl shadow-2xl hover:bg-[#4c35c6] transition-colors text-sm sm:text-base"
          >
            View Dashboard
          </Link>
          <a
            href="https://chromewebstore.google.com/detail/savvio/pfgjkdbnpkieiakfigebbhfmeamgknem"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 bg-black text-white rounded-2xl shadow-2xl hover:bg-gray-800 transition-colors text-sm sm:text-base"
          >
            Install Extension
          </a>
        </div>
      </div>
      <div className="relative w-full h-full lg:w-5xl mb-10 lg:mb-30">
        <Image
          src={imageSrc}
          alt="Hero Image"
          width={1200}
          height={600}
          layout="responsive"
          className="mt-10 rounded-3xl border border-[#CECEEA] dark:border dark:border-[#3A3A3C] shadow-md dark:shadow-[0_4px_24px_rgba(93,67,231,0.12)] "
        />
      </div>
    </div>
  );
}
