import React, { useState } from "react";


const EditStaffProfile = () => {
  const [formData, setFormData] = useState({
    personalInfo: {
      fullname: "",
      dob: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      permanentAddress: { city: "", area: "", pin: "" },
      presentAddress: { city: "", area: "", pin: "", pickupArea: "" },
      profileImage: "",
    },
    education: Array(5).fill({
      sno: "",
      qualification: "",
      year: "",
      marks: "",
      docs: "",
    }),
    jobDetails: {
      jobTitle: [],
      experience: "",
      expertIn: "",
      languages: [], // Updated to an array for multiple selections
      description: "",
      workType: "",
      subscription: "",
      uploads: { aadhar: "", cv: "", pan: "", others: "" },
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

  const handleLanguageChange = (e) => {
    const selectedLanguages = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({
      ...formData,
      jobDetails: {
        ...formData.jobDetails,
        languages: selectedLanguages, // Update languages as an array of selected languages
      },
    });
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    section: string,
    key: string,
    subSection: string
  ) => {
    const file = e.target.files?.[0] || "";
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [subSection]: {
          ...formData[section][subSection],
          [key]: file,
        },
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    // Validation checks
    if (!formData.personalInfo.fullname) newErrors.push("Full Name is required");
    if (!formData.personalInfo.email) newErrors.push("Email is required");
    if (!formData.personalInfo.password) newErrors.push("Password is required");
    if (formData.personalInfo.password !== formData.personalInfo.confirmPassword)
      newErrors.push("Passwords do not match");
    if (!agreedToTerms)
      newErrors.push("You must agree to the terms and conditions.");

    if (newErrors.length === 0) {
      console.log("Form submitted", formData);
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
    <div>
      <div className="staffsignup-container">
        <h1 className="staffsignup-header">Edit My Profile</h1>

        {/* Profile Image Upload Section */}
        <div className="staffsignup-profile-image-container">
          <img
            src={formData.personalInfo.profileImage}
            alt="Profile"
            className="staffsignup-profile-image"
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <form className="staffsignup-form" onSubmit={handleSubmit}>
          <div className="staffsignup-forms-container">
            {/* Personal Information Form */}
            <div className="staffsignup-form-section">
              <h2>Personal Information</h2>
              <div className="name-input-container">
                <input
                  type="text"
                  placeholder="First Name"
                  value={formData.personalInfo.firstName}
                  onChange={(e) =>
                    handleInputChange(e, "personalInfo", "firstName")
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={formData.personalInfo.lastName}
                  onChange={(e) =>
                    handleInputChange(e, "personalInfo", "lastName")
                  }
                  required
                />
              </div>

              <input
                type="date"
                placeholder="Date of Birth"
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
                onChange={(e) =>
                  handleInputChange(e, "personalInfo", "password")
                }
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={formData.personalInfo.confirmPassword}
                onChange={(e) =>
                  handleInputChange(e, "personalInfo", "confirmPassword")
                }
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

              {/* Permanent Address */}
              <h3>Permanent Address</h3>
              <input
                type="text"
                placeholder="Address"
                value={formData.personalInfo.permanentAddress.city}
                onChange={(e) =>
                  handleInputChange(
                    e,
                    "personalInfo",
                    "city",
                    "permanentAddress"
                  )
                }
                required
              />
              <input
                type="text"
                placeholder="City"
                value={formData.personalInfo.permanentAddress.city}
                onChange={(e) =>
                  handleInputChange(
                    e,
                    "personalInfo",
                    "city",
                    "permanentAddress"
                  )
                }
                required
              />
              <input
                type="text"
                placeholder="Area"
                value={formData.personalInfo.permanentAddress.area}
                onChange={(e) =>
                  handleInputChange(
                    e,
                    "personalInfo",
                    "area",
                    "permanentAddress"
                  )
                }
                required
              />
              <input
                type="text"
                placeholder="Pin Code"
                value={formData.personalInfo.permanentAddress.pin}
                onChange={(e) =>
                  handleInputChange(
                    e,
                    "personalInfo",
                    "pin",
                    "permanentAddress"
                  )
                }
                required
              />

              {/* Present Address */}
              <h3>Present Address</h3>
              <input
                type="text"
                placeholder="Address"
                value={formData.personalInfo.permanentAddress.city}
                onChange={(e) =>
                  handleInputChange(
                    e,
                    "personalInfo",
                    "city",
                    "permanentAddress"
                  )
                }
                required
              />
              <input
                type="text"
                placeholder="City"
                value={formData.personalInfo.presentAddress.city}
                onChange={(e) =>
                  handleInputChange(e, "personalInfo", "city", "presentAddress")
                }
                required
              />
              <input
                type="text"
                placeholder="Area"
                value={formData.personalInfo.presentAddress.area}
                onChange={(e) =>
                  handleInputChange(e, "personalInfo", "area", "presentAddress")
                }
                required
              />
              <input
                type="text"
                placeholder="Pin Code"
                value={formData.personalInfo.presentAddress.pin}
                onChange={(e) =>
                  handleInputChange(e, "personalInfo", "pin", "presentAddress")
                }
                required
              />
            </div>

            {/* Education Qualification Form */}
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
                  </tr>
                </thead>
                <tbody>
                  {/* Row 1 */}
                  <tr>
                    <td>
                      <input
                        type="text"
                        value={formData.education[0].sno}
                        onChange={(e) =>
                          handleInputChange(e, "education", "sno", "0")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={formData.education[0].qualification}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "education",
                            "qualification",
                            "0"
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={formData.education[0].year}
                        onChange={(e) =>
                          handleInputChange(e, "education", "year", "0")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={formData.education[0].marks}
                        onChange={(e) =>
                          handleInputChange(e, "education", "marks", "0")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="file"
                        value={formData.education[0].docs}
                        onChange={(e) =>
                          handleInputChange(e, "education", "docs", "0")
                        }
                      />
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr>
                    <td>
                      <input
                        type="text"
                        value={formData.education[1].sno}
                        onChange={(e) =>
                          handleInputChange(e, "education", "sno", "1")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={formData.education[1].qualification}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "education",
                            "qualification",
                            "1"
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={formData.education[1].year}
                        onChange={(e) =>
                          handleInputChange(e, "education", "year", "1")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={formData.education[1].marks}
                        onChange={(e) =>
                          handleInputChange(e, "education", "marks", "1")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="file"
                        value={formData.education[1].docs}
                        onChange={(e) =>
                          handleInputChange(e, "education", "docs", "1")
                        }
                      />
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr>
                    <td>
                      <input
                        type="text"
                        value={formData.education[2].sno}
                        onChange={(e) =>
                          handleInputChange(e, "education", "sno", "2")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={formData.education[2].qualification}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "education",
                            "qualification",
                            "2"
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={formData.education[2].year}
                        onChange={(e) =>
                          handleInputChange(e, "education", "year", "2")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={formData.education[2].marks}
                        onChange={(e) =>
                          handleInputChange(e, "education", "marks", "2")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="file"
                        value={formData.education[2].docs}
                        onChange={(e) =>
                          handleInputChange(e, "education", "docs", "2")
                        }
                      />
                    </td>
                  </tr>

                  {/* Row 4 */}
                  <tr>
                    <td>
                      <input
                        type="text"
                        value={formData.education[3].sno}
                        onChange={(e) =>
                          handleInputChange(e, "education", "sno", "3")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={formData.education[3].qualification}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "education",
                            "qualification",
                            "3"
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={formData.education[3].year}
                        onChange={(e) =>
                          handleInputChange(e, "education", "year", "3")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={formData.education[3].marks}
                        onChange={(e) =>
                          handleInputChange(e, "education", "marks", "3")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="file"
                        value={formData.education[3].docs}
                        onChange={(e) =>
                          handleInputChange(e, "education", "docs", "3")
                        }
                      />
                    </td>
                  </tr>

                  {/* Row 5 */}
                  <tr>
                    <td>
                      <input
                        type="text"
                        value={formData.education[4].sno}
                        onChange={(e) =>
                          handleInputChange(e, "education", "sno", "4")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={formData.education[4].qualification}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "education",
                            "qualification",
                            "4"
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={formData.education[4].year}
                        onChange={(e) =>
                          handleInputChange(e, "education", "year", "4")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={formData.education[4].marks}
                        onChange={(e) =>
                          handleInputChange(e, "education", "marks", "4")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="file"
                        value={formData.education[4].docs}
                        onChange={(e) =>
                          handleInputChange(e, "education", "docs", "4")
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Job Details Form */}
            <div className="staffsignup-form-section">
              <h2>Job Details</h2>
              <select
                value={formData.jobDetails.jobTitle}
                onChange={(e) => handleInputChange(e, "jobDetails", "jobTitle")}
                required
              >
                <option value="">Select Job Title</option>
                <option value="Cook">Cook</option>
                <option value="Helper">Helper</option>
                <option value="Chef">Chef</option>
                <option value="Master Chefs">Master Chefs</option>
                <option value="Chefs">Chefs</option>
                <option value="Assistant Chefs">Assistant Chefs</option>
                <option value="Stage Setup Boys">Stage Setup Boys</option>
                <option value="Flower Décor Boys">Flower Décor Boys</option>
                <option value="Balloon Setup Boys">Balloon Setup Boys</option>
                <option value="Catering Boys">Catering Boys</option>
                <option value="Food Pickup Boys">Food Pickup Boys</option>
                <option value="Buffet Service Boys">Buffet Service Boys</option>
                <option value="Hotel Management Boys">Hotel Management Boys</option>
                <option value="Welcome Girls">Welcome Girls</option>
                <option value="Chinese Girls">Chinese Girls</option>
                <option value="Foreign Girls for Welcome">Foreign Girls for Welcome</option>
                <option value="HM Girls">HM Girls</option>
                <option value="Couple Service">Couple Service</option>
                <option value="Liquor Service Boys">Liquor Service Boys</option>
                <option value="Cocktails Service Boys">Cocktails Service Boys</option>
                <option value="Bar Tenders">Bar Tenders</option>
              </select>
              <input
                type="text"
                placeholder="Work Experience"
                value={formData.jobDetails.experience}
                onChange={(e) =>
                  handleInputChange(e, "jobDetails", "experience")
                }
                required
              />
              <select
                value={formData.jobDetails.jobTitle}
                onChange={(e) => handleInputChange(e, "jobDetails", "jobTitle")}
                required
              >
                <option value="">Expert In</option>
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
                <option value="South Indian">South Indian</option>
                <option value="North Indian">North Indian</option>
              </select>
             <select
                multiple
                value={formData.jobDetails.jobTitle}
                onChange={(e) => handleInputChange(e, "jobDetails", "jobTitle")}
                required
              >
                <option value="Hindi">Hindi</option>
                <option value="Bengali">Bengali</option>
                <option value="Telugu">Telugu</option>
                <option value="Marathi">Marathi</option>
                <option value="Tamil">Tamil</option>
                <option value="Urdu">Urdu</option>
                <option value="Gujarati">Gujarati</option>
                <option value="Malayalam">Malayalam</option>
                <option value="Kannada">Kannada</option>
                <option value="Odia">Odia</option>
                <option value="Punjabi">Punjabi</option>
                <option value="Assamese">Assamese</option>
                <option value="Maithili">Maithili</option>
                <option value="Sanskrit">Sanskrit</option>
                <option value="Konkani">Konkani</option>
                <option value="Sindhi">Sindhi</option>
                <option value="Dogri">Dogri</option>
                <option value="Manipuri">Manipuri</option>
                <option value="Bodo">Bodo</option>
                <option value="Santali">Santali</option>
                <option value="Kashmiri">Kashmiri</option>
                <option value="Nepali">Nepali</option>
              </select>

              <textarea
                placeholder="Description"
                value={formData.jobDetails.description}
                onChange={(e) =>
                  handleInputChange(e, "jobDetails", "description")
                }
                required
              ></textarea>
              <select
                value={formData.jobDetails.jobTitle}
                onChange={(e) => handleInputChange(e, "jobDetails", "jobTitle")}
                required
              >
                <option value="">Work Type</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Only on Weekends (Sun + Sat)">
                  Only on Weekends (Sun + Sat)
                </option>
              </select>
              <select
                value={formData.jobDetails.jobTitle}
                onChange={(e) => handleInputChange(e, "jobDetails", "jobTitle")}
                required
              >
                <option value="">Subscription</option>
                <option value="Basic">Basic</option>
                <option value="Standard">Standard</option>
                <option value="VIP">VIP</option>
                <option value="Premium">Premium</option>
              </select>

              <h3>Uploads</h3>
              <div className="staffsignup-upload-section">
                <label>Aadhar</label>
                <input
                  type="file"
                  onChange={(e) =>
                    handleFileUpload(e, "jobDetails", "aadhar", "uploads")
                  }
                />
                <label>CV</label>
                <input
                  type="file"
                  onChange={(e) =>
                    handleFileUpload(e, "jobDetails", "cv", "uploads")
                  }
                />
                <label>PAN</label>
                <input
                  type="file"
                  onChange={(e) =>
                    handleFileUpload(e, "jobDetails", "pan", "uploads")
                  }
                />
                <label>Others</label>
                <input
                  type="file"
                  onChange={(e) =>
                    handleFileUpload(e, "jobDetails", "others", "uploads")
                  }
                />
              </div>
            </div>
          </div>

          {/* Error Handling */}
          {errors.length > 0 && (
            <div className="staffsignup-error">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}

          <div className="staffsignup-footer">
            <div className="staffsignup-terms">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I agree to the <a href="/terms"> Terms and Conditions</a> and{" "}
                <a href="/privacy">Privacy Policy</a>
              </label>
            </div>
            <button type="submit" className="staffsignup-submit-button">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStaffProfile;
