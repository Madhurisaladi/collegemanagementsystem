import React, { useState } from "react";
import './notification.css';  // Assuming you have your CSS for styling

const NotificationPage = () => {
  const [department, setDepartment] = useState("");  // The selected department
  const [subject, setSubject] = useState("");  // The email subject
  const [message, setMessage] = useState("");  // The email body
  const [attachment, setAttachment] = useState(null);  // Store the selected attachment file
  const [loading, setLoading] = useState(false);  // Loading state to show during sending
  const [success, setSuccess] = useState("");  // Success message
  const [error, setError] = useState("");  // Error message

  // List of departments
  const departments = [
    { value: "cse", label: "Computer Science and Engineering" },
    { value: "ece", label: "Electronics and Communication Engineering" },
    { value: "eee", label: "Electrical and Electronics Engineering" },
    { value: "mech", label: "Mechanical Engineering" },
    { value: "civil", label: "Civil Engineering" },
  ];

  // Handle department selection
  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);  // Set the selected department
  };

  // Handle file attachment change
  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);  // Store the file object
  };

  // Handle form submission
  const handleSendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // For now, just logging the values to make sure everything works
    console.log("Department:", department);
    console.log("Subject:", subject);
    console.log("Message:", message);
    console.log("Attachment:", attachment);

    // Simulate email sending delay
    setTimeout(() => {
      setLoading(false);
      setSuccess("Email sent successfully!");
    }, 2000);
  };

  return (
    <div className="notification-page">
      <h1>Send Notifications</h1>
      <form onSubmit={handleSendEmail}>
        {/* Department Dropdown */}
        <div className="form-group">
          <label htmlFor="department">Select Department:</label>
          <select
            id="department"
            value={department}
            onChange={handleDepartmentChange}
            required
          >
            <option value="" disabled>Select a department</option>
            {departments.map((dept) => (
              <option key={dept.value} value={dept.value}>
                {dept.label}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Field */}
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        {/* Message Field */}
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
            required
          ></textarea>
        </div>

        {/* File Attachment */}
        <div className="form-group">
          <label htmlFor="attachment">Attachment (optional):</label>
          <input type="file" id="attachment" onChange={handleFileChange} />
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Notification"}
        </button>
      </form>

      {/* Success/Error Messages */}
      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default NotificationPage;
