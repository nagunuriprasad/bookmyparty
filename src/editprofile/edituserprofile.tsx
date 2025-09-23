import React, { useState } from 'react';
import '../assets/css/CompanyForm.css'; // External CSS for additional styling


const EditUserProfile = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        registrationType: '',
        regdCity: '',
        regdArea: '',
        regdPin: '',
        regdExtraField: '',
        workCity: '',
        workArea: '',
        workPin: '',
        workExtraField: '',
        directorName: '',
        gender: '',
        dateOfBirth: '',
        email: '',
        phone: '',
        loginEmail: '',
        password: '',
        confirmPassword: '',
        profileImage: '',
        gstNumber: '',
        gstCertificate: '',
        fssaiNumber: '',
        fssaiCertificate: '',
        panNumber: '',
        panCard: '',
        companyServices: '',
        agreeToTerms: false,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted successfully:', formData);
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.companyName) newErrors.companyName = 'Company name is required';
        if (!formData.registrationType) newErrors.registrationType = 'Registration type is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
        if (!formData.phone || !/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Valid phone number is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <div className="company-form-container">
            <h2 className="form-title">Edit My Profile</h2>

            {/* Profile Image Section */}
            <div className="profile-image-container">
                <img
                    src={formData.profileImage }
                    alt="Profile Preview"
                    className="profile-image"
                    onClick={() => document.getElementById('profileImage').click()} // Trigger input click on image click
                />
                <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleChange}
                    className="profile-image-input"
                    style={{ display: 'none' }} // Hide the file input
                />
            </div>

            {/* Forms Container */}
            <div className="company-forms-container">
                {/* First Form: Company and Registration Details */}
                <form onSubmit={handleSubmit} className="company-form-section">
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="full-width" />
                        {errors.companyName && <span className="error">{errors.companyName}</span>}
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="full-width" />
                    </div>
                    <div className="form-group">
                        <label>Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    {/* Added Date of Birth below Gender */}
                    <div className="form-group">
                        <label>Date of Birth</label>
                        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="full-width" />
                    </div>

                    {/* Registered Address Fields */}
                    <div className="address-section">
                        <label>Address</label>
                        <div className="address-fields">
                            <input type="text" name="regdCity" placeholder="City" value={formData.regdCity} onChange={handleChange} className="full-width" />
                            <input type="text" name="regdArea" placeholder="Area" value={formData.regdArea} onChange={handleChange} className="full-width" />
                            <input type="text" name="regdPin" placeholder="Pin" value={formData.regdPin} onChange={handleChange} className="full-width" />
                            <input type="text" name="regdExtraField" placeholder="Extra Field" value={formData.regdExtraField} onChange={handleChange} className="full-width" />
                        </div>
                    </div>
                </form>

                {/* Second Form: Work Address, Contact, and Login Details */}
                <form onSubmit={handleSubmit} className="company-form-section">
                    <div className="form-group">
                        <label>Email ID</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="full-width" />
                        {errors.email && <span className="error">{errors.email}</span>}
                        <label>Contact Number</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="full-width" />
                        {errors.phone && <span className="error">{errors.phone}</span>}
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="full-width" />
                        {errors.phone && <span className="error">{errors.phone}</span>}
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="email" name="loginEmail" value={formData.loginEmail} onChange={handleChange} className="full-width" />
                    </div>
                </form>
            </div>

            {/* Submit Button */}
            <div className="submit-btn-container">
                <button type="submit" className="submit-btn">Update</button>
            </div>
        </div>
    );
};

export default EditUserProfile;
