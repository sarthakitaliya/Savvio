chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.tabs.create({
      url: "http://localhost:3000/login?source=extension",
    });
  }
});

chrome.runtime.onMessageExternal.addListener(
  (message, sender, sendResponse) => {
    console.log("Received message from extension:", message);
    if (chrome.runtime.lastError) {
      console.error("Error receiving message:", chrome.runtime.lastError);
      sendResponse({
        status: "error",
        message: "Failed to receive message.",
      });
      return;
    }
    console.log(sender.origin, "Message from extension:", message);
    
    if (message.token) {
      chrome.storage.sync.set({ token: message.token }, () => {
        console.log("Token saved in extension storage.", message.token);
        sendResponse({
          status: "success",
          message: "Token saved successfully.",
        });
      });
    }

    sendResponse({
      status: "received",
      message: "Message received in background script.",
    });
    return true; // Keep the message channel open for sendResponse
  }
);
