const originalContents = new Map();

function showNotification(message) {
  const existingNotification = document.getElementById(
    "abc-replacer-notification"
  );
  if (existingNotification) existingNotification.remove();

  const notification = document.createElement("div");
  notification.id = "abc-replacer-notification";
  notification.textContent = message;

  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: "5px",
    zIndex: "9999",
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  });

  document.body.appendChild(notification);

  setTimeout(() => notification.remove(), 1000);
}

function replaceContent() {
  chrome.storage.sync.get(
    [
      "isEnabled",
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
    ],
    function (data) {
      const isEnabled = data.isEnabled !== false; // Bật/tắt toàn bộ
      const settings = {
        titles: isEnabled && data.titles !== false,
        messages: isEnabled && data.messages !== false,
        senderNames: isEnabled && data.senderNames !== false,
        messageContent: isEnabled && data.messageContent !== false,
        emojis: isEnabled && data.emojis !== false,
        headerTitles: isEnabled && data.headerTitles !== false,
        tags: isEnabled && data.tags !== false,
        stickers: isEnabled && data.stickers !== false,
        placeholders: isEnabled && data.placeholders !== false,
        images: isEnabled && data.images !== false,
        files: isEnabled && data.files !== false,
      };

      // A. Tên đoạn hội thoại
      if (settings.titles) {
        const titleElements = document.querySelectorAll(
          ".conv-item-title__name.truncate.grid-item .truncate"
        );
        for (let element of titleElements) {
          if (!originalContents.has(element)) {
            originalContents.set(element, element.textContent);
          }
          element.textContent = "***";
        }
      } else {
        const titleElements = document.querySelectorAll(
          ".conv-item-title__name.truncate.grid-item .truncate"
        );
        for (let element of titleElements) {
          if (originalContents.has(element)) {
            element.textContent = originalContents.get(element);
          }
        }
      }

      // B. Nội dung tin nhắn mới nhất (xem nhanh)
      if (settings.messages) {
        const messageElements = document.querySelectorAll(
          ".conv-message.truncate .truncate > span"
        );
        for (let element of messageElements) {
          if (!originalContents.has(element)) {
            originalContents.set(element, element.textContent);
          }
          element.textContent = "***";
        }
      } else {
        const messageElements = document.querySelectorAll(
          ".conv-message.truncate .truncate > span"
        );
        for (let element of messageElements) {
          if (originalContents.has(element)) {
            element.textContent = originalContents.get(element);
          }
        }
      }

      // C. Tên người gửi
      if (settings.senderNames) {
        const personName = document.querySelectorAll(
          ".conv-message.truncate .conv-dbname"
        );
        for (let element of personName) {
          if (!originalContents.has(element)) {
            originalContents.set(element, element.textContent);
          }
          element.textContent = "***";
        }
      } else {
        const personName = document.querySelectorAll(
          ".conv-message.truncate .conv-dbname"
        );
        for (let element of personName) {
          if (originalContents.has(element)) {
            element.textContent = originalContents.get(element);
          }
        }
      }

      // D. Nội dung tin nhắn
      if (settings.messageContent) {
        const messageTexts = document.querySelectorAll(
          ".text-message__container .text"
        );
        for (let element of messageTexts) {
          if (!originalContents.has(element)) {
            originalContents.set(element, element.textContent);
          }
          element.textContent = "***";
        }
      } else {
        const messageTexts = document.querySelectorAll(
          ".text-message__container .text"
        );
        for (let element of messageTexts) {
          if (originalContents.has(element)) {
            element.textContent = originalContents.get(element);
          }
        }
      }

      // E. Emoji trong tin nhắn
      if (settings.emojis) {
        const emojiElements = document.querySelectorAll(".emoji-sizer");
        for (let span of emojiElements) {
          if (!originalContents.has(span)) {
            originalContents.set(span, span.textContent);
          }
          span.style.backgroundImage = "none";
          span.style.backgroundPosition = "initial";
          span.style.backgroundSize = "initial";
          span.style.webkitUserDrag = "none";
          span.style.margin = "0";
          span.textContent = "*";
        }
      } else {
        const emojiElements = document.querySelectorAll(".emoji-sizer");
        for (let span of emojiElements) {
          if (originalContents.has(span)) {
            span.textContent = originalContents.get(span);
            span.style.backgroundImage = "";
            span.style.backgroundPosition = "";
            span.style.backgroundSize = "";
            span.style.margin = "";
          }
        }
      }

      // F. Ẩn / thay thế tên người đang nhắn tin
      if (settings.headerTitles) {
        const headerTitles = document.querySelectorAll(".header-title");
        for (let el of headerTitles) {
          if (!originalContents.has(el))
            originalContents.set(el, el.textContent);
          el.textContent = "***";
        }
      } else {
        const headerTitles = document.querySelectorAll(".header-title");
        for (let el of headerTitles) {
          if (originalContents.has(el)) {
            el.textContent = originalContents.get(el);
          }
        }
      }

      // G. Ẩn / thay thế phần thẻ tag
      if (settings.tags) {
        const subtitleLabels = document.querySelectorAll(".subtitle__label");
        for (let el of subtitleLabels) {
          if (!originalContents.has(el))
            originalContents.set(el, el.textContent);
          el.textContent = "***";
        }
      } else {
        const subtitleLabels = document.querySelectorAll(".subtitle__label");
        for (let el of subtitleLabels) {
          if (originalContents.has(el)) {
            el.textContent = originalContents.get(el);
          }
        }
      }

      // Thay thế sticker
      if (settings.stickers) {
        const stickers = document.querySelectorAll(".sticker-message");
        for (let el of stickers) {
          if (!originalContents.has(el))
            originalContents.set(el, {
              backgroundImage: el.style.backgroundImage,
              width: el.style.width,
              height: el.style.height,
              content: el.textContent,
            });
          el.style.backgroundImage = "none";
          el.style.width = "auto";
          el.style.height = "auto";
          el.textContent = "*sticker*";
        }
      } else {
        const stickers = document.querySelectorAll(".sticker-message");
        for (let el of stickers) {
          const original = originalContents.get(el);
          if (original) {
            el.style.backgroundImage = original.backgroundImage;
            el.style.width = original.width;
            el.style.height = original.height;
            el.textContent = original.content;
          }
        }
      }

      // Thay nội dung người nhận trong placeholder
      if (settings.placeholders) {
        const input = document.getElementById("richInput");
        if (input) {
          if (!originalContents.has(input)) {
            originalContents.set(
              input,
              input.getAttribute("placeholder") || ""
            );
          }
          const original = input.getAttribute("placeholder") || "";
          const replaced = original.replace(/(tới\s+).+$/, "$1***");
          input.setAttribute("placeholder", replaced);
        }
      } else {
        const input = document.getElementById("richInput");
        if (input && originalContents.has(input)) {
          const original = originalContents.get(input);
          input.setAttribute("placeholder", original);
        }
      }

      // H. Thay thế hình ảnh trong tin nhắn
      if (settings.images) {
        const imageContainers = document.querySelectorAll(".img-center-box");
        for (let container of imageContainers) {
          const img = container.querySelector("img");
          if (!img) continue;

          if (!originalContents.has(img)) {
            originalContents.set(img, {
              src: img.src,
              width: img.style.width,
              height: img.style.height,
            });
          }

          img.style.display = "none";

          let placeholder = container.querySelector(".abc-img-placeholder");
          if (!placeholder) {
            placeholder = document.createElement("div");
            placeholder.className = "abc-img-placeholder";
            placeholder.textContent = "***";
            placeholder.style.cssText = `
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #ddd;
              color: #333;
              font-weight: bold;
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
              z-index: 10;
            `;
            container.style.position = "relative";
            container.appendChild(placeholder);
          }
        }
      } else {
        const imageContainers = document.querySelectorAll(".img-center-box");
        for (let container of imageContainers) {
          const img = container.querySelector("img");
          if (!img) continue;

          img.style.display = "";

          const placeholder = container.querySelector(".abc-img-placeholder");
          if (placeholder) {
            container.removeChild(placeholder);
          }

          const original = originalContents.get(img);
          if (original) {
            img.src = original.src;
            img.style.width = original.width;
            img.style.height = original.height;
          }
        }
      }

      // Ẩn hiện tên file
      if (settings.files) {
        const fileTitleElements = document.querySelectorAll(
          ".file-message__content-title"
        );
        for (let el of fileTitleElements) {
          if (!originalContents.has(el)) {
            originalContents.set(el, el.innerHTML);
          }
          el.innerHTML = "***";
        }
      } else {
        const fileTitleElements = document.querySelectorAll(
          ".file-message__content-title"
        );
        for (let el of fileTitleElements) {
          if (originalContents.has(el)) {
            el.innerHTML = originalContents.get(el);
          }
        }
      }
    }
  );
}

document.addEventListener("DOMContentLoaded", function () {
  replaceContent();

  const observer = new MutationObserver((mutations) => {
    const shouldReplace = mutations.some(
      (mutation) => mutation.addedNodes.length
    );
    if (shouldReplace) replaceContent();
  });

  observer.observe(document.body, { childList: true, subtree: true });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggle") {
    chrome.storage.sync.get(["isEnabled"], (data) => {
      const newState = !data.isEnabled;
      chrome.storage.sync.set({ isEnabled: newState }, () => {
        showNotification(
          newState ? "Đã bật ABC Replacer" : "Đã tắt ABC Replacer"
        );
        replaceContent();
      });
    });
  } else if (request.action === "updateSettings") {
    replaceContent();
  }
});
