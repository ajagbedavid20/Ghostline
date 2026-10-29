const STORAGE_KEY = "ghostline-prototype-v1";

const names = [
  ["Quiet", "Cedar"], ["Silver", "Finch"], ["Gentle", "Ember"], ["Blue", "Willow"],
  ["Still", "Harbor"], ["Soft", "Comet"], ["Hidden", "Fern"], ["Open", "River"]
];

const defaultState = { identity: null, messages: [], blocked: false, expiry: "24 hours" };
let state = loadState();

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const views = $$("[data-view]");
const messageInput = $("#messageInput");
const messageForm = $("#messageForm");
const messages = $("#messages");
const sendButton = messageForm.querySelector("button[type='submit']");
const chatMenuPanel = $("#chatMenuPanel");
const chatMenu = $("#chatMenu");

function loadState() {
  try { return { ...defaultState, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") }; }
  catch { return { ...defaultState }; }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function makeIdentity() {
  const random = new Uint32Array(2);
  crypto.getRandomValues(random);
  const pair = names[random[0] % names.length];
  return { name: `${pair[0]} ${pair[1]}`, initials: `${pair[0][0]}${pair[1][0]}`, id: [...random].map(n => n.toString(36)).join("") };
}

function updateIdentity() {
  if (!state.identity) return;
  $("#identityName").textContent = state.identity.name;
  $("#pillName").textContent = state.identity.name;
  $("#identityAvatar").textContent = state.identity.initials;
}

function showView(name, updateHash = true) {
  views.forEach(view => { view.hidden = view.dataset.view !== name; });
  if (updateHash) history.replaceState(null, "", `#${name}`);
  $("#mainContent").focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (name === "chat") requestAnimationFrame(() => { messages.scrollTop = messages.scrollHeight; });
}

function toast(message) {
  const region = $("#toastRegion");
  region.replaceChildren();
  const item = document.createElement("div");
  item.className = "toast";
  item.setAttribute("role", "status");
  item.textContent = message;
  region.append(item);
  window.setTimeout(() => item.remove(), 4500);
}

function openDialog(dialog) {
  if (typeof dialog.showModal === "function") dialog.showModal();
}

function appendMessage(message, persist = true) {
  const group = document.createElement("div");
  group.className = `message-group ${message.from === "me" ? "outgoing" : "incoming"}`;
  const bubble = document.createElement("div");
  bubble.className = "message-bubble";
  bubble.textContent = message.text;
  const time = document.createElement("time");
  time.textContent = message.time || "now";
  group.append(bubble, time);
  messages.append(group);
  messages.scrollTo({ top: messages.scrollHeight, behavior: "smooth" });
  if (persist) {
    state.messages.push(message);
    saveState();
  }
  $("#conversationPreview").textContent = message.text;
  $("#conversationTime").textContent = "now";
}

function renderSavedMessages() {
  state.messages.forEach(message => appendMessage(message, false));
}

function autoGrow() {
  messageInput.style.height = "auto";
  messageInput.style.height = `${Math.min(messageInput.scrollHeight, 128)}px`;
  sendButton.disabled = !messageInput.value.trim();
}

function receiveDemoReply() {
  const indicator = $("#typingIndicator");
  indicator.hidden = false;
  window.setTimeout(() => {
    indicator.hidden = true;
    const replies = [
      "Thanks for trusting the quiet. What would make this conversation useful for you?",
      "I’m listening. There’s no rush to make it sound polished here.",
      "That makes sense. Do you want a response, or just a place to put it into words?"
    ];
    appendMessage({ from: "moss", text: replies[state.messages.length % replies.length], time: "now" });
  }, 1100);
}

$("#createIdentity").addEventListener("click", () => {
  state.identity = makeIdentity();
  saveState();
  updateIdentity();
  showView("home");
  toast("Private identity created on this device.");
});

$("#rotateIdentity").addEventListener("click", () => {
  state.identity = makeIdentity();
  saveState();
  updateIdentity();
  toast(`You’re now ${state.identity.name}.`);
});

$("#showHow").addEventListener("click", () => openDialog($("#privacyDialog")));
$("#openPrivacy").addEventListener("click", () => openDialog($("#privacyDialog")));

$("#createLink").addEventListener("click", () => {
  const isLocalPreview = location.protocol === "file:" || ["localhost", "127.0.0.1", "::1"].includes(location.hostname);
  const base = location.protocol === "file:" ? "local-preview://ghostline" : `${location.origin}${location.pathname}`;
  const notice = $("#shareabilityNotice");
  const copyButton = $("#copyLink");
  $("#secretLink").value = `${base}?line=${state.identity.id.slice(0, 10)}`;
  notice.hidden = false;
  notice.textContent = isLocalPreview
    ? "Local test only — this address points back to your own device. Publish Ghostline with its messaging backend before sending invitations to another phone."
    : "This address is public, but two-person delivery still requires the Ghostline messaging backend.";
  copyButton.disabled = isLocalPreview;
  copyButton.textContent = isLocalPreview ? "Local only" : "Copy test link";
  openDialog($("#linkDialog"));
});

$("#copyLink").addEventListener("click", async () => {
  const value = $("#secretLink").value;
  try { await navigator.clipboard.writeText(value); }
  catch { $("#secretLink").select(); document.execCommand("copy"); }
  $("#copyLink").textContent = "Copied";
  toast("Test link copied. Live messaging still requires the backend.");
  window.setTimeout(() => { $("#copyLink").textContent = "Copy test link"; }, 1600);
});

$("#openDemoChat").addEventListener("click", () => showView("chat"));
$("#openConversation").addEventListener("click", () => showView("chat"));
$("#backHome").addEventListener("click", () => showView("home"));

chatMenu.addEventListener("click", () => {
  const open = chatMenuPanel.hidden;
  chatMenuPanel.hidden = !open;
  chatMenu.setAttribute("aria-expanded", String(open));
});

document.addEventListener("click", (event) => {
  if (!chatMenuPanel.hidden && !chatMenuPanel.contains(event.target) && !chatMenu.contains(event.target)) {
    chatMenuPanel.hidden = true;
    chatMenu.setAttribute("aria-expanded", "false");
  }
});

$("#reportConversation").addEventListener("click", () => {
  chatMenuPanel.hidden = true;
  chatMenu.setAttribute("aria-expanded", "false");
  $("#reportError").hidden = true;
  openDialog($("#reportDialog"));
});

$("#closeReport").addEventListener("click", () => $("#reportDialog").close());
$("#cancelReport").addEventListener("click", () => $("#reportDialog").close());

$("#leaveConversation").addEventListener("click", () => {
  chatMenuPanel.hidden = true;
  chatMenu.setAttribute("aria-expanded", "false");
  openDialog($("#leaveDialog"));
});

$("#reportForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const selected = $("input[name='reason']:checked");
  if (!selected) {
    $("#reportError").hidden = false;
    $("input[name='reason']").focus();
    return;
  }
  $("#reportError").hidden = true;
  $("#reportDialog").close();
  toast("Report received. Moss has not been notified.");
});

$("#confirmLeave").addEventListener("click", () => {
  state.messages = [];
  state.blocked = true;
  saveState();
  $("#conversationCount").textContent = "No active lines";
  $("#openConversation").hidden = true;
  showView("home");
  toast("Moss was blocked and the local conversation was removed.");
});

$("#changeExpiry").addEventListener("click", () => {
  const options = ["1 hour", "24 hours", "7 days"];
  state.expiry = options[(options.indexOf(state.expiry) + 1) % options.length];
  $("#changeExpiry").textContent = state.expiry;
  saveState();
  toast(`Messages now disappear after ${state.expiry}.`);
});

messageInput.addEventListener("input", autoGrow);
messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
    event.preventDefault();
    messageForm.requestSubmit();
  }
});

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = messageInput.value.trim();
  if (!text) return;
  appendMessage({ from: "me", text, time: "now" });
  messageInput.value = "";
  autoGrow();
  receiveDemoReply();
});

function setOnlineState() { $("#offlineBanner").hidden = navigator.onLine; }
window.addEventListener("online", setOnlineState);
window.addEventListener("offline", setOnlineState);

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}

setOnlineState();
renderSavedMessages();
$("#changeExpiry").textContent = state.expiry;
if (state.blocked) {
  $("#conversationCount").textContent = "No active lines";
  $("#openConversation").hidden = true;
}
if (state.identity) {
  updateIdentity();
  const requested = location.hash.slice(1);
  showView(["home", "chat"].includes(requested) ? requested : "home", false);
} else {
  showView("welcome", false);
}
