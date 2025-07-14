const WEB_APP_URL = import.meta.env.VITE_WEB_APP_URL;
import { getFolders } from "@repo/api-client";

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.tabs.create({
      url: `${WEB_APP_URL}/login?source=extension`,
    });
  }
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === "FETCH_FOLDERS") {
    getFolders()
      .then((res) => {
        sendResponse({ folders: res.folders });
      })
      .catch((error) => {
        console.error("Error fetching folders:", error);
      });
    return true;
  }
});
