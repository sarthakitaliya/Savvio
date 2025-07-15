"use client";
import Image from "next/image";
import styles from "../page.module.css";
import Link from "next/link";
import { Logo } from "../../components/logo";
import ThemeToggle from "../../components/Theme-toggle";
import { useRef } from "react";

export default function Home() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const handleScrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className={styles.page}>
      {/* Header */}
      <header className="w-full flex justify-between items-center px-6 pt-6 max-w-5xl mx-auto">
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">
              Savvio
            </span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1 mt-1">Your all-in-one bookmark & note manager</span>
        </div>
        <ThemeToggle />
      </header>

      {/* Hero Section */}
      <main className={styles.main}>
        <section className="relative w-full flex flex-col md:flex-row items-center gap-12 md:gap-20 max-w-5xl mx-auto py-10 md:py-20 overflow-hidden" style={{ minHeight: 420 }}>
          {/* Animated background gradient */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-purple-50 to-white dark:from-[#232323] dark:via-[#18181b] dark:to-[#232323] animate-gradient-move" />
          {/* Text */}
          <div className="flex-1 flex flex-col items-start gap-6 z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1F1F1F] dark:text-white leading-tight">
              Stay Organized, Stay Savvio
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg">
              From bookmarks to notes, Savvio gives you a seamless way to save and manage everything you discover online. <span className="font-semibold text-indigo-600 dark:text-indigo-400">Never lose a great find again.</span>
            </p>
            <div className="flex gap-4 mt-2">
              <Link
                href="/login"
                aria-label="Get Started Free"
                className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow transition-colors text-base"
              >
                Get Started Free
              </Link>
              <a
                href="https://chromewebstore.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Install Extension"
                className="px-6 py-3 rounded-full bg-white dark:bg-[#232323] border border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold shadow hover:bg-indigo-50 dark:hover:bg-[#18181b] transition-colors text-base"
              >
                Install Extension
              </a>
            </div>
            <button
              onClick={handleScrollToFeatures}
              className="mt-6 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow hover:scale-105 transition-transform"
              aria-label="Scroll to features"
            >
              Learn more ↓
            </button>
          </div>
          {/* Illustration */}
          <div className="flex-1 flex justify-center items-center z-10">
            <Image
              src="/default-preview.png"
              alt="Savvio dashboard preview"
              width={420}
              height={320}
              className="rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#232323]"
              priority
            />
          </div>
        </section>

        {/* How It Works */}
        <section className="w-full max-w-5xl mx-auto mt-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#1F1F1F] dark:text-white">
            How Savvio Works
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
            <div className="flex-1 bg-white dark:bg-[#232323] rounded-xl shadow p-6 flex flex-col items-center">
              {/* <Image src="/icon-48.png" alt="Extension icon" width={48} height={48} className="mb-3" /> */}
              <h3 className="font-semibold text-lg mb-2">
                1. Install the Extension
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Add Savvio to your browser to save bookmarks and notes from any tab in one click.
              </p>
            </div>
            <div className="flex-1 bg-white dark:bg-[#232323] rounded-xl shadow p-6 flex flex-col items-center">
              <Image
                src="/icon-128.png"
                alt="Quick Save"
                width={48}
                height={48}
                className="mb-3"
              />
              <h3 className="font-semibold text-lg mb-2">2. Save Instantly</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Click the Savvio button or use the floating widget to save the current page or a note instantly.
              </p>
            </div>
            <div className="flex-1 bg-white dark:bg-[#232323] rounded-xl shadow p-6 flex flex-col items-center">
              <Image
                src="/default-favicon.png"
                alt="Dashboard"
                width={48}
                height={48}
                className="mb-3"
              />
              <h3 className="font-semibold text-lg mb-2">
                3. Organize &amp; Search
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Use the web dashboard to organize with folders, add tags, and search your saved content anytime.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section ref={featuresRef} className="w-full max-w-5xl mx-auto mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#1F1F1F] dark:text-white">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon="/icon-48.png"
              title="Quick Save"
              desc="Save any page or note instantly from your browser."
            />
            <FeatureCard
              icon="/default-favicon.png"
              title="Folders &amp; Tags"
              desc="Organize bookmarks with custom folders, colors, icons, and tags."
            />
            <FeatureCard
              icon="/default-preview.png"
              title="Dashboard"
              desc="Beautiful web dashboard to browse, search, and manage everything."
            />
            <FeatureCard
              icon="/icon-128.png"
              title="Sync"
              desc="Extension and dashboard stay in sync—never lose a bookmark."
            />
            <FeatureCard
              icon="/file-text.svg"
              title="Notes"
              desc="Save not just links, but also notes and ideas."
            />
            <FeatureCard
              icon="/globe.svg"
              title="Privacy"
              desc="Your data is secure and never sold or shared."
            />
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full max-w-4xl mx-auto mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#1F1F1F] dark:text-white">
            What Our Users Say
          </h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
            <TestimonialCard
              name="Alex P."
              text="Savvio changed the way I organize my research. The extension is a game changer!"
            />
            <TestimonialCard
              name="Priya S."
              text="I love how easy it is to save and find my bookmarks. The dashboard is beautiful and fast."
            />
            <TestimonialCard
              name="Chris D."
              text="The notes feature is a lifesaver for my daily workflow. Highly recommend!"
            />
          </div>
        </section>

        {/* CTA */}
        <section className="w-full max-w-3xl mx-auto mt-24 flex flex-col items-center gap-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-[#232323] dark:to-[#18181b] border border-indigo-100 dark:border-[#232323] rounded-2xl py-12 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#1F1F1F] dark:text-white">
            Ready to take control of your digital life?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-xl">
            Join thousands of users who trust Savvio to keep their bookmarks and notes organized, accessible, and secure.
          </p>
          <div className="flex gap-4">
            <Link
              href="/login"
              aria-label="Create Your Free Account"
              className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow transition-colors text-base"
            >
              Create Your Free Account
            </Link>
            <a
              href="https://chromewebstore.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Install Extension"
              className="px-6 py-3 rounded-full bg-white dark:bg-[#232323] border border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold shadow hover:bg-indigo-50 dark:hover:bg-[#18181b] transition-colors text-base"
            >
              Install Extension
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <Link href="/privacy">
          <span>Privacy Policy</span>
        </Link>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center bg-white dark:bg-[#232323] rounded-xl shadow p-6 h-full group transition-transform hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-3 transition-transform group-hover:scale-110">
        <Image src={icon} alt={title} width={40} height={40} />
      </div>
      <h3 className="font-semibold text-lg mb-2 text-center">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-center text-sm">{desc}</p>
    </div>
  );
}

function TestimonialCard({ name, text }: { name: string; text: string }) {
  return (
    <div className="flex-1 bg-white dark:bg-[#232323] rounded-xl shadow p-6 flex flex-col items-center border border-indigo-100 dark:border-[#232323]">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl mb-3">
        {name[0]}
      </div>
      <p className="text-gray-700 dark:text-gray-300 text-center italic mb-2">“{text}”</p>
      <span className="text-xs text-gray-500 dark:text-gray-400">{name}</span>
    </div>
  );
}
