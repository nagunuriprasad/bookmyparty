import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./store/store";
import {
  setFormData,
  setErrors,
  clearMessages,
  submitStaffSignup,
} from "./slices/staffSignupSlice";
import "./assets/css/StaffSignup.css";
import guestAvatar from "./assets/image.png";

const StaffSignup: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { formData, errors, loading, success, message } = useSelector(
    (state: RootState) => state.staffSignup
  );

  const [localErrors, setLocalErrors] = useState<string[]>([]);
  // ✅ Helper: Dynamic services based on job title
  const getServicesByJobTitle = (jobTitle: string): string[] => {
    const servicesMap: Record<string, string[]> = {
      "Masters, Chefs & Associate": [
        "Certified Master Chefs",
        "Certified Chefs",
        "Master Chefs",
        "Experienced Chefs",
        "Associates",
        "Trainee Chefs",
      ],
      "Event Management Staff": [
        "Event Organizers",
        "Event Planners",
        "Event Managers",
        "Event Supervisors",
      ],
      "Stage setup & Decoration Staff": [
        "Stage setup Boys",
        "Decoration Boys",
        "Flower Decoration Boys",
        "Balloon Decoration Boys",
      ],
      "Welcome & Service Staff": [
        "Welcome Girls",
        "Welcome Foreign Girls",
        "Couple Service",
        "HM Girls",
        "Chinese Girls",
      ],
      "Catering Staff": [
        "Food Pickup Boys (Leads)",
        "Catering Boys",
        "Waistcoat Boys",
        "Hotel Management Boys",
      ],
      "Security & Bouncers": [
        "Security Men",
        "Security Women",
        "Security Manager",
        "Bouncers",
        "Drivers",
        "Wallet Parking",
      ],
      "House Keeping Staff": [
        "House Keeping Supervisors",
        "House Keeping Men",
        "House Keeping Women",
        "Helpers",
      ],
    };

    return servicesMap[jobTitle] || [];
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    section: string,
    key: string,
    subSection?: string | number
  ) => {
    const value =
      e.target.type === "file" ? (e.target as HTMLInputElement).files?.[0] || null : e.target.value;

    if (typeof subSection === "number") {
      // Update education array immutably
      const updatedEducation = formData.education.map((edu, i) =>
        i === subSection ? { ...edu, [key]: value } : edu
      );
      dispatch(setFormData({ education: updatedEducation }));
    } else if (typeof subSection === "string") {
      // Update nested objects like addresses or uploads
      const updatedSection = {
        ...formData[section as keyof typeof formData],
        [subSection]: {
          ...((formData[section as keyof typeof formData] as any)[subSection]),
          [key]: value,
        },
      };
      dispatch(setFormData({ [section]: updatedSection }));
    } else {
      // Top-level fields
      const updatedSection = {
        ...formData[section as keyof typeof formData],
        [key]: value,
      };
      dispatch(setFormData({ [section]: updatedSection }));
    }
  };

 // Add this function near the top of your component (below other handlers)
