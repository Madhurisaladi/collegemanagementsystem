// emailService.js

import { getFunctions, httpsCallable } from "firebase/functions";

// Initialize Firebase Functions
const functions = getFunctions();

/**
 * Sends an email using Firebase Functions
 * @param {string} toEmail - The recipient's email address
 * @param {string} subject - The subject of the email
 * @param {string} message - The body of the email
 * @returns {Promise} - Resolves with the response from the server
 */
export const sendEmail = async (toEmail, subject, message) => {
  try {
    // Call the Firebase function "sendEmailNotification"
    const sendEmailNotification = httpsCallable(functions, "sendEmailNotification");

    // Pass email details to the cloud function
    const response = await sendEmailNotification({
      toEmail,
      subject,
      message,
    });

    console.log("Email sent successfully:", response.data);
    return response.data; // Return success message
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Re-throw the error for error handling in the calling code
  }
};
