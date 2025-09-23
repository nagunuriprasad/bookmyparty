import React, { useState } from "react";
import "./assets/css/CateringPage.css";

const CateringPage = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    eventDateTime: "", // Added for Event Date & Time
    deliveryDateTime: "", // Corrected name for Delivery Date & Time
    religion: "",
    address: "",
    city: "",
    area: "",
    pincode: "",
    email: "",
    contact1: "",
    contact2: "",
    additionalInfo: "",
    regdAddress: "",
    regdCity: "",
    regdArea: "",
    regdPin: "",
    regdEmail: "",
    regdContact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order Confirmed!");
  };

  return (
    <div className="catering-page">
      <h1 className="heading">My Party Caterings</h1>
      <form className="catering-form" onSubmit={handleSubmit}>
        <label className="form-label">Event Name</label>
        <select
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Select Event</option>
          <option value="Birthday">Birthday</option>
          <option value="Marriage">Marriage</option>
          <option value="Reception">Reception</option>
          <option value="Saree Function">Saree Function</option>
          <option value="Get Together">Get Together</option>
          <option value="Anniversaries">Anniversaries</option>
          <option value="Baby Showers">Baby Showers</option>
          <option value="Milestones">Milestones</option>
          <option value="Family Reunion">Family Reunion</option>
        </select>

        <label className="form-label">Event Date & Time</label>
        <input
          type="datetime-local"
          name="eventDateTime"
          value={formData.eventDateTime}
          onChange={handleChange}
          className="form-input"
        />

        <label className="form-label">Delivery Date & Time</label>
        <input
          type="datetime-local"
          name="deliveryDateTime" // Updated name
          value={formData.deliveryDateTime} // Updated value reference
          onChange={handleChange}
          className="form-input"
        />

        <label className="form-label">Select Religious Event</label>
        <select
          name="religion" // Updated name
          value={formData.religion} // Updated value reference
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Select Religion</option>
          <option value="Hindu">Hindu</option>
          <option value="Christian">Christian</option>
          <option value="Jain">Jain</option>
          <option value="Muslim">Muslim</option>
        </select>

        <label className="form-label">Event Address</label>
        <div className="address-section">
          <div className="address-fields">
            <input
              type="text"
              name="regdAddress"
              placeholder="Address"
              value={formData.regdAddress}
              onChange={handleChange}
              className="form-input full-width"
            />
            
            <input
              type="text"
              name="regdArea"
              placeholder="Area"
              value={formData.regdArea}
              onChange={handleChange}
              className="form-input full-width"
            />
            <input
              type="text"
              name="regdCity"
              placeholder="City"
              value={formData.regdCity}
              onChange={handleChange}
              className="form-input full-width"
            />
            <input
              type="text"
              name="regdPin"
              placeholder="Pin"
              value={formData.regdPin}
              onChange={handleChange}
              className="form-input full-width"
            />
            <input
              type="email"
              name="regdEmail"
              placeholder="Email-ID"
              value={formData.regdEmail}
              onChange={handleChange}
              className="form-input full-width"
            />
            <input
              type="tel"
              name="regdContact"
              placeholder="Contact No.1"
              value={formData.regdContact}
              onChange={handleChange}
              className="form-input full-width"
            />
            <input
              type="tel"
              name="regdContact"
              placeholder="Contact No.2"
              value={formData.regdContact}
              onChange={handleChange}
              className="form-input full-width"
            />
          </div>
        </div>

        <label className="form-label">Additional Information</label>
        <textarea
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
          className="form-textarea"
          rows="3"
          placeholder="Enter additional information"
        ></textarea>

        <div className="form-buttons">
          <button type="submit" className="btn2 btn2-confirm">
            Order Confirm
          </button>
          <button type="button" className="btn2 btn2-cart">
            Add to Cart
          </button>
        </div>
      </form>
    </div>
  );
};

export default CateringPage;
