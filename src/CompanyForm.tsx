 import React, { useEffect } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import {
  setFormData,
  setFormErrors,
  submitCompanyForm,
  resetFormMessages,
  CompanyFormData,
} from "./slices/companySlice";
import { RootState, AppDispatch } from "./store/store";
import guestAvatar from "./assets/image.png";

import Entertainment from './Company-Events/src/pages/Entertainment';
import Catering from './Company-Events/src/pages/Catering';
import Venues from './Company-Events/src/pages/Venues';
import DJLights from './Company-Events/src/pages/DJLights';
import PhotoVideo from './Company-Events/src/pages/PhotoVideo';
import Decoration from './Company-Events/src/pages/Decoration';

const CompanyForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { formData, formErrors, isSubmitting, successMessage, errorMessage } =
    useSelector((state: RootState) => state.company);

  const [selectedServiceComponent, setSelectedServiceComponent] = React.useState<JSX.Element | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    dispatch(
      setFormData({ name: name as keyof CompanyFormData, value: files?.[0] || value })
    );
  };

  const handleServiceSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    dispatch(setFormData({ name: "eventService", value }));

    switch (value) {
      case 'Catering': setSelectedServiceComponent(<Catering />); break;
      case 'venues': setSelectedServiceComponent(<Venues />); break;
      case 'decoration': setSelectedServiceComponent(<Decoration />); break;
      case 'Entertainment': setSelectedServiceComponent(<Entertainment />); break;
      case 'dj_lights': setSelectedServiceComponent(<DJLights />); break;
      case 'Photo_Video': setSelectedServiceComponent(<PhotoVideo />); break;
      default: setSelectedServiceComponent(null);
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof CompanyFormData, string>> = {};

    // Company Details
    if (!formData.companyName.trim()) errors.companyName = "Company name is required";
    if (!formData.registrationType.trim()) errors.registrationType = "Registration type is required";

    // Registered Address
    if (!formData.regdAddress.trim()) errors.regdAddress = "Registered address is required";
    if (!formData.regdCity.trim()) errors.regdCity = "Registered city is required";
    if (!formData.regdArea.trim()) errors.regdArea = "Registered area is required";
    if (!formData.regdPin.trim()) errors.regdPin = "Registered pin code is required";

    // Work Address
    if (!formData.workAddress.trim()) errors.workAddress = "Work address is required";
    if (!formData.workCity.trim()) errors.workCity = "Work city is required";
    if (!formData.workArea.trim()) errors.workArea = "Work area is required";
    if (!formData.workPin.trim()) errors.workPin = "Work pin code is required";

    // Contact Info
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Invalid email";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone)) errors.phone = "Phone number must be 10 digits";

    if (!formData.loginEmail.trim()) errors.loginEmail = "Login email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.loginEmail)) errors.loginEmail = "Invalid login email";

    if (!formData.password) errors.password = "Password is required";
    if (!formData.confirmPassword) errors.confirmPassword = "Confirm password is required";
    else if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords do not match";

    // Director / Owner
    if (!formData.directorName.trim()) errors.directorName = "Director / Owner name is required";
    if (!formData.gender.trim()) errors.gender = "Gender is required";

    // Event Services
    if (formData.companyServices === "events" && !formData.eventService.trim()) {
      errors.eventService = "Event service selection is required";
    }

    dispatch(setFormErrors(errors));
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(submitCompanyForm(formData));
    }
  };

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => dispatch(resetFormMessages()), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage, dispatch]);

  return (
    <div className="company-form-container">
      <h2 className="form-title">Vendor Signup Form</h2>

      {/* Profile Image */}
      <div className="profile-image-container">
        <img
          src={formData.profileImage instanceof File ? URL.createObjectURL(formData.profileImage) : formData.profileImage || guestAvatar}
          alt="Profile Preview"
          className="profile-image"
          onClick={() => document.getElementById('profileImage')?.click()}
        />
        <input
          type="file"
          id="profileImage"
          name="profileImage"
          accept="image/*"
          onChange={handleChange}
          style={{ display: 'none' }}
        />
      </div>

      {/* Messages */}
      {isSubmitting && <p>Submitting...</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}

      {/* SINGLE FORM */}
      <form onSubmit={handleSubmit} className="company-forms-container">

        {/* Company & Registration */}
        <div className="company-form-section">
          <h3 className="title-center">Company & Registration</h3>

          <div className="form-group">
            <label>Company Name</label>
            <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="full-width" />
            {formErrors.companyName && <span className="error">{formErrors.companyName}</span>}
          </div>

          <div className="form-group">
            <label>INC Certificate (PDF)</label>
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
            {formErrors.registrationType && <span className="error">{formErrors.registrationType}</span>}
          </div>

          {/* Registered Address */}
          <div className="address-section">
            <label>Registered Address</label>
            <div className="address-fields">
              <input type="text" name="regdAddress" placeholder="Address" value={formData.regdAddress} onChange={handleChange} className="full-width" />
              <input type="text" name="regdCity" placeholder="City" value={formData.regdCity} onChange={handleChange} className="full-width" />
              <input type="text" name="regdArea" placeholder="Area" value={formData.regdArea} onChange={handleChange} className="full-width" />
              <input type="text" name="regdPin" placeholder="Pin" value={formData.regdPin} onChange={handleChange} className="full-width" />
            </div>
          </div>
        </div>

        {/* Contact & Login */}
        <div className="company-form-section">
          <h3 className="title-center">Contact & Login Information</h3>

          <div className="address-fields">
            <input type="text" name="workAddress" placeholder="Address" value={formData.workAddress} onChange={handleChange} className="full-width" />
            <input type="text" name="workCity" placeholder="City" value={formData.workCity} onChange={handleChange} className="full-width" />
            <input type="text" name="workArea" placeholder="Area" value={formData.workArea} onChange={handleChange} className="full-width" />
            <input type="text" name="workPin" placeholder="Pin" value={formData.workPin} onChange={handleChange} className="full-width" />
          </div>

          <div className="form-group flex-group">
            <div>
              <label>Authorized Director / Proprietor / Owner Name</label>
              <input type="text" name="directorName" value={formData.directorName} onChange={handleChange} />
              {formErrors.directorName && <span className="error">{formErrors.directorName}</span>}
            </div>
            <div>
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {formErrors.gender && <span className="error">{formErrors.gender}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Email ID</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="full-width" />
            {formErrors.email && <span className="error">{formErrors.email}</span>}
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="full-width" />
            {formErrors.phone && <span className="error">{formErrors.phone}</span>}
          </div>

          <div className="form-group">
            <label>Login Email ID</label>
            <input type="email" name="loginEmail" value={formData.loginEmail} onChange={handleChange} className="full-width" />
            {formErrors.loginEmail && <span className="error">{formErrors.loginEmail}</span>}
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} />
            {formErrors.password && <span className="error">{formErrors.password}</span>}
          </div>

          <div className="mb-3">
            <label>Confirm Password</label>
            <input type="password" className="form-control" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
            {formErrors.confirmPassword && <span className="error">{formErrors.confirmPassword}</span>}
          </div>
        </div>

        {/* Company Services */}
        <div className="company-form-section">
          <h3 className="title-center">Company Services</h3>
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
              {formErrors.eventService && <span className="error">{formErrors.eventService}</span>}
            </div>
          )}
        </div>

        {/* Submit Button */}
       <div className="form-group" style={{ textAlign: 'center', marginTop: '20px' }}>
  <button
    type="submit"
    className="submit-btn"
    disabled={isSubmitting}
    style={{
      backgroundColor: '#d8b573', // yellow
      color: '#000',
      padding: '10px 30px',
      border: 'none',
      borderRadius: '5px',
      cursor: isSubmitting ? 'not-allowed' : 'pointer',
      fontWeight: 'bold',
      fontSize: '16px',
       width: '250px'
    }}
  >
    {isSubmitting ? "Submitting..." : "Submit"}
  </button>
</div>
      </form>

      {/* Display selected event component */}
      <div className="selected-service-container">
        {selectedServiceComponent}
      </div>
    </div>
  );
};

export default CompanyForm;
