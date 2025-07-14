import { useEffect, useState } from "react";
import FloatingBookmarkButton from "./FloatingBookmarkButton";
import type { Folder } from "@prisma/client";

export function ContentPage() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "FETCH_FOLDERS" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Runtime error:", chrome.runtime.lastError.message);
        setNotification({
          message: "Could not communicate with background script.",
          type: "error",
        });
        return;
      }

      if (response?.folders) {
        setFolders(response.folders);
      } else if (response?.error) {
        console.error("Background error:", response.error);
        setNotification({
          message: response.error,
          type: "error",
        });
      }
    });
  }, []);

  return <FloatingBookmarkButton folders={folders} notification={notification} setNotification={setNotification} />;
}
