import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    address: {
      houseNo: '',
      area: '',
      city: '',
      pincode: ''
    },
    dob: '',
    email: '',
    contactNumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.address) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log(formData);
    alert('Signup Successful!');
    setFormData({
      firstName: '',
      lastName: '',
      gender: '',
      address: {
        houseNo: '',
        area: '',
        city: '',
        pincode: ''
      },
      dob: '',
      email: '',
      contactNumber: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <div className="container mt-5">
      <h2>Signup Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Upload Picture */}
        <div className="mb-3">
          <label className="form-label">Upload Picture</label>
          <input type="file" className="form-control" />
        </div>

        {/* First Name */}
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Last Name */}
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Gender */}
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select
            className="form-control"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Address */}
        <div className="mb-3">
          <label className="form-label">House No.</label>
          <input
            type="text"
            className="form-control"
            name="houseNo"
            value={formData.address.houseNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Area</label>
          <input
            type="text"
            className="form-control"
            name="area"
            value={formData.address.area}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={formData.address.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Pincode</label>
          <input
            type="text"
            className="form-control"
            name="pincode"
            value={formData.address.pincode}
            onChange={handleChange}
            required
          />
        </div>

        {/* Date of Birth */}
        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Contact Number */}
        <div className="mb-3">
          <label className="form-label">Contact Number</label>
          <input
            type="tel"
            className="form-control"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {/* Signup Button */}
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;
