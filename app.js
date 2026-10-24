
"use strict";

const NexusBuddy = (() => {
  const $ = (selector) => document.querySelector(selector);

  function addMessage(text, type = "bot") {
    const chat = $("#chat");
    if (!chat) return;

    const message = document.createElement("div");
    message.className = `msg ${type}`;
    message.textContent = text;
    chat.appendChild(message);
    chat.scrollTop = chat.scrollHeight;
  }

  function setSpeaking(active) {
    const avatar = $(".avatar");
    if (avatar) avatar.classList.toggle("speaking", active);
  }

  function getOfflineReply(text) {
    const value = text.toLowerCase();

    if (/မင်္ဂလာပါ|ဟယ်လို|hello|hi/.test(value)) {
      return "မင်္ဂလာပါ ယဖ ❤️ MYANMAR AI BUDDY က ကြိုဆိုပါတယ်။";
    }

    if (/နာမည်|name/.test(value)) {
      return "ကျွန်တော်က NEXUS MOBILE LAB ရဲ့ MYANMAR AI BUDDY ပါ။";
    }

    if (/အချိန်|time/.test(value)) {
      return "ဖုန်းရဲ့ လက်ရှိအချိန်ကို ကြည့်ပြီး ပြောပေးနိုင်ပါတယ်။";
    }

    if (/ကူညီ|help/.test(value)) {
      return "ယဖ ဘာလုပ်ချင်လဲ စာရေးပေးပါ။ လက်ရှိမှာ Offline စမ်းသပ်စနစ်ကို အသုံးပြုနေပါတယ်။";
    }

    return "ယဖရေ၊ ဒီစာကို လက်ခံရရှိပြီ။ အခု Offline စမ်းသပ်စနစ်ပဲ ရှိသေးလို့ မေးခွန်းအားလုံးကို နားလည်နိုင်တဲ့ AI ကို နောက်အဆင့်မှာ ချိတ်ဆက်ပေးမယ်။";
  }

  function sendMessage(text) {
    const cleanText = text.trim();
    if (!cleanText) return;

    addMessage(cleanText, "user");

    // လက်ရှိအဆင့်မှာ Offline Demo သာဖြစ်သည်။
    const reply = getOfflineReply(cleanText);

    setSpeaking(true);
    window.setTimeout(() => {
      addMessage(reply, "bot");
      setSpeaking(false);
    }, 450);
  }

  function init() {
    const form = $("#form");
    const input = $("#message");

    if (form && input) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        sendMessage(input.value);
        input.value = "";
        input.focus();
      });
    }

    document.querySelectorAll("[data-message]").forEach((button) => {
      button.addEventListener("click", () => {
        sendMessage(button.dataset.message || "");
      });
    });

    console.log("MYANMAR AI BUDDY UI initialized.");
  }

  return { init, sendMessage };
})();

document.addEventListener("DOMContentLoaded", NexusBuddy.init);
