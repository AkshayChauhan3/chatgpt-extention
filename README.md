# 🧭 Prompt Marks v2.0

> *Jump between your ChatGPT messages instantly — fully optimized for ChatGPT.*

Ever lost track of a question you asked 20 messages ago? **Prompt Marks fixes that.** Click the floating button to see all your sent messages, then jump to any question with one click.

## ✨ Features

- 💬 **Floating Button** — Click to see all your sent messages
- 📝 **Message List** — Numbered list with preview of each message
- 🚀 **One-Click Jump** — Click any message → instantly scroll to it
- ⚡ **Smooth Animation** — Beautiful scroll effect to target message
- ✨ **Highlight Flash** — Target message glows so you can find it
- 🔁 **Real-Time Updates** — Auto-updates as new messages arrive

## v2.0 Updates

**Fully optimized for ChatGPT:**
- Fixed scroll accuracy issues
- Fixed auto-scroll bug
- Faster message detection
- Better click-to-jump reliability
- Improved event handling

## 🚀 Install (30 seconds)

1. Open Chrome → `chrome://extensions`
2. Enable **Developer Mode** (top-right)
3. Click **"Load unpacked"**
4. Select this folder
5. Visit ChatGPT → the 💬 button appears!

## How to Use

1. Click the 💬 button (bottom-right)
2. See your sent messages as a list
3. Click any message → scroll to it
4. Done! ✨

## 🔒 Privacy

No data collection. Everything runs locally in your browser.

---

## 🤝 Contribute for Other Platforms

**Help us add support for:**
- 🟣 **Claude** (Anthropic)
- 🔵 **Gemini** (Google)
- 📓 **Notebook LM**
- 🔎 **Perplexity**
- *...and more!*

### How to Add a Platform

1. **Find the CSS selector** for user messages on that platform
   - Open the platform in Chrome
   - Press F12 (DevTools)
   - Right-click a user message → "Inspect"
   - Note the selector (e.g., `.user-message`, `[data-role="user"]`, etc.)

2. **Test the selector**
   - Copy this to your DevTools console:
   ```javascript
   document.querySelectorAll('YOUR_SELECTOR_HERE')
   ```
   - Make sure it returns all user messages

3. **Update the code**
   - Edit `content.js`
   - Find the `getUserMessages()` function
   - Add your selector to the selectors array
   - Update `manifest.json` to include the platform URL

4. **Test thoroughly**
   - Load the unpacked extension
   - Test on that platform
   - Verify messages load and clicking works

5. **Submit a PR**
   - Include: platform name, CSS selector, testing notes
   - Reference the selector findings in your PR description

### Example PR Title

```
feat: Add Claude support with proper message selectors
```

**Your contribution will help thousands of users!** 🎉


