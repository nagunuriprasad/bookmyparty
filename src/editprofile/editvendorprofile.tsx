import React, { useState } from 'react';
import '../assets/css/CompanyForm.css';
import guestAvatar from '../assets/image.png';

// Import your specific service components
import Entertainment from '../Company-Events/src/pages/Entertainment';
import Catering from '../Company-Events/src/pages/Catering';
import Venues from '../Company-Events/src/pages/Venues';
import DJLights from '../Company-Events/src/pages/DJLights';
import PhotoVideo from '../Company-Events/src/pages/PhotoVideo';
import Decoration from '../Company-Events/src/pages/Decoration';
// Import other components as needed

function EditVendorProfile() {
    const [formData, setFormData] = useState({
        companyName: '',
        registrationType: '',
        email: '',
        phone: '',
        companyServices: '',
        eventService: '',
    });

    const [errors, setErrors] = useState({});
    const [selectedServiceComponent, setSelectedServiceComponent] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleServiceSelection = (event) => {
        const selectedService = event.target.value;
        setFormData({ ...formData, eventService: selectedService });

        // Set the selected service component based on the choice
        switch (selectedService) {
            case 'Catering':
                setSelectedServiceComponent(<Catering />);
                break;
            case 'venues':
                setSelectedServiceComponent(<Venues />);
                break;
            case 'decoration':
                setSelectedServiceComponent(<Decoration />);
                break;
            case 'Entertainment':
                setSelectedServiceComponent(<Entertainment />);
                break;

            case 'dj_lights':
                setSelectedServiceComponent(<DJLights />);
                break;

            case 'Photo_Video':
                setSelectedServiceComponent(<PhotoVideo />);
                break;



            
            // Add cases for other services
            default:
                setSelectedServiceComponent(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted successfully:', formData);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.companyName) newErrors.companyName = 'Company name is required';
        if (!formData.registrationType) newErrors.registrationType = 'Registration type is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
        if (!formData.phone || !/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Valid phone number is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <div className="company-form-container">
            <h2 className="form-title">Edit My Profile</h2>

           {/* Profile Image Section */}
    <div className="profile-image-container">
        <img
            src={formData.profileImage || guestAvatar}
            alt="Profile Preview"
            className="profile-image"
            onClick={() => document.getElementById('profileImage').click()}
        />
        <input
            type="file"
            id="profileImage"
            name="profileImage"
            accept="image/*"
            onChange={handleChange}
            className="profile-image-input"
            style={{ display: 'none' }}
        />
    </div>


            {/* Forms Container */}
            <div className="company-forms-container">
                {/* First Form: Company and Registration Details */}
                <form onSubmit={handleSubmit} className="company-form-section">
                    <h3 className="title-center">Company & Registration</h3>
                    <div className="form-group">
                        <label>Company Name</label>
                        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="full-width" />
                        {errors.companyName && <span className="error">{errors.companyName}</span>}
                    </div>
                    <div className="form-group">
                    <label>INC Certificate</label>
                    <input type="file" name="gstCertificate" accept="application/pdf" onChange={handleChange} />
                </div>
                    <div className="form-group">
                        <label>Registration Type</label>
                        <select name="registrationType" value={formData.registrationType} onChange={handleChange} className="full-width">
                            <option value="">Select</option>
                            <option value="ltd">Ltd</option>
                            <option value="pvt ltd">Pvt Ltd</option>
                            <option value="llp">LLP</option>
                            <option value="partnership">Partnership</option>
                            <option value="firm">Firm</option>
                            <option value="upc">UPC</option>
                            <option value="individual">Individual</option>
                        </select>
                        {errors.registrationType && <span className="error">{errors.registrationType}</span>}
                    </div>
                    {/* Registered Address Fields */}
                    <div className="address-section">
                        <label>Registered Address</label>
                        <div className="address-fields">
                            <input type="text" name="regdAddress" placeholder="Address" value={formData.regdExtraField} onChange={handleChange} className="full-width" />
                            <input type="text" name="regdCity" placeholder="City" value={formData.regdCity} onChange={handleChange} className="full-width" />
                            <input type="text" name="regdArea" placeholder="Area" value={formData.regdArea} onChange={handleChange} className="full-width" />
                            <input type="text" name="regdPin" placeholder="Pin" value={formData.regdPin} onChange={handleChange} className="full-width" />
                            <input type="text" name="Email-ID" placeholder="Email-ID" value={formData.regdExtraField} onChange={handleChange} className="full-width" />
                            <input type="text" name="Contact No." placeholder="Contact No." value={formData.regdExtraField} onChange={handleChange} className="full-width" />
                        </div>
                    </div>
                </form>

                {/* Second Form: Work Address, Contact, and Login Details */}
                <form onSubmit={handleSubmit} className="company-form-section">
                    <h3 className="title-center">Contact & Login Information</h3>
                    <div className="form-group">
                        <label>Work Address</label>
                        <div className="address-fields">
                            <input type="text" name="regdAddress" placeholder="Address" value={formData.regdExtraField} onChange={handleChange} className="full-width" />
                            <input type="text" name="workCity" placeholder="City" value={formData.workCity} onChange={handleChange} className="full-width" />
                            <input type="text" name="workArea" placeholder="Area" value={formData.workArea} onChange={handleChange} className="full-width" />
                            <input type="text" name="workPin" placeholder="Pin" value={formData.workPin} onChange={handleChange} className="full-width" />
                            <input type="text" name="Email-ID" placeholder="Email-ID" value={formData.regdExtraField} onChange={handleChange} className="full-width" />
                            <input type="text" name="Contact No." placeholder="Contact No." value={formData.regdExtraField} onChange={handleChange} className="full-width" />
                        </div>
                    </div>

                     {/* Director/Owner Name */}
                <div className="form-group flex-group">
                    <div>
                        <label>Authorized Director / Proprietor / Owner Name</label>
                        <input type="text" name="directorName" value={formData.directorName} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                    <div className="form-group">
                        <label>Email ID</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="full-width" />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="full-width" />
                        {errors.phone && <span className="error">{errors.phone}</span>}
                    </div>
                     {/* Incharge Name */}
                <div className="form-group flex-group">
                    <div>
                        <label>Incharge  Name</label>
                        <input type="text" name="directorName" value={formData.directorName} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <input type="text" name="Email-ID" placeholder="Email-ID" value={formData.regdExtraField} onChange={handleChange} className="full-width" />
                        <input type="text" name="Contact No." placeholder="Contact No." value={formData.regdExtraField} onChange={handleChange} className="full-width" />
                    </div>
                </div>
                    <div className="form-group">
                        <label>Login Email ID</label>
                        <input type="email" name="loginEmail" value={formData.loginEmail} onChange={handleChange} className="full-width" />
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

                </form>

                <form onSubmit={handleSubmit} className="company-form-section">
                    <h3 className="title-center">Company services, Documents & Verification</h3>
                    
                    <div className="form-group">
                        <label>Company Services</label>
                        <select name="companyServices" value={formData.companyServices} onChange={handleChange} className="full-width">
                            <option value="">Select Service</option>
                            <option value="events">Events</option>
                            <option value="shop">Shop</option>
                            <option value="travel">Travel</option>
                            <option value="hotel">Hotel</option>
                            <option value="instant food">Instant Food</option>
                        </select>
                    </div>
                    {formData.companyServices === 'events' && (
                        <div className="form-group">
                            <label>Event Service:</label>
                            <select name="eventService" value={formData.eventService} onChange={handleServiceSelection} className="full-width">
                                <option value="">Select</option>
                                <option value="Catering">Catering</option>
                                <option value="venues">Venues</option>
                                <option value="decoration">Decoration</option>
                                <option value="Photo_Video">Photo & Videography</option>
                                <option value="dj_lights">DJ & Lights</option>
                                <option value="Entertainment">Entertainment</option>
                            </select>
                        </div>
                    )}
                </form>
            </div>

            {/* Display the selected component at the bottom of the page */}
            <div className="selected-service-container">
                {selectedServiceComponent}
            </div>

            
        </div>
    );
}

export default EditVendorProfile;
