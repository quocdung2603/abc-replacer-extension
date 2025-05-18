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

function replaceContentZalo(settings) {
  // A. Tên đoạn hội thoại
  if (settings.zalo_titles) {
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
  if (settings.zalo_messages) {
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
  if (settings.zalo_senderNames) {
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
  if (settings.zalo_messageContent) {
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
  if (settings.zalo_emojis) {
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
  if (settings.zalo_headerTitles) {
    const headerTitles = document.querySelectorAll(".header-title");
    for (let el of headerTitles) {
      if (!originalContents.has(el)) originalContents.set(el, el.textContent);
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
  if (settings.zalo_tags) {
    const subtitleLabels = document.querySelectorAll(".subtitle__label");
    for (let el of subtitleLabels) {
      if (!originalContents.has(el)) originalContents.set(el, el.textContent);
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
  if (settings.zalo_stickers) {
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
  if (settings.zalo_placeholders) {
    const input = document.getElementById("richInput");
    if (input) {
      if (!originalContents.has(input)) {
        originalContents.set(input, input.getAttribute("placeholder") || "");
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
  if (settings.zalo_images) {
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
  if (settings.zalo_files) {
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

function replaceContentMessenger(settings) {
  // LƯU Ý: Các bộ chọn CSS dưới đây là GIẢ ĐỊNH, trừ bộ chọn tiêu đề đã được cung cấp.
  // Bạn cần kiểm tra HTML của Messenger để thay bằng bộ chọn thực tế.

  // A. Tên đoạn hội thoại
  if (settings.messenger_titles) {
    const titleElements = document.querySelectorAll(
      "span.x1lliihq.x193iq5w.x6ikm8r.x10wlt62.xlyipyv.xuxw1ft"
    );
    for (let element of titleElements) {
      if (!originalContents.has(element)) {
        originalContents.set(element, element.textContent);
      }
      element.textContent = "***";
    }
  } else {
    const titleElements = document.querySelectorAll(
      "span.x1lliihq.x193iq5w.x6ikm8r.x10wlt62.xlyipyv.xuxw1ft"
    );
    for (let element of titleElements) {
      if (originalContents.has(element)) {
        element.textContent = originalContents.get(element);
      }
    }
  }

  //B. ẩn nội dung tin nhắn của bản thân
  if (settings.messenger_messageContent1) {
    const messageContent = document.querySelectorAll(
      "div.html-div.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1gslohp.x11i5rnm.x12nagc.x1mh8g0r.x1yc453h.x126k92a.xyk4ms5"
    );
    for (let element of messageContent) {
      if (!originalContents.has(element)) {
        originalContents.set(element, element.textContent);
      }
      element.textContent = "***";
    }
  } else {
    const messageContent = document.querySelectorAll(
      "div.html-div.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1gslohp.x11i5rnm.x12nagc.x1mh8g0r.x1yc453h.x126k92a.xyk4ms5"
    );
    for (let element of messageContent) {
      element.textContent = originalContents.get(element);
    }
  }

  //C. ẩn nội dung tin nhắn của đối phương
  if (settings.messenger_messageContent2) {
    const messageContent1 = document.querySelectorAll(
      "div.html-div.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1gslohp.x11i5rnm.x12nagc.x1mh8g0r.x1yc453h.x126k92a.x18lvrbx"
    );
    for (let element of messageContent1) {
      if (!originalContents.has(element)) {
        originalContents.set(element, element.textContent);
      }
      element.textContent = "***";
    }
  } else {
    const messageContent1 = document.querySelectorAll(
      "div.html-div.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1gslohp.x11i5rnm.x12nagc.x1mh8g0r.x1yc453h.x126k92a.x18lvrbx"
    );
    for (let element of messageContent1) {
      element.textContent = originalContents.get(element);
    }
  }

  //D. ẩn tên người nhận
  if (settings.messenger_senderNames) {
    const senderNames = document.querySelectorAll(
      "a.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.x1heor9g.xkrqix3.x1sur9pj.x1s688f"
    );
    for (let element of senderNames) {
      if (!originalContents.has(element)) {
        originalContents.set(element, element.textContent);
      }
      element.textContent = "***";
    }
  } else {
    const senderNames = document.querySelectorAll(
      "a.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.x1heor9g.xkrqix3.x1sur9pj.x1s688f"
    );
    for (let element of senderNames) {
      element.textContent = originalContents.get(element);
    }
  }

  // E. Ẩn hình ảnh
  if (settings.messenger_messageImage) {
    const mediaContainers = document.querySelectorAll(
      "div.x5yr21d.x17qophe.x10l6tqk.x13vifvy.xh8yej3"
    );
    for (let container of mediaContainers) {
      // Xử lý hình ảnh
      const img = container.querySelector("img");
      if (img) {
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
    }
  } else {
    const mediaContainers = document.querySelectorAll(
      "div.x5yr21d.x17qophe.x10l6tqk.x13vifvy.xh8yej3"
    );
    for (let container of mediaContainers) {
      // Khôi phục hình ảnh
      const img = container.querySelector("img");
      if (img) {
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
  }

  // E. Ẩn hình video
  if (settings.messenger_messageVideo) {
    const mediaContainers = document.querySelectorAll(
      "div.x5yr21d.x1uhb9sk.xh8yej3"
    );
    for (let container of mediaContainers) {
      const video = container.querySelector("video");
      if (video) {
        if (!originalContents.has(video)) {
          originalContents.set(video, {
            src: video.src,
            width: video.style.width,
            height: video.style.height,
          });
        }
        video.style.display = "none";

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
    }
  } else {
    const mediaContainers = document.querySelectorAll(
      "div.x5yr21d.x1uhb9sk.xh8yej3"
    );
    for (let container of mediaContainers) {
      // Khôi phục hình ảnh
      const video = container.querySelector("video");
      if (video) {
        video.style.display = "";
        const placeholder = container.querySelector(".abc-img-placeholder");
        if (placeholder) {
          container.removeChild(placeholder);
        }
        const original = originalContents.get(video);
        if (original) {
          video.src = original.src;
          video.style.width = original.width;
          video.style.height = original.height;
        }
      }
    }
  }
}

function replaceContent() {
  chrome.storage.sync.get(
    [
      "isEnabled",
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
    ],
    function (data) {
      const isEnabled = data.isEnabled !== false;
      const settings = {
        zalo_titles: isEnabled && data.zalo_titles !== false,
        zalo_messages: isEnabled && data.zalo_messages !== false,
        zalo_senderNames: isEnabled && data.zalo_senderNames !== false,
        zalo_messageContent: isEnabled && data.zalo_messageContent !== false,
        zalo_emojis: isEnabled && data.zalo_emojis !== false,
        zalo_headerTitles: isEnabled && data.zalo_headerTitles !== false,
        zalo_tags: isEnabled && data.zalo_tags !== false,
        zalo_stickers: isEnabled && data.zalo_stickers !== false,
        zalo_placeholders: isEnabled && data.zalo_placeholders !== false,
        zalo_images: isEnabled && data.zalo_images !== false,
        zalo_files: isEnabled && data.zalo_files !== false,
        messenger_titles: isEnabled && data.messenger_titles !== false,
        messenger_senderNames:
          isEnabled && data.messenger_senderNames !== false,
        messenger_messageContent1:
          isEnabled && data.messenger_messageContent1 !== false,
        messenger_messageContent2:
          isEnabled && data.messenger_messageContent2 !== false,
        messenger_messageImage:
          isEnabled && data.messenger_messageImage !== false,
        messenger_messageVideo:
          isEnabled && data.messenger_messageVideo !== false,
      };

      const hostname = window.location.hostname;
      if (hostname === "chat.zalo.me") {
        replaceContentZalo(settings);
      } else if (hostname === "www.messenger.com") {
        replaceContentMessenger(settings);
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
