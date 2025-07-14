import { useEffect, useState } from "react";
import FloatingBookmarkButton from "./FloatingBookmarkButton";
import type { Folder } from "@prisma/client";

export function ContentPage() {
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "FETCH_FOLDERS" }, (response) => {
      if (response?.folders) {
        setFolders(response.folders);
        console.log("Fetched folders:", response.folders); 
      }
    });
  }, []);
  return <FloatingBookmarkButton folders={folders} />;
}
