// components/Features.tsx

import { Save, Folder, Monitor, Search, Sparkles, Lock } from "lucide-react";

const features = [
  {
    icon: <Save size={32} className="text-[#5D43E7]" />,
    title: "One-Click Save",
    description:
      "Bookmark any page instantly from the extension's floating button.",
  },
  {
    icon: <Folder size={32} className="text-[#5D43E7]" />,
    title: "Organized Folders",
    description: "Group and manage your bookmarks with easy-to-create folders.",
  },
  {
    icon: <Monitor size={32} className="text-[#5D43E7]" />,
    title: "Sync",
    description: "Extension and dashboard stay in sync—never lose a bookmark.",
  },
  {
    icon: <Search size={32} className="text-[#5D43E7]" />,
    title: "Quick Search",
    description:
      "Search saved pages quickly from the dashboard or extension popup.",
  },
  {
    icon: <Sparkles size={32} className="text-[#5D43E7]" />,
    title: "Notes & Highlights",
    description: "Save not just links, but also notes and ideas.",
  },
  {
    icon: <Lock size={32} className="text-[#5D43E7]" />,
    title: "Privacy Focused",
    description: "Your data stays private and secure, only accessible to you.",
  },
];

export default function Features() {
  return (
    <section className="py-16 px-4 mt-20">
      <div className="max-w-sm mx-auto text-center mb-15">
        <h2 className="text-3xl font-semibold text-[#696969] dark:text-white tracking-tight">
          Key Features
        </h2>
        <p className="text-[#696969] dark:text-gray-400 max-w-md mx-auto mb-10">
          A seamless way to save, search, and organize your web experience.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 px-5 lg:px-60">
        {features.map((features, index) => (
          <div key={index} className="flex flex-col items-center border-[0.1px] border-[#CECEEA] dark:border-gray-600 text-center p-8">
            <div className="mb-2">
              {features.icon}
            </div>
            <h3 className="text-lg font-semibold">{features.title}</h3>
            <p className="text-sm text-[#696969] mt-1 max-w-xs">
              {features.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
