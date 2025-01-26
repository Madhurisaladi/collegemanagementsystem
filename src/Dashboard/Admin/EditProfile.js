import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    // Fetch the existing profile data (Example)
    setProfileData({
      name: "John Doe",
      email: "john.doe@example.com",
      password: ""
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    // You would typically call your API here to save the updated profile data
    navigate("/admin-dashboard");
  };

  return (
    <div className="edit-profile-container">
      <h1>Edit Profile</h1>
      <form onSubmit={(e) => e.preventDefault()} className="profile-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={profileData.password}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <button type="button" onClick={handleSave} className="save-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
