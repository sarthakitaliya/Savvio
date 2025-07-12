import ThemeToggle from "./components/ThemeToggle";
import { SearchBar } from "./components/SearchBar";
import { useState } from "react";
import { TabNavigation } from "./components/TabNavigation";
import { QuickSavePanel } from "./components/QuickSavePanel";
import { BrowsePanel } from "./components/BrowsePanel";

function App() {
  const [activeTab, setActiveTab] = useState<"quick-save" | "browse">(
    "quick-save"
  );
  return (
    <div className="w-80 h-[450px] overflow-y-auto overflow-x-hidden flex flex-col">
      <div className="p-4 bg-white dark:bg-[#2A2A2A] border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Savvio</h1>
          <ThemeToggle />
        </div>
        <SearchBar />
      </div>
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-y-auto">
        {activeTab === "quick-save" && <QuickSavePanel />}
        {activeTab === "browse" && <BrowsePanel />}
      </div>
    </div>
  );
}

export default App;
