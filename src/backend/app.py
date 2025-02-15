
from flask import Flask, jsonify, request
from flask_mail import Mail, Message
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)  # Allow CORS for frontend integration

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'lab99894@gmail.com'  # Replace with your email
app.config['MAIL_PASSWORD'] = 'deeplearning'  # Use an App Password
app.config['MAIL_DEFAULT_SENDER'] = 'yeswar45@gmail.com'

mail = Mail(app)

@app.route("/send_email", methods=["POST"])
def send_email():
    try:
        # Get form data from request
        subject = request.form.get("subject", "Notification")
        message_body = request.form.get("message", "No Message")
        emails_json = request.form.get("emails", "[]")
        emails = json.loads(emails_json)  # Convert JSON string to list

        if not emails:
            return jsonify({"error": "No emails received from frontend!"}), 400

        # Send email to all students
        msg = Message(subject, recipients=emails, body=message_body)

        # Handle file attachment
        file = request.files.get("attachment")
        if file:
            file_path = f"temp/{file.filename}"
            file.save(file_path)
            with open(file_path, "rb") as f:
                msg.attach(file.filename, file.content_type, f.read())
            os.remove(file_path)  # Delete file after sending

        mail.send(msg)
        return jsonify({"success": True, "message": f"Email sent to {len(emails)} students"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
