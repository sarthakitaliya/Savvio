const WEB_APP_URL = import.meta.env.VITE_WEB_APP_URL;

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.tabs.create({
      url: `${WEB_APP_URL}/login?source=extension`,
    });
  }
});