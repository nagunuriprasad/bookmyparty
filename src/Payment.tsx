import React, { useState } from 'react';
import guestAvatar from './assets/image.png';
const defaultImage = '/assets/images/guest-avatar.png'; // Path to default guest image

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    city: '',
    address: '',
    area: '',
    gender: '',
    pincode: '',
    profileImage: '', // Add profileImage state
    agreeToTerms: false // Add state for terms agreement
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    city: '',
    address: '',
    area: '',
    gender: '',
    pincode: '',
    profileImage: '', // Add profileImage error
    agreeToTerms: '' // Add error for terms agreement
  });

  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Reset the error when the user starts typing
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, agreeToTerms: e.target.checked });
    setErrors({ ...errors, agreeToTerms: '' }); // Reset the error when the checkbox is checked
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let newErrors = { ...errors };
    let hasError = false;

    // Validation for empty fields
    Object.keys(formData).forEach((field) => {
      if (!formData[field as keyof typeof formData] && field !== 'profileImage' && field !== 'agreeToTerms') {
        newErrors = { ...newErrors, [field]: `${field.replace(/([A-Z])/g, ' $1')} is required` };
        hasError = true;
      }
    });

    // Special check for password mismatch
    if (formData.password !== formData.confirmPassword) {
      newErrors = { ...newErrors, confirmPassword: 'Passwords do not match' };
      hasError = true;
    }

    // Check if terms and conditions are agreed to
    if (!formData.agreeToTerms) {
      newErrors = { ...newErrors, agreeToTerms: 'You must agree to the terms and conditions' };
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
    } else {
      setMessage('Thank you for signing up!');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="col-md-8">
        <div className="card p-5 bg-light shadow">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="title-bold">Signup Form</h2> {/* Bold title */}

            {/* Profile Image Upload */}
            <div className="form-group text-center">
              <label htmlFor="profileImage">Profile Image</label>
              <div className="profile-image-preview">
                <img
                  src={formData.profileImage || guestAvatar} // Use uploaded image or fallback to guest avatar
                  alt="Profile Preview"
                  className="rounded-circle"
                />
              </div>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            {/* Full Name */}
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                className={`form-control form-control-lg ${errors.fullName ? 'is-invalid' : ''}`}
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
              {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Enter email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Enter password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className={`form-control form-control-lg ${errors.confirmPassword ? 'is-invalid' : ''}`}
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                className={`form-control form-control-lg ${errors.phoneNumber ? 'is-invalid' : ''}`}
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
              {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
            </div>

            {/* Address */}
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                className={`form-control form-control-lg ${errors.address ? 'is-invalid' : ''}`}
                placeholder="Enter address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
              {errors.address && <div className="invalid-feedback">{errors.address}</div>}
            </div>

            {/* Area */}
            <div className="form-group">
              <label>Area</label>
              <input
                type="text"
                name="area"
                className={`form-control form-control-lg ${errors.area ? 'is-invalid' : ''}`}
                placeholder="Enter area"
                value={formData.area}
                onChange={handleInputChange}
                required
              />
              {errors.area && <div className="invalid-feedback">{errors.area}</div>}
            </div>

            {/* City */}
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                className={`form-control form-control-lg ${errors.city ? 'is-invalid' : ''}`}
                placeholder="Enter city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
              {errors.city && <div className="invalid-feedback">{errors.city}</div>}
            </div>

            {/* Gender */}
            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                className={`form-control form-control-lg ${errors.gender ? 'is-invalid' : ''}`}
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
            </div>

            {/* Pincode */}
            <div className="form-group">
              <label>Pincode</label>
              <input
                type="text"
                name="pincode"
                className={`form-control form-control-lg ${errors.pincode ? 'is-invalid' : ''}`}
                placeholder="Enter pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                required
              />
              {errors.pincode && <div className="invalid-feedback">{errors.pincode}</div>}
            </div>

            {/* Terms & Conditions Checkbox */}
            <div className="form-group form-check">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                className={`form-check-input ${errors.agreeToTerms ? 'is-invalid' : ''}`}
                checked={formData.agreeToTerms}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="agreeToTerms" className="form-check-label">
                I agree to the <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">Terms & Conditions</a> and <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
              </label>
              {errors.agreeToTerms && <div className="invalid-feedback">{errors.agreeToTerms}</div>}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-lg btn-block">
                Submit
              </button>
            </div>

            {/* Success Message */}
            {message && <div className="alert alert-success mt-3 text-center">{message}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
