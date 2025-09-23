import React, { useState } from 'react';
import '../assets/css/DeliveryForm.css'; // Renamed CSS for delivery
import guestAvatar from '../assets/image.png'; // Path to guest image

const EditDeliveryProfile = () => {
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      dob: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      permanentAddress: { city: '', area: '', pin: '' },
      presentAddress: { city: '', area: '', pin: '', pickupArea: '' },
      profileImage: '',
    },
    education: Array(5).fill({ sno: '', qualification: '', year: '', marks: '', docs: '' }),
    jobDetails: {
      jobTitle: '',
      experience: '',
      expertIn: '',
      languages: '',
      description: '',
      workType: '',
      subscription: '',
      uploads: { aadhar: '', cv: '', pan: '', others: '' },
    },
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: string,
    key: string,
    subSection?: string
  ) => {
    if (subSection) {
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [subSection]: {
            ...formData[section][subSection],
            [key]: e.target.value,
          },
        },
      });
    } else {
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [key]: e.target.value,
        },
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    if (!formData.personalInfo.firstName) newErrors.push('First Name is required');
    if (!formData.personalInfo.lastName) newErrors.push('Last Name is required');
    if (!formData.personalInfo.email) newErrors.push('Email is required');
    if (!formData.personalInfo.password) newErrors.push('Password is required');
    if (formData.personalInfo.password !== formData.personalInfo.confirmPassword)
      newErrors.push('Passwords do not match');
    if (!agreedToTerms) newErrors.push('You must agree to the terms and conditions.');

    if (newErrors.length === 0) {
      console.log('Form submitted', formData);
    } else {
      setErrors(newErrors);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({
          ...formData,
          personalInfo: {
            ...formData.personalInfo,
            profileImage: reader.result as string, // Base64 image
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="deliveryform-container">
      <h1 className="deliveryform-header">Edit My Profile</h1>

      {/* Profile Image Upload Section */}
      <div className="deliveryform-profile-image-container">
        <img
          src={formData.personalInfo.profileImage || guestAvatar}
          alt="Profile"
          className="deliveryform-profile-image"
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      <form className="deliveryform-form" onSubmit={handleSubmit}>
        <div className="deliveryform-forms-container">
          {/* Personal Information Form */}
          <div className="deliveryform-form-section">
            <h2>Personal Information</h2>
            <div className="name-input-container">
              <input
                type="text"
                placeholder="First Name"
                value={formData.personalInfo.firstName}
                onChange={(e) => handleInputChange(e, 'personalInfo', 'firstName')}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={formData.personalInfo.lastName}
                onChange={(e) => handleInputChange(e, 'personalInfo', 'lastName')}
                required
              />
            </div>
            {/* Other Personal Info Fields */}
            <input
              type="email"
              placeholder="Email"
              value={formData.personalInfo.email}
              onChange={(e) => handleInputChange(e, 'personalInfo', 'email')}
              required
            />

            <input type="date" placeholder="Date of Birth" value={formData.personalInfo.dob}
              onChange={(e) => handleInputChange(e, 'personalInfo', 'dob')} required />
            <input type="text" placeholder="Phone Number" value={formData.personalInfo.phone}
              onChange={(e) => handleInputChange(e, 'personalInfo', 'phone')} required />
            <input type="email" placeholder="Email ID" value={formData.personalInfo.email}
              onChange={(e) => handleInputChange(e, 'personalInfo', 'email')} required />
            <input type="password" placeholder="Password" value={formData.personalInfo.password}
              onChange={(e) => handleInputChange(e, 'personalInfo', 'password')} required />
            <input type="password" placeholder="Confirm Password" value={formData.personalInfo.confirmPassword}
              onChange={(e) => handleInputChange(e, 'personalInfo', 'confirmPassword')} required />
            <select value={formData.personalInfo.gender}
              onChange={(e) => handleInputChange(e, 'personalInfo', 'gender')}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            {/* Permanent Address */}
            <h3>Permanent Address</h3>
            <input type="text" placeholder="Address" value={formData.personalInfo.permanentAddress.city}
              onChange={(e) => handleInputChange(e, 'personalInfo', 'city', 'permanentAddress')} required />
            <input type="text" placeholder="City" value={formData.personalInfo.permanentAddress.city}
              onChange={(e) => handleInputChange(e, 'personalInfo', 'city', 'permanentAddress')} required />
            <input type="text" placeholder="Area" value={formData.personalInfo.permanentAddress.area}
              onChange={(e) => handleInputChange(e, 'personalInfo', 'area', 'permanentAddress')} required />
            <input type="text" placeholder="Pin Code" value={formData.personalInfo.permanentAddress.pin}
              onChange={(e) => handleInputChange(e, 'personalInfo', 'pin', 'permanentAddress')} required />

            {/* Present Address */}
            <h3>Present Address</h3>
            <input type="text" placeholder="Address" value={formData.personalInfo.permanentAddress.city}
              onChange={(e) => handleInputChange(e, 'personalInfo', 'city', 'permanentAddress')} required />
            <input type="text" placeholder="City" value={formData.personalInfo.presentAddress.city}
              onChange={(e) => handleInputChange(e, 'personalInfo', 'city', 'presentAddress')} required />
            <input type="text" placeholder="Area" value={formData.personalInfo.presentAddress.area}
              onChange={(e) => handleInputChange(e, 'personalInfo', 'area', 'presentAddress')} required />
            <input type="text" placeholder="Pin Code" value={formData.personalInfo.presentAddress.pin}
              onChange={(e) => handleInputChange(e, 'personalInfo', 'pin', 'presentAddress')} required />
          </div>

          {/* Education Qualification Form */}
          <div className="deliveryform-form-section">
            <h2>Education Qualification</h2>
            <table>
              <thead>
                <tr>
                  <th>SI No</th>
                  <th>Qualification</th>
                  <th>Year of Passing</th>
                  <th>Marks %</th>
                  <th>Upload Docs</th>
                </tr>
              </thead>
              <tbody>
                {formData.education.map((edu, index) => (
                  <tr key={index}>
                    <td><input type="text" value={edu.sno} onChange={(e) => handleInputChange(e, 'education', 'sno', index.toString())} /></td>
                    <td><input type="text" value={edu.qualification} onChange={(e) => handleInputChange(e, 'education', 'qualification', index.toString())} /></td>
                    <td><input type="text" value={edu.year} onChange={(e) => handleInputChange(e, 'education', 'year', index.toString())} /></td>
                    <td><input type="text" value={edu.marks} onChange={(e) => handleInputChange(e, 'education', 'marks', index.toString())} /></td>
                    <td><input type="file" value={edu.docs} onChange={(e) => handleInputChange(e, 'education', 'docs', index.toString())} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Job Details Form */}
          <div className="deliveryform-form-section">
            <h2>Delivery Job Details</h2>
            <select value={formData.jobDetails.jobTitle}
              onChange={(e) => handleInputChange(e, 'jobDetails', 'jobTitle')} required>
              <option value="">Select Job Title</option>
              <option value="Delivery Executive (2 Wheeler)">Delivery Executive (2 Wheeler)</option>
              <option value="Delivery Executive (3 Wheeler)">Delivery Executive (3 Wheeler)</option>
              <option value="Delivery Executive (4 Wheeler)">Delivery Executive (4 Wheeler)</option>
            </select>
            <input type="text" placeholder="Work Experience" value={formData.jobDetails.experience}
              onChange={(e) => handleInputChange(e, 'jobDetails', 'experience')} required />
            

            {/* File Uploads */}
            <h3>Uploads</h3>
            <div className="staffsignup-upload-section">
              <label>Aadhar</label>
              <input
                type="file"
                onChange={(e) => handleFileUpload(e, 'jobDetails', 'aadhar', 'uploads')}
              />
              <label>CV</label>
              <input
                type="file"
                onChange={(e) => handleFileUpload(e, 'jobDetails', 'cv', 'uploads')}
              />
              <label>PAN</label>
              <input
                type="file"
                onChange={(e) => handleFileUpload(e, 'jobDetails', 'pan', 'uploads')}
              />
              <label>Vehicle Registration & Driving  License</label>
              <input
                type="file"
                onChange={(e) => handleFileUpload(e, 'jobDetails', 'others', 'uploads')}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="deliveryform-terms">
            <input type="checkbox" checked={agreedToTerms} onChange={() => setAgreedToTerms(!agreedToTerms)} />
            <label>I agree to the terms and conditions.</label>
          </div>
          <button type="submit" className="deliveryform-submit-btn">Update</button>
        </div>
      </form>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="deliveryform-errors">
          {errors.map((error, index) => (
            <p key={index} className="deliveryform-error">{error}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditDeliveryProfile;
