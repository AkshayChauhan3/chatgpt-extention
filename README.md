# 🧭 ChatGPT Scroll Marker

> *Never lose your place in a long ChatGPT conversation again.*

Ever had a 50-message conversation and needed to jump back to **that one question** you asked 30 minutes ago? Scrolling endlessly, searching blindly... painful. 😩

**ChatGPT Scroll Marker fixes that.** It adds a sleek mini-scrollbar on the right edge of the page — with glowing dots for every question **you** asked. Hover to preview. Click to teleport. Done. ✨

---

## ✨ Features

| Feature | What it does |
|---|---|
| 🟢 **Dot markers** | Every question you asked = one glowing teal dot on the right rail |
| 🔢 **Numbered** | Hover a dot → see `Q1`, `Q2`… so you always know which question it is |
| 👁️ **Preview on hover** | See a snippet of your question without scrolling anywhere |
| 🚀 **Click to jump** | Click any dot → smoothly scrolls straight to that message |
| ✨ **Highlight flash** | The target message pulses with a teal outline so you can't miss it |
| 🔁 **Auto-updates** | New messages? Markers update instantly as the conversation grows |
| ⚡ **Zero config** | Opens automatically every time you visit — no buttons, no setup |

---

## 🌐 Supported Platforms

| Platform | URL | Status |
|---|---|---|
| 💬 ChatGPT | chatgpt.com | ✅ Supported |
| 🟣 Claude | claude.ai | 🚧 Seeking PRs! |
| 🔵 Gemini | gemini.google.com | 🚧 Seeking PRs! |
| 🟡 Perplexity | perplexity.ai | 🚧 Seeking PRs! |

---

## 🚀 Install in 30 Seconds

> **No Chrome Web Store needed.** Load it directly — it's just 3 files.

1. Open Chrome and go to **`chrome://extensions`**
2. Toggle **Developer Mode** ON (top-right corner)
3. Click **"Load unpacked"**
4. Select the `chatgpt-extention` folder
5. Open [chatgpt.com](https://chatgpt.com) — the marker rail appears automatically 🎉

---

## 🎮 How to Use

```
Open any conversation on ChatGPT
        ↓
Look at the right edge of the screen → thin glowing rail appears
        ↓
Each green dot = one question you asked
        ↓
Hover a dot → preview pops up with your question text + Q-number badge
        ↓
Click a dot → page smoothly scrolls to that exact message
        ↓
The message flashes teal so you spot it instantly ✅
```

---

## 🛠️ Tech Stack

- **Manifest V3** Chrome Extension
- Vanilla JS + CSS — zero dependencies, zero bloat
- Glassmorphism UI with `backdrop-filter` blur
- `MutationObserver` for real-time updates
- `requestAnimationFrame` debounce for smooth performance

---

## 📁 Project Structure

```
chatgpt-extention/
├── manifest.json   # Extension config & permissions
├── content.js      # Core logic — markers, scroll, tooltips
├── styles.css      # Minimal glassmorphism UI
└── README.md       # You're here!
```

---

## 🔒 Permissions

| Permission | Why |
|---|---|
| `activeTab` | Read the current ChatGPT page to find your messages |
| `scripting` | Inject the marker rail into the page |

> 🛡️ **No data is collected, stored, or sent anywhere.** Everything runs locally in your browser.

---

## 💡 Tips

- Works best in **long conversations** (10+ messages)
- If markers don't appear, **reload the ChatGPT tab** after installing
- Dots are proportionally spaced — first dot at top, last at bottom

---

## 🤝 Contribute

This project is open for contributions! **The #1 requested feature right now is adding support for other AI platforms.**

| Idea | Description |
|---|---|
| 🆘 **Claude Support** | We need a DOM selector for user messages on `claude.ai` |
| 🆘 **Gemini Support** | We need a DOM selector for user messages on `gemini.google.com` |
| 🆘 **Perplexity Support**| We need a DOM selector for user messages on `perplexity.ai` |
| 🎨 **Themes** | Light mode, custom colors, brand-matching themes per platform |
| 🐛 **Bug fix** | Something not working on your setup? Fix it and share! |
| ⚡ **Performance** | Smarter DOM diffing, fewer redraws |
| 🌍 **RTL support** | Move the rail to the left for right-to-left language users |

### How to contribute

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Make your change in `content.js` or `styles.css`
4. Test it by loading unpacked in Chrome
5. Open a Pull Request with a short description 🚀

> 💡 **Tip for new platforms:** In `manifest.json`, add the URL to `matches`. In `content.js`, the `findScrollContainer()` function auto-detects the scroll area — but you may need to tweak the user message selector (`[data-message-author-role="user"]`) to match the platform's DOM.

---

<div align="center">
  Made with ❤️ for people who think in long conversations.<br/>
  <sub>Star ⭐ the repo if this saved you a scroll!</sub>
</div>
