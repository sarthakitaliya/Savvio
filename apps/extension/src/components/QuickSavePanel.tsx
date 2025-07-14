import { useEffect, useState } from "react";
import { FormTabNavigation } from "./FormTabNavigation";
import { CurrentURL } from "./CurrentURL";
import { BookmarkForm } from "./BookmarkForm";

export function QuickSavePanel() {
  const [activeTab, setActiveTab] = useState<"url" | "note">("url");
  const [tabInfo, setTabInfo] = useState<{
    title: string;
    url: string;
    favIconUrl?: string;
  }>({
    title: "",
    url: "",
  });

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "GET_CURRENT_TAB" }, (response) => {
      if (response.tab) {
        setTabInfo({
          title: response.tab.title || "Untitled",
          url: response.tab.url || "No URL available",
          favIconUrl: response.tab.favIconUrl || "/default-favicon.png",
        });
      }

      if (chrome.runtime.lastError) {
        console.error("Error getting current tab:", chrome.runtime.lastError);
      }
    });
  }, []);

  return (
    <div className="p-4">
      <CurrentURL tabInfo={tabInfo} />
      <FormTabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <BookmarkForm activeTab={activeTab} tabInfo={tabInfo} />
    </div>
  );
}
