export function TabNavigation({
  activeTab,
  setActiveTab,
}: {
  activeTab: "quick-save" | "browse";
  setActiveTab: (tab: "quick-save" | "browse") => void;
}) {
  return (
    <div className="flex border-b border-gray-200 dark:border-gray-700 shadow">
      <button
        onClick={() => setActiveTab("quick-save")}
        className={`flex-1 py-2 px-4 text-sm font-medium border-b-2 cursor-pointer ${
          activeTab === "quick-save"
            ? "border-blue-500 text-blue-600"
            : "border-transparent text-gray-500 hover:text-gray-700"
        }`}
      >
        Quick Save
      </button>
      <button
        onClick={() => setActiveTab("browse")}
        className={`flex-1 py-2 px-4 text-sm font-medium border-b-2 cursor-pointer ${
          activeTab === "browse"
            ? "border-blue-500 text-blue-600"
            : "border-transparent text-gray-500 hover:text-gray-700"
        }`}
      >
        Browse
      </button>
    </div>
  );
}