const handleLanguageChange = (value: string, checked: boolean) => {
  const updatedLangs = checked
    ? [...formData.jobDetails.languages, value]
    : formData.jobDetails.languages.filter((lang) => lang !== value);

  dispatch(
    setFormData({
      jobDetails: { ...formData.jobDetails, languages: updatedLangs },
    })
  );
};



  const handleEducationFileUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0] || null;
    const updatedEducation = formData.education.map((edu, i) =>
      i === index ? { ...edu, docs: file } : edu
    );
    dispatch(setFormData({ education: updatedEducation }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        dispatch(
          setFormData({
            personalInfo: {
              ...formData.personalInfo,
              profileImage: reader.result as string,
            },
          })
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearMessages());
    setLocalErrors([]);

    const validationErrors: string[] = [];
    if (!formData.personalInfo.firstName) validationErrors.push("First Name is required");
    if (!formData.personalInfo.lastName) validationErrors.push("Last Name is required");
    if (!formData.personalInfo.email) validationErrors.push("Email is required");
    if (!formData.personalInfo.password) validationErrors.push("Password is required");
    if (formData.personalInfo.password !== formData.personalInfo.confirmPassword)
      validationErrors.push("Passwords do not match");

    if (validationErrors.length > 0) {
      setLocalErrors(validationErrors);
      return;
    }

    dispatch(submitStaffSignup(formData));
  };

  return (
    <div className="staffsignup-container">
      <h1 className="staffsignup-header">Staff Signup</h1>

      {/* Profile Image Upload */}
      <div className="staffsignup-profile-image-container">
        <img
          src={formData.personalInfo.profileImage || guestAvatar}
          alt="Profile"
          className="staffsignup-profile-image"
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      <form className="staffsignup-form" onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div className="staffsignup-form-section">
          <h2>Personal Information</h2>
          <div className="name-input-container">
            <input
              type="text"
              placeholder="First Name"
              value={formData.personalInfo.firstName}
              onChange={(e) => handleInputChange(e, "personalInfo", "firstName")}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={formData.personalInfo.lastName}
              onChange={(e) => handleInputChange(e, "personalInfo", "lastName")}
              required
            />
          </div>
          <input
            type="date"
            value={formData.personalInfo.dob}
            onChange={(e) => handleInputChange(e, "personalInfo", "dob")}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={formData.personalInfo.phone}
            onChange={(e) => handleInputChange(e, "personalInfo", "phone")}
            required
          />
          <input
            type="email"
            placeholder="Email ID"
            value={formData.personalInfo.email}
            onChange={(e) => handleInputChange(e, "personalInfo", "email")}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.personalInfo.password}
            onChange={(e) => handleInputChange(e, "personalInfo", "password")}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.personalInfo.confirmPassword}
            onChange={(e) => handleInputChange(e, "personalInfo", "confirmPassword")}
            required
          />
          <select
            value={formData.personalInfo.gender}
            onChange={(e) => handleInputChange(e, "personalInfo", "gender")}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Present & Permanent Address */}
        <div className="staffsignup-form-section">
          <h3>Present Address</h3>
          <input
            type="text"
            placeholder="Address"
            value={formData.personalInfo.presentAddress.address}
            onChange={(e) => handleInputChange(e, "personalInfo", "address", "presentAddress")}
            required
          />
          <input
            type="text"
            placeholder="City"
            value={formData.personalInfo.presentAddress.city}
            onChange={(e) => handleInputChange(e, "personalInfo", "city", "presentAddress")}
            required
          />
          <input
            type="text"
            placeholder="Area"
            value={formData.personalInfo.presentAddress.area}
            onChange={(e) => handleInputChange(e, "personalInfo", "area", "presentAddress")}
            required
          />
          <input
            type="text"
            placeholder="Pin Code"
            value={formData.personalInfo.presentAddress.pin}
            onChange={(e) => handleInputChange(e, "personalInfo", "pin", "presentAddress")}
            required
          />

          <div className="checkbox-container">
            <label className="checkbox-label">
              Permanent Address is same as Present Address
              <input
                type="checkbox"
                checked={formData.personalInfo.sameAsPresent}
                onChange={(e) => {
                  const checked = e.target.checked;
                  dispatch(
                    setFormData({
                      personalInfo: {
                        ...formData.personalInfo,
                        sameAsPresent: checked,
                        permanentAddress: checked
                          ? { ...formData.personalInfo.presentAddress }
                          : { address: "", city: "", area: "", pin: "" },
                      },
                    })
                  );
                }}
              />
            </label>
          </div>

          {!formData.personalInfo.sameAsPresent && (
            <>
              <h3>Permanent Address</h3>
              <input
                type="text"
                placeholder="Address"
                value={formData.personalInfo.permanentAddress.address}
                onChange={(e) => handleInputChange(e, "personalInfo", "address", "permanentAddress")}
                required
              />
              <input
                type="text"
                placeholder="City"
                value={formData.personalInfo.permanentAddress.city}
                onChange={(e) => handleInputChange(e, "personalInfo", "city", "permanentAddress")}
                required
              />
              <input
                type="text"
                placeholder="Area"
                value={formData.personalInfo.permanentAddress.area}
                onChange={(e) => handleInputChange(e, "personalInfo", "area", "permanentAddress")}
                required
              />
              <input
                type="text"
                placeholder="Pin Code"
                value={formData.personalInfo.permanentAddress.pin}
                onChange={(e) => handleInputChange(e, "personalInfo", "pin", "permanentAddress")}
                required
              />
            </>
          )}
        </div>

  {/* Education */}
