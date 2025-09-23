// src/components/ReviewForm.js
import React, { useState } from 'react';
import './ReviewForm.css';
import './RevApp.css';


const ReviewForm = ({ addReview }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    content: '',
    profilePic: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.content) {
      addReview({ ...formData, id: Date.now() });
      setFormData({ name: '', email: '', phone: '', content: '', profilePic: null });
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
    <div className="profile-pic-container" onClick={handleClick} style={{ cursor: 'pointer' }}>
      {formData.profilePic ? (
        <img src={formData.profilePic} alt="Profile" className="profile-pic-preview" />
      ) : (
        <div className="profile-placeholder">Upload Your Picture</div>
      )}
      <input
        type="file"
        id="profilePic"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
      <div className="form-group">
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Phone Number</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Write a Review</label>
        <textarea name="content" value={formData.content} onChange={handleChange} required></textarea>
      </div>
      <button type="submit" className="submit-button">Update</button>
    </form>
  );
};

export default ReviewForm;
