import { useState } from "react";
import { storage, db } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./AdminNotification.css";


const AdminNotification = () => {
  const [subject, setSubject] = useState("");
  const [info, setInfo] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");
  const [semester, setSemester] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const departments = ["CSE", "ECE", "MECH", "CIVIL"];
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
  const sections = ["A", "B"];
  const semesters = ["1st Semester", "2nd Semester"];
  const categories = ["General", "Events", "Results", "Attendance Reports"];

  const handleUpload = async () => {
    if (!subject || !info || !department || !year || !section || !semester || !category) {
      alert("All fields are required except file!");
      return;
    }

    setLoading(true);
    setSuccess(false);
    setProgress(0);

    let fileURL = "";
    if (file) {
      const fileRef = ref(storage, `notifications/${department}/${year}/${section}/${semester}/${category}/${file.name}`);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progressPercent);
        },
        (error) => {
          console.error("Upload error:", error);
          alert("File upload failed! Check console for details.");
          setLoading(false);
        },
        async () => {
          fileURL = await getDownloadURL(uploadTask.snapshot.ref);
          await saveNotification(fileURL);
        }
      );
    } else {
      await saveNotification(fileURL);
    }
  };

  const saveNotification = async (fileURL) => {
    await addDoc(collection(db, "notifications"), {
      subject,
      info,
      department,
      year,
      section,
      semester,
      category,
      fileURL,
      timestamp: serverTimestamp(),
    });

    setSuccess(true);
    setLoading(false);
    setSubject("");
    setInfo("");
    setDepartment("");
    setYear("");
    setSection("");
    setSemester("");
    setCategory("");
    setFile(null);
    setProgress(0);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Send Notification</h2>

        {success && <div className="alert alert-success text-center">Notification sent successfully!</div>}

        <div className="mb-3">
          <label className="form-label">Department</label>
          <select className="form-control" value={department} onChange={(e) => setDepartment(e.target.value)}>
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Year</label>
          <select className="form-control" value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">Select Year</option>
            {years.map((yr) => (
              <option key={yr} value={yr}>{yr}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Section</label>
          <select className="form-control" value={section} onChange={(e) => setSection(e.target.value)}>
            <option value="">Select Section</option>
            {sections.map((sec) => (
              <option key={sec} value={sec}>{sec}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Semester</label>
          <select className="form-control" value={semester} onChange={(e) => setSemester(e.target.value)}>
            <option value="">Select Semester</option>
            {semesters.map((sem) => (
              <option key={sem} value={sem}>{sem}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Notification Type</label>
          <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Type</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Subject</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Information</label>
          <textarea
            className="form-control"
            placeholder="Enter information"
            rows="3"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Attach File (Optional)</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        {progress > 0 && (
          <div className="mb-3">
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                role="progressbar"
                style={{ width: `${progress}%` }}
              >
                {Math.round(progress)}%
              </div>
            </div>
          </div>
        )}

        <button className="btn btn-primary w-100" onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "Send Notification"}
        </button>
      </div>
    </div>
  );
};

export default AdminNotification;
