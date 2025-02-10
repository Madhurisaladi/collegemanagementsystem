import { messaging, getToken, onMessage } from "../firebase";

export const requestForToken = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: "BPBOj-2AHwPoxiHdm7lqxTDWrbbeTmhlNBnmulTcj9nY", // Replace with your actual VAPID Key
    });

    if (token) {
      console.log("FCM Token:", token);
      return token;
    } else {
      console.log("No token received.");
    }
  } catch (error) {
    console.error("Error fetching FCM token:", error);
  }
};

// Listen for foreground messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Foreground Notification:", payload);
      resolve(payload);
    });
  });
