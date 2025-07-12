import { Link, NotebookPen } from "lucide-react";

export function FormTabNavigation({ activeTab, setActiveTab } :{ 
    activeTab: "url" | "note";
    setActiveTab: (tab: "url" | "note") => void;
}) {
  return (
     <div className="mt-4 text-center">
        <button
          onClick={() => setActiveTab("url")}
          className={`px-4 py-2 mr-2 rounded cursor-pointer ${
            activeTab === "url"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          }`}
        >
            <Link/>
          URL
        </button>
        <button
          onClick={() => setActiveTab("note")}
          className={`px-4 py-2 rounded cursor-pointer ${
            activeTab === "note"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          }`}
        >
           <NotebookPen />
          Note
        </button>
      </div>
  );
}
