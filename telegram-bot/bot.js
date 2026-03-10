const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

// Read tokens and API URLs from environment
const token = process.env.TELEGRAM_TOKEN;
const OPENCLAW_API = process.env.OPENCLAW_API + "/chat";
const BACKEND_API = process.env.BACKEND_API;

if (!token) {
  console.error("ERROR: TELEGRAM_TOKEN not found in environment");
  process.exit(1);
}

// Initialize bot
const bot = new TelegramBot(token, { polling: true });

// /start command
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    // Check backend health
    const backendHealth = await axios.get(`${BACKEND_API}/api/health`);
    
    // Check OpenClaw
    await axios.get(process.env.OPENCLAW_API);

    bot.sendMessage(chatId, "Bot is running ✅\nBackend: OK\nOpenClaw: OK");
  } catch (err) {
    bot.sendMessage(chatId, `Error contacting APIs ❌\n${err.message}`);
  }
});

// All other messages → OpenClaw
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Ignore /start because we already handled it
  if (text.startsWith("/start")) return;

  try {
    const response = await axios.post(OPENCLAW_API, { message: text });
    bot.sendMessage(chatId, response.data.reply || "No reply from OpenClaw");
  } catch (error) {
    console.error("OpenClaw request failed:", error.message);
    bot.sendMessage(chatId, "Error processing request ❌");
  }
});