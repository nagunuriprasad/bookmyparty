import React, { useEffect, useState } from "react"; 
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
import vendorsData from "./data/vendors.json";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/CompanyForm.css';


interface VendorDocument {
  name: string;
  icon?: string;
}

const CompanyForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { formData, formErrors, isSubmitting, successMessage, errorMessage } =
    useSelector((state: RootState) => state.company);

  const [subVendorOptions, setSubVendorOptions] = useState<string[]>([]);
  const [vendorDocuments, setVendorDocuments] = useState<VendorDocument[]>([]);
  const [agreeTerms, setAgreeTerms] = useState(false);
const [whatsappAgree, setWhatsappAgree] = useState<boolean>(false);
const [staffingPartnerAgree, setStaffingPartnerAgree] = useState<boolean>(false);
const [vendorAgree, setVendorAgree] = useState<boolean>(false);
  const handleVendorTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    dispatch(setFormData({ name: "vendorType", value }));
    if (value && vendorsData[value]) {
      setSubVendorOptions(vendorsData[value].subTypes);
      setVendorDocuments(vendorsData[value].documents);
      dispatch(setFormData({ name: "vendorSubType", value: "" }));
    } else {
      setSubVendorOptions([]);
      setVendorDocuments([]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    dispatch(
      setFormData({ name: name as keyof CompanyFormData, value: files?.[0] || value })
    );
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof CompanyFormData, string>> = {};

    if (!formData.companyName?.trim()) errors.companyName = "Company name is required";
    if (!formData.registrationType?.trim()) errors.registrationType = "Registration type is required";
    if (!formData.vendorType?.trim()) errors.vendorType = "Vendor type is required";

    if (!formData.regdAddress?.trim()) errors.regdAddress = "Registered address is required";
    if (!formData.regdCity?.trim()) errors.regdCity = "Registered city is required";
    if (!formData.regdArea?.trim()) errors.regdArea = "Registered area is required";
    if (!formData.regdPin?.trim()) errors.regdPin = "Registered pin code is required";

    if (!formData.workAddress?.trim()) errors.workAddress = "Work address is required";
    if (!formData.workCity?.trim()) errors.workCity = "Work city is required";
    if (!formData.workArea?.trim()) errors.workArea = "Work area is required";
    if (!formData.workPin?.trim()) errors.workPin = "Work pin code is required";

    if (!formData.email?.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Invalid email";
    if (!formData.phone?.trim()) errors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone)) errors.phone = "Phone number must be 10 digits";

    if (!formData.password) errors.password = "Password is required";
    if (!formData.confirmPassword) errors.confirmPassword = "Confirm password is required";
    else if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords do not match";

    if (!agreeTerms) {
      alert("You must agree to the Terms and Conditions before submitting.");
      return false;
    }

    dispatch(setFormErrors(errors));
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) dispatch(submitCompanyForm(formData));
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
          src={
            formData.profileImage instanceof File
              ? URL.createObjectURL(formData.profileImage)
              : formData.profileImage || guestAvatar
          }
          alt="Profile Preview"
          className="profile-image"
          onClick={() => document.getElementById("profileImage")?.click()}
        />
        <input
          type="file"
          id="profileImage"
          name="profileImage"
          accept="image/*"
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </div>

      {/* Messages */}
      {isSubmitting && <p>Submitting...</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="company-forms-container">
        {/* Company & Registration */}
        <div className="company-form-section">
          <h3 className="title-center">Company & Registration</h3>
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="full-width"
            />
            {formErrors.companyName && <span className="error">{formErrors.companyName}</span>}
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
  <label>Work Address</label>

  {/* Address Fields */}
  <div className="address-fields">
    {["workAddress", "workCity", "workArea", "workPin"].map((field) => (
      <input
        key={field}
        type="text"
        name={field}
        placeholder={field.replace("work", "")}
        value={formData[field]}
        onChange={handleChange}
        className="full-width"
      />
    ))}
  </div>

  {/* Two Sections: Director + Incharge */}
  {[
    { title: "Authorized Director / Proprietor / Owner Name", prefix: "director" },
    { title: "Incharge Name", prefix: "incharge" },
  ].map(({ title, prefix }) => (
    <div key={prefix}>
      <div className="form-group ">
        <div>
          <label>{title}</label>
          <input
            type="text"
            name={`${prefix}Name`}
            value={formData[`${prefix}Name`] || ""}
            onChange={handleChange}
          />
          {formErrors[`${prefix}Name`] && (
            <span className="error">{formErrors[`${prefix}Name`]}</span>
          )}
        </div>

        <div>
          <label>Gender</label>
          <select
            name={`${prefix}Gender`}
            value={formData[`${prefix}Gender`] || ""}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {formErrors[`${prefix}Gender`] && (
            <span className="error">{formErrors[`${prefix}Gender`]}</span>
          )}
        </div>
      </div>

      {/* Contact Info */}
      {[
        { label: "Email ID", name: `${prefix}Email`, type: "email" },
        { label: "Phone Number", name: `${prefix}Phone`, type: "text" },
        { label: "Login Email ID", name: `${prefix}LoginEmail`, type: "email" },
      ].map((input) => (
        <div key={input.name} className="form-group">
          <label>{input.label}</label>
          <input
            type={input.type}
            name={input.name}
            value={formData[input.name] || ""}
            onChange={handleChange}
            className="full-width"
          />
          {formErrors[input.name] && (
            <span className="error">{formErrors[input.name]}</span>
          )}
        </div>
      ))}

      {/* Password Fields */}
      {[
        { label: "Password", name: `${prefix}Password` },
        { label: "Confirm Password", name: `${prefix}ConfirmPassword` },
      ].map((input) => (
        <div key={input.name} className="mb-3">
          <label>{input.label}</label>
          <input
            type="password"
            className="form-control"
            name={input.name}
            value={formData[input.name] || ""}
            onChange={handleChange}
          />
          {formErrors[input.name] && (
            <span className="error">{formErrors[input.name]}</span>
          )}
        </div>
      ))}
    </div>
  ))}
</div>
        {/* Company Services */}
        <div className="company-form-section">
          <h3 className="title-center">Company Services</h3>
          <div className="form-group">
            <label>Registration Type</label>
            <select name="registrationType" value={formData.registrationType} onChange={handleChange} className="full-width">
              <option value="">Select</option>
              <option value="ltd">Ltd</option>
              <option value="pvt ltd">Pvt Ltd</option>
              <option value="llp">LLP</option>
              <option value="partnership">Partnership</option>
              <option value="firm">Firm</option>
              <option value="opc">OPC</option>
              <option value="individual">Individual</option>
            </select>
          </div>

          <div className="form-group">
            <label>Company Services</label>
            <select name="companyServices" value={formData.companyServices} onChange={handleChange} className="full-width">
              <option value="">Select Service</option>
              <option value="Events">Events</option>
              <option value="shop">Shop</option>
              <option value="travel">Travel</option>
              <option value="hotel">Hotel</option>
              <option value="instant food">Instant Food</option>
            </select>
          </div>

          {/* Vendor Type */}
          <div className="form-group">
            <label>Vendor Type</label>
            <select name="vendorType" value={formData.vendorType} onChange={handleVendorTypeChange} className="full-width">
              <option value="">Select Vendor Type</option>
              {Object.keys(vendorsData).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Vendor Sub Type */}
          {subVendorOptions.length > 0 && (
            <div className="form-group">
              <label>Vendor Sub Type</label>
              <select name="vendorSubType" value={formData.vendorSubType || ""} onChange={handleChange} className="full-width">
                <option value="">Select Vendor Sub Type</option>
                {subVendorOptions.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          )}

         {/* Documents Section */}
{vendorDocuments.length > 0 && (
  <div className="company-form-section">
    <h3 className="title-center">
      Required Documents for {formData.vendorType}
    </h3>

    {[{ name: "INC Certificate (PDF)" }, ...vendorDocuments].map((doc) => (
      <div key={doc.name} className="form-group flex-group">
        <label>{doc.name}</label>

        {/* Document Number Field */}
        <input
          type="text"
          name={`${doc.name}_number`}
          placeholder="Enter Document Number"
          value={formData[`${doc.name}_number`] || ""}
          onChange={handleChange}
          className="document-number-input"
        />

        {/* File Upload Field */}
        <input
          type="file"
          name={doc.name}
          onChange={handleChange}
          accept={
            doc.name === "INC Certificate (PDF)"
              ? "application/pdf"
              : "application/pdf,image/*"
          }
          className="document-file-input"
        />
      </div>
    ))}
  </div>
)}


          {/* Vendor Type Icons */}
          <h3 className="title-center mt-20">{formData.vendorType}</h3>
          <div className="vendor-icons-container">
            {vendorDocuments.map((doc) => (
              <div key={doc.name} className="vendor-icon-card">
                <label className="vendor-icon-label">
                  <input
                    type="checkbox"
                    name="selectedDocs"
                    value={doc.name}
                    checked={formData.selectedDocs?.includes(doc.name) || false}
                    onChange={(e) => {
                      let selected = formData.selectedDocs || [];
                      if (e.target.checked) selected = [...selected, doc.name];
                      else selected = selected.filter((d) => d !== doc.name);
                      dispatch(setFormData({ name: "selectedDocs", value: selected }));
                    }}
                  />
                  {doc.name}
                </label>
                {doc.icon && (
                  <img
                    src={require(`./icons/${doc.icon}`)}
                    alt={doc.name}
                    className="vendor-icon-img"
                  />
                )}
              </div>
            ))}
          </div>

{/* ✅ TERMS AND CONDITIONS SECTION */}
<div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: "25px",
    gap: "15px",
  }}
>
  {/* 1️⃣ WhatsApp Agreement */}
  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
    <input
      type="checkbox"
      id="whatsappAgree"
      checked={whatsappAgree}
      onChange={(e) => setWhatsappAgree(e.target.checked)}
      style={{ width: "20px", height: "20px", cursor: "pointer", marginTop: "4px" }}
    />
    <label htmlFor="whatsappAgree" style={{ fontSize: "16px", lineHeight: "1.5", color: "#333" }}>
      I agree to receive sales orders, offers, and confirmation messages on my WhatsApp Number.
    </label>
  </div>

  {/* 2️⃣ Staffing Partner Agreement */}
  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
    <input
      type="checkbox"
      id="staffingPartnerAgree"
      checked={staffingPartnerAgree}
      onChange={(e) => setStaffingPartnerAgree(e.target.checked)}
      style={{ width: "20px", height: "20px", cursor: "pointer", marginTop: "4px" }}
    />
    <label htmlFor="staffingPartnerAgree" style={{ fontSize: "16px", lineHeight: "1.5", color: "#333" }}>
      I have read and agree to sign with <strong>BookMyPartys</strong> as a{" "}
      <strong>“Staffing Partner”</strong> and also agree to the terms & conditions of the{" "}
      <strong>“Staffing Partner Agreement”</strong>.
    </label>
  </div>

  {/* 3️⃣ Vendor Service Agreement */}
  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
    <input
      type="checkbox"
      id="vendorAgree"
      checked={vendorAgree}
      onChange={(e) => setVendorAgree(e.target.checked)}
      style={{ width: "20px", height: "20px", cursor: "pointer", marginTop: "4px" }}
    />
    <label htmlFor="vendorAgree" style={{ fontSize: "16px", lineHeight: "1.5", color: "#333" }}>
      I have read and agree to sign with <strong>BookMyPartys</strong> and its terms & conditions of the{" "}
      <strong>“Vendor Service Agreement”</strong>.{" "}
      <a
        href="/TermsAndConditions"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#d8b573", textDecoration: "underline" }}
      >
        View full Terms and Conditions
      </a>
      .
    </label>
  </div>
</div>



          {/* Submit Button */}
          {/* --- SUBMIT BUTTON --- */}
        <div className="form-group" style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
            style={{
              backgroundColor: "#d8b573",
              color: "#000",
              padding: "10px 30px",
              border: "none",
              borderRadius: "5px",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              fontWeight: "bold",
              fontSize: "16px",
              width: "250px",
            }}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;
