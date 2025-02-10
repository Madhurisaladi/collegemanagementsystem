const express = require("express");
const cors = require("cors");
const { sendNotification } = require("./sendNotification");

const app = express();
app.use(express.json());

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:3000", // Allow frontend (React) requests
  methods: "GET,POST",
  allowedHeaders: "Content-Type",
};
app.use(cors(corsOptions));

app.post("/AdminNotification", async (req, res) => {
  const { fcmToken, title, body } = req.body;

  if (!fcmToken) {
    return res.status(400).json({ error: "FCM token is required" });
  }

  try {
    await sendNotification(fcmToken, title, body);
    res.status(200).json({ success: "Notification sent!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send notification" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