<div className="staffsignup-form-section">
  <h2>Education Qualification</h2>
  <table>
    <thead>
      <tr>
        <th>SI No</th>
        <th>Qualification</th>
        <th>Year of Passing</th>
        <th>Marks %</th>
        <th>Upload Docs</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {formData.education.map((edu, index) => (
        <tr key={index}>
          <td>
            <input
              type="text"
              value={edu.sno || String(index + 1)}
              onChange={(e) => handleInputChange(e, "education", "sno", index)}
            />
          </td>
          <td>
            <input
              type="text"
              value={edu.qualification}
              onChange={(e) => handleInputChange(e, "education", "qualification", index)}
            />
          </td>
          <td>
            <input
              type="text"
              value={edu.year}
              onChange={(e) => handleInputChange(e, "education", "year", index)}
            />
          </td>
          <td>
            <input
              type="text"
              value={edu.marks}
              onChange={(e) => handleInputChange(e, "education", "marks", index)}
            />
          </td>
          <td>
            <input type="file" onChange={(e) => handleEducationFileUpload(e, index)} />
          </td>
          <td>
            <button
              type="button"
              onClick={() => {
                const updatedEducation = formData.education.filter((_, i) => i !== index);
                dispatch(setFormData({ education: updatedEducation }));
              }}
            >
              Remove
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {/* Add Education Button */}
  <button
    type="button"
    className="staffsignup-add-education"
    onClick={() => {
      const newEducation = [
        ...formData.education,
        { sno: "", qualification: "", year: "", marks: "", docs: null },
      ];
      dispatch(setFormData({ education: newEducation }));
    }}
  >
    + Add Education
  </button>
</div>


        {/* ================= JOB DETAILS ================= */}
        <div className="staffsignup-form-section">
          <h2>Job Details</h2>

          {/* Job Title */}
          <label className="language-label">Select Job:</label>
          <select
            value={formData.jobDetails.jobTitle}
            onChange={(e) => handleInputChange(e, "jobDetails", "jobTitle")}
            required
          >
            <option value="">Select Job Title</option>
            <option value="Masters, Chefs & Associate">Masters, Chefs & Associate</option>
            <option value="Event Management Staff">Event Management Staff</option>
            <option value="Stage setup & Decoration Staff">Stage setup & Decoration Staff</option>
            <option value="Welcome & Service Staff">Welcome & Service Staff</option>
            <option value="Catering Staff">Catering Staff</option>
            <option value="Security & Bouncers">Security & Bouncers</option>
            <option value="House Keeping Staff">House Keeping Staff</option>
          </select>

          {/* Dynamic Services */}
          {formData.jobDetails.jobTitle && (
            <select
              value={formData.jobDetails.service}
              onChange={(e) => handleInputChange(e, "jobDetails", "service")}
              required
            >
              <option value="">Select Service</option>
              {getServicesByJobTitle(formData.jobDetails.jobTitle).map((service, i) => (
                <option key={i} value={service}>
                  {service}
                </option>
              ))}
            </select>
          )}

          {/* Experience */}
          <input
            type="text"
            placeholder="Work Experience"
            value={formData.jobDetails.experience}
            onChange={(e) => handleInputChange(e, "jobDetails", "experience")}
            required
          />

          {/* Expert In */}
          <select
            value={formData.jobDetails.expertIn}
            onChange={(e) => handleInputChange(e, "jobDetails", "expertIn")}
            required
          >
            <option value="">Expert In</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>

   {/* Languages */}
<div className="language-section">
  <label className="language-label">Languages Known:</label>
  <div className="language-options">
    {["Hindi", "Telugu", "Tamil", "English", "Kannada"].map((lang) => (
      <label key={lang} className="language-option">
        <input
          type="checkbox"
          value={lang}
          checked={formData.jobDetails.languages.includes(lang)}
          onChange={(e) => handleLanguageChange(e.target.value, e.target.checked)}
          required={formData.jobDetails.languages.length === 0} // ✅ At least one required
        />
        <span>{lang}</span>
      </label>
    ))}
  </div>
</div>



          {/* Description */}
          <textarea
            placeholder="Description"
            value={formData.jobDetails.description}
            onChange={(e) => handleInputChange(e, "jobDetails", "description")}
            required
          />

          {/* Work Type */}
          <select
            value={formData.jobDetails.workType}
            onChange={(e) => handleInputChange(e, "jobDetails", "workType")}
            required
          >
            <option value="">Work Type</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
          </select>

          {/* Subscription */}
          <select
            value={formData.jobDetails.subscription}
            onChange={(e) => handleInputChange(e, "jobDetails", "subscription")}
            required
          >
            <option value="">Subscription</option>
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
          </select>
        

          <h3>Uploads</h3>
          <div className="staffsignup-upload-section">
            <label>Aadhar</label>
            <input
              type="file"
              onChange={(e) => handleInputChange(e, "jobDetails", "aadhar", "uploads")}
            />
            <label>CV</label>
            <input
              type="file"
              onChange={(e) => handleInputChange(e, "jobDetails", "cv", "uploads")}
            />
            <label>PAN</label>
            <input
              type="file"
              onChange={(e) => handleInputChange(e, "jobDetails", "pan", "uploads")}
            />
            <label>Others</label>
            <input
              type="file"
              onChange={(e) => handleInputChange(e, "jobDetails", "others", "uploads")}
            />
          </div>
        </div>

        {/* Error & Success Messages */}
        {(localErrors.length > 0 || errors.length > 0) && (
          <div className="staffsignup-error">
            {localErrors.map((err, i) => (
              <p key={i}>{err}</p>
            ))}
            {errors.map((err, i) => (
              <p key={i}>{err}</p>
            ))}
          </div>
        )}
        {success && <p className="staffsignup-success">{message}</p>}

        {/* Footer */}
        <div className="staffsignup-footer">
          <div className="staffsignup-terms">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I agree to the <a href="/terms">Terms and Conditions</a> and{" "}
              <a href="/privacy">Privacy Policy</a>
            </label>
          </div>
          <button type="submit" className="staffsignup-submit-button" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StaffSignup;
