import ThemeToggle from "./components/ThemeToggle";
import { SearchBar } from "./components/SearchBar";
import { useState } from "react";
import { TabNavigation } from "./components/TabNavigation";

function App() {
  const [activeTab, setActiveTab] = useState<"quick-save" | "browse">(
    "quick-save"
  );
  return (
    <div className="w-80 h-96 overflow-y-auto overflow-x-hidden flex flex-col">
      <div className="p-4 bg-white dark:bg-[#2A2A2A] border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Savvio</h1>
          <ThemeToggle />
        </div>
        <SearchBar />
      </div>
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
