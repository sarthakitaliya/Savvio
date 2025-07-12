import { useEffect, useState } from "react";
import { FormTabNavigation } from "./FormTabNavigation";
import { CurrentURL } from "./CurrentURL";
import { BookmarkForm } from "./BookmarkForm";
import { getCurrentTab } from "../utils/getCurrentTab";

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
    getCurrentTab()
      .then((tab) => {
        if (tab) {
          setTabInfo({
            title: tab.title || "",
            url: tab.url || "",
            favIconUrl: tab.favIconUrl || "/default-favicon.png",
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching current tab:", error);
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
