"use strict";

const MiyaBuddy = (() => {
  const $ = (selector) => document.querySelector(selector);

  function addMessage(text, type = "bot") {
    const chat = $("#chat");
    if (!chat) return;

    if (type === "bot") {
      const row = document.createElement("div");
      row.className = "message-row";
      const avatar = document.createElement("img");
      avatar.className = "mini-avatar";
      avatar.src = "assets/miya-avatar.svg";
      avatar.alt = "Miya";
      const message = document.createElement("div");
      message.className = "msg bot";
      message.textContent = text;
      row.append(avatar, message);
      chat.appendChild(row);
    } else {
      const message = document.createElement("div");
      message.className = "msg user";
      message.textContent = text;
      chat.appendChild(message);
    }
    chat.scrollTop = chat.scrollHeight;
  }

  function getOfflineReply(text) {
    const value = text.toLowerCase();

    if (/မင်္ဂလာပါ|ဟယ်လို|hello|hi/.test(value)) {
      return "မင်္ဂလာပါရှင့် 💙 Miya ပါ။ ဘာကူညီပေးရမလဲရှင့်။";
    }
    if (/နာမည်|name/.test(value)) {
      return "ကျွန်မနာမည်က Miya ပါရှင့်။ ယဉ်ယဉ်ကျေးကျေး ကူညီပေးဖို့ အသင့်ရှိပါတယ်။";
    }
    if (/ကူညီနိုင်|ဘာလုပ်|help/.test(value)) {
      return "စာရေးသားပေးတာ၊ ဘာသာပြန်တာ၊ ကုဒ်ရေးတာနဲ့ လေ့လာရေးတွေမှာ ကူညီပေးနိုင်ပါတယ်ရှင့်။ လက်ရှိမှာ Offline Demo ဖြစ်လို့ အဖြေတွေက အကန့်အသတ်ရှိပါသေးတယ်။";
    }
    if (/ကျေးဇူး/.test(value)) {
      return "ရပါတယ်ရှင့် 💙 ကူညီပေးရတာ ဝမ်းသာပါတယ်။ နောက်ထပ် ဘာလုပ်ပေးရမလဲရှင့်။";
    }
    if (/အချိန်|time/.test(value)) {
      return "ဖုန်းမှာ ပြထားတဲ့ လက်ရှိအချိန်ကို ကြည့်နိုင်ပါတယ်ရှင့်။ ဒီ Demo မှာတော့ ဖုန်းအချိန်ကို တိုက်ရိုက်မဖတ်နိုင်သေးပါဘူး။";
    }
    return "နားလည်အောင် ကြိုးစားနေပါတယ်ရှင့် 💙 လက်ရှိ Miya က Offline Demo ဖြစ်လို့ မေးခွန်းတိုင်းကို မဖြေနိုင်သေးပါဘူး။ Online AI ချိတ်ဆက်တဲ့အခါ ပိုပြီးကောင်းကောင်း ကူညီနိုင်ပါမယ်ရှင့်။";
  }

  function sendMessage(text) {
    const cleanText = text.trim();
    if (!cleanText) return;
    addMessage(cleanText, "user");
    const reply = getOfflineReply(cleanText);
    window.setTimeout(() => addMessage(reply, "bot"), 350);
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
      button.addEventListener("click", () => sendMessage(button.dataset.message || ""));
    });
    console.log("MIYA — MYANMAR AI BUDDY initialized.");
  }

  return { init, sendMessage };
})();

document.addEventListener("DOMContentLoaded", MiyaBuddy.init);
