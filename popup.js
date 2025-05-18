document.addEventListener("DOMContentLoaded", () => {
  const settingsKeys = [
    "titles",
    "messages",
    "senderNames",
    "messageContent",
    "emojis",
    "headerTitles",
    "tags",
    "stickers",
    "placeholders",
    "images",
    "files",
  ];

  // Tải cài đặt hiện tại
  chrome.storage.sync.get(settingsKeys, (data) => {
    settingsKeys.forEach((key) => {
      const checkbox = document.getElementById(key);
      checkbox.checked = data[key] !== false; // Mặc định là bật nếu chưa cài đặt
    });
  });

  // Lưu cài đặt
  document.getElementById("save").addEventListener("click", () => {
    const settings = {};
    settingsKeys.forEach((key) => {
      settings[key] = document.getElementById(key).checked;
    });

    chrome.storage.sync.set(settings, () => {
      // Thông báo cho content.js để cập nhật trang
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0 && tabs[0].id) {
          chrome.tabs.sendMessage(
            tabs[0].id,
            { action: "updateSettings" },
            (response) => {
              if (chrome.runtime.lastError) {
                console.warn(
                  "Không tìm thấy content script:",
                  chrome.runtime.lastError.message
                );
              }
            }
          );
        }
      });
      window.close(); // Đóng popup sau khi lưu
    });
  });
});
