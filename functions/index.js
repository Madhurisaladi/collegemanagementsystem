const { onRequest, onCall } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const logger = require('firebase-functions/logger');

// Initialize Firebase Admin SDK
admin.initializeApp();

// Set up Nodemailer Transport for Gmail (you can change the email service)
const transporter = nodemailer.createTransport({
  service: 'gmail', // Using Gmail (change it if using another service)
  auth: {
    user: 'lab99894@gmail.com', // Your Gmail address
    pass: 'deeplearning', // Your email password or app password
  },
});

// Cloud Function to send email notifications to students in the selected department
exports.sendEmailNotification = onCall(async (data, context) => {
  const { department, subject, message, attachmentBase64 } = data;

  // Check for missing fields
  if (!department || !subject || !message) {
    throw new functions.https.HttpsError('invalid-argument', 'Department, subject, and message are required');
  }

  try {
    // Query Firestore for students in the selected department
    const snapshot = await admin.firestore()
      .collection('students') // Your Firestore collection
      .where('department', '==', department) // Filter students by department
      .get();

    if (snapshot.empty) {
      throw new Error('No students found in this department.');
    }

    // Prepare email sending for each student
    const emailPromises = snapshot.docs.map((doc) => {
      const student = doc.data();
      const studentEmail = student.email; // Student's email

      const mailOptions = {
        from: 'your-email@gmail.com', // Sender's email address
        to: studentEmail, // Receiver's email address
        subject: subject,
        text: message, // The email body text
        attachments: attachmentBase64
          ? [{
              filename: 'attachment', // Default filename (you can change this)
              content: attachmentBase64, // Base64 encoded attachment
              encoding: 'base64',
            }]
          : [], // No attachment if attachmentBase64 is empty
      };

      return transporter.sendMail(mailOptions);
    });

    // Wait for all email promises to resolve
    await Promise.all(emailPromises);

    return { message: 'Emails sent successfully!' };
  } catch (error) {
    logger.error('Error sending email:', error); // Log the error for debugging
    throw new functions.https.HttpsError('internal', 'Failed to send emails');
  }
});

// Example of a simple HTTP function using v2
exports.helloWorld = onRequest((request, response) => {
  logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});
