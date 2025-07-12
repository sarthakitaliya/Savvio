import { useState } from "react";
import { FormTabNavigation } from "./FormTabNavigation";
import { CurrentURL } from "./CurrentURL";
import { BookmarkForm } from "./BookmarkForm";

export function QuickSavePanel() {
  const [activeTab, setActiveTab] = useState<"url" | "note">("url");
  return (
    <div className="p-4">
      <CurrentURL />
      <FormTabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <BookmarkForm activeTab={activeTab} />
    </div>
  );
}
