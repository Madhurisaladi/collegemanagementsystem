import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    // You might want to fetch the admin's existing profile info here
    // Example:
    // fetch('/api/admin-profile').then(response => response.json()).then(data => setProfileData(data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    // You would likely make an API call here to save the updated profile
    // Example:
    // fetch('/api/admin-profile', {
    //   method: 'PUT',
    //   body: JSON.stringify(profileData),
    //   headers: { 'Content-Type': 'application/json' }
    // });
    navigate("/admin-dashboard"); // After saving, navigate back to the dashboard
  };

  return (
    <div className="edit-profile-container">
      <h1>Edit Profile</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button onClick={handleSave}>Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
