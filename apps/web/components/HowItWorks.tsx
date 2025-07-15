"use client";

import { Chrome, Bookmark, Folder } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Add the Extension",
      description: "Install Savvio quickly and link your account.",
      icon: <Chrome size={32} className="text-purple-600" />,
    },
    {
      title: "Save Instantly from Any Page",
      description: "Click the floating button to save URLs fast.",
      icon: <Bookmark size={32} className="text-purple-600" />,
    },
    {
      title: "Organize & Search in Dashboard",
      description: "Manage and search bookmarks and notes easily.",
      icon: <Folder size={32} className="text-purple-600" />,
    },
  ];

  return (
    <section className="py-16 mt-15">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold text-center">
          How Savvio Works
        </h2>
        <p className=" text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-10">
          Add the extension, save instantly, and organize with ease.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl mx-auto">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div
              key={i}
              className="w-full md:h-70 lg:h-55 flex flex-col items-center text-center p-7 rounded-xl shadow hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2A2A2A]"
            >
              <div className="mb-4">{Icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
