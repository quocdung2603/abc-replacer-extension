chrome.commands.onCommand.addListener((command) => {
  if (command === "toggle-replace") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0 && tabs[0].id) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "toggle" },
          (response) => {
            if (chrome.runtime.lastError) {
              console.warn(
                "Content script not found:",
                chrome.runtime.lastError.message
              );
            }
          }
        );
      }
    });
  }
});
