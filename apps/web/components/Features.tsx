// components/Features.tsx

import { Save, Folder, Monitor, Search, Sparkles, Lock } from "lucide-react";

const features = [
  {
    icon: <Save size={32} className="text-purple-600" />,
    title: "One-Click Save",
    description:
      "Bookmark any page instantly from the extension’s floating button.",
  },
  {
    icon: <Folder size={32} className="text-purple-600" />,
    title: "Organized Folders",
    description: "Group and manage your bookmarks with easy-to-create folders.",
  },
  {
    icon: <Monitor size={32} className="text-purple-600" />,
    title: "Sync",
    description: "Extension and dashboard stay in sync—never lose a bookmark.",
  },
  {
    icon: <Search size={32} className="text-purple-600" />,
    title: "Quick Search",
    description:
      "Search saved pages quickly from the dashboard or extension popup.",
  },
  {
    icon: <Sparkles size={32} className="text-purple-600" />,
    title: "Notes & Highlights",
    description: "Save not just links, but also notes and ideas.",
  },
  {
    icon: <Lock size={32} className="text-purple-600" />,
    title: "Privacy Focused",
    description: "Your data stays private and secure, only accessible to you.",
  },
];

export default function Features() {
  return (
    <section className="py-16 mt-20">
      <div className="max-w-2xl mx-auto text-center mb-15">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white tracking-tight">
          Key Features
        </h2>
        <p className=" text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-10">
          A seamless way to save, search, and organize your web experience.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-gray-50 dark:bg-[#2A2A2A] border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow hover:shadow-md transition"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
