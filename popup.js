document.addEventListener("DOMContentLoaded", () => {
  const settingsKeys = [
    "zalo_titles",
    "zalo_messages",
    "zalo_senderNames",
    "zalo_messageContent",
    "zalo_emojis",
    "zalo_headerTitles",
    "zalo_tags",
    "zalo_stickers",
    "zalo_placeholders",
    "zalo_images",
    "zalo_files",
    "messenger_titles",
    "messenger_senderNames",
    "messenger_messageContent1",
    "messenger_messageContent2",
    "messenger_messageImage",
    "messenger_messageVideo",
  ];

  // Lấy URL của tab hiện tại để xác định Zalo hay Messenger
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0 && tabs[0].url) {
      const url = new URL(tabs[0].url);
      const zaloSettings = document.getElementById("zalo-settings");
      const messengerSettings = document.getElementById("messenger-settings");

      // Hiển thị phần cài đặt dựa trên hostname
      if (url.hostname === "chat.zalo.me") {
        zaloSettings.classList.remove("hidden");
        messengerSettings.classList.add("hidden");
      } else if (url.hostname === "www.messenger.com") {
        messengerSettings.classList.remove("hidden");
        zaloSettings.classList.add("hidden");
      } else {
        // Nếu không phải Zalo hay Messenger, hiển thị cả hai (tình huống dự phòng)
        zaloSettings.classList.remove("hidden");
        messengerSettings.classList.remove("hidden");
      }
    }

    // Tải cài đặt hiện tại
    chrome.storage.sync.get(settingsKeys, (data) => {
      settingsKeys.forEach((key) => {
        const checkbox = document.getElementById(key);
        checkbox.checked = data[key] !== false; // Mặc định là bật nếu chưa cài đặt
      });
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
