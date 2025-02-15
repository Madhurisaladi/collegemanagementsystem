const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const axios = require("axios");
const { GoogleAuth } = require("google-auth-library");

// Load Firebase Service Account JSON
const serviceAccount = require(__dirname + "/serviceaccount.json");

// Prevent multiple Firebase initializations
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Function to get OAuth token for FCM v1 API
async function getAccessToken() {
  try {
    const auth = new GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/firebase.messaging"], // ✅ Correct FCM scope
      keyFilename: __dirname + "/serviceaccount.json",
    });
    const client = await auth.getClient();
    const token = await client.getAccessToken();
    return token.token;
  } catch (error) {
    console.error("Error fetching OAuth token:", error.message);
    throw new Error("Failed to fetch OAuth token");
  }
}

// ✅ API to Send Admin Notifications
app.post("/AdminNotification", async (req, res) => {
  const { title, message } = req.body;

  if (!title || !message) {
    return res.status(400).json({ error: "Title and message are required" });
  }

  try {
    const accessToken = await getAccessToken();
    const projectId = serviceAccount.project_id;

    const payload = {
      message: {
        topic: "students",
        notification: {
          title: title,
          body: message,
        },
      },
    };

    // ✅ Send FCM Notification
    const response = await axios.post(
      `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    // ✅ Store notification in Firestore
    await db.collection("notifications").add({
      title,
      message,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({ success: true, message: "Notification sent successfully!" });
  } catch (error) {
    console.error("Error sending notification:", error.response?.data || error.message);
    res.status(500).json({ error: "Error sending notification" });
  }
});

// ✅ API to Fetch Student Notifications
app.get("/StudentNotification", async (req, res) => {
  try {
    const snapshot = await db.collection("notifications").orderBy("timestamp", "desc").get();
    
    if (snapshot.empty) {
      return res.json({ notifications: [] });
    }

    const notifications = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Error fetching notifications" });
  }
});

// ✅ Server runs on PORT 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
