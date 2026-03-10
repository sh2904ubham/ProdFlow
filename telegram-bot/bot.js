const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, { polling: true });

const OPENCLAW_API = "http://openclaw:8080/chat";

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  try {
    const response = await axios.post(OPENCLAW_API, {
      message: text
    });

    bot.sendMessage(chatId, response.data.reply);

  } catch (error) {
    bot.sendMessage(chatId, "Error processing request");
  }
});