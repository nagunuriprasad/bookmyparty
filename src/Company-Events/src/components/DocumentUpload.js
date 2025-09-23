import React, { useState } from 'react';
import './DocumentUpload.css';

const DocumentUpload = () => {
  const [formData, setFormData] = useState({
    gstNumber: '',
    fssaiNumber: '',
    panNumber: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate and handle form submission
  };

  return (
    <div className="document-upload-container">
      <h2>Document Upload</h2>
      <p className="upload-note">Please upload the files in PDF format only.</p>

      <form onSubmit={handleSubmit}>
        <div className="document-form-group">
          <label htmlFor="gstFile">GST Certificate</label>
          <div className="document-form-row">
            <input type="file" id="gstFile" />
            <input
              type="text"
              name="gstNumber"
              placeholder="Enter GST Number"
              value={formData.gstNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="document-form-group">
          <label htmlFor="fssaiFile">FSSAI Certificate</label>
          <div className="document-form-row">
            <input type="file" id="fssaiFile" />
            <input
              type="text"
              name="fssaiNumber"
              placeholder="Enter FSSAI Number"
              value={formData.fssaiNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="document-form-group">
          <label htmlFor="panFile">Company PAN</label>
          <div className="document-form-row">
            <input type="file" id="panFile" />
            <input
              type="text"
              name="panNumber"
              placeholder="Enter PAN Number"
              value={formData.panNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        
        {/* Terms & Conditions */}
        <div className="terms-section">
          <input
            type="checkbox"
            id="agreeToTerms"
            name="agreeToTerms"
            className={`form-check-input ${errors.agreeToTerms ? 'is-invalid' : ''}`}
            checked={formData.agreeToTerms}
            onChange={handleChange}
          />
          <label htmlFor="agreeToTerms" className="form-check-label">
            I agree to the <a href="/terms">Terms and Conditions</a> and <a href="/privacy">Privacy Policy</a>
          </label>
          {errors.agreeToTerms && <div className="invalid-feedback">{errors.agreeToTerms}</div>}
        </div>
        
        {/* Submit Button with Spacing */}
        <div className="submit-section">
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default DocumentUpload;
