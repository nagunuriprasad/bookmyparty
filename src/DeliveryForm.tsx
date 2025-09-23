import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updatePersonalInfo,
  updateEducation,
  updateJobDetails,
  submitDeliveryForm,
} from './slices/deliveryFormSlice';
import { RootState, AppDispatch } from './store/store';
import './assets/css/DeliveryForm.css';
import guestAvatar from './assets/image.png';

interface FieldErrors {
  [key: string]: string;
}

const DeliveryForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const formData = useSelector((state: RootState) => state.deliveryForm);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  // Profile preview
  const [profilePreview, setProfilePreview] = useState<string>(
    typeof formData.personalInfo.profileImage === 'string'
      ? formData.personalInfo.profileImage
      : ''
  );

  // Input change handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    section: 'personalInfo' | 'jobDetails',
    key: string,
    subSection?: string
  ) => {
    const value = e.target.value;
    if (section === 'personalInfo') {
      dispatch(updatePersonalInfo({ key, value, subSection }));
    } else {
      dispatch(updateJobDetails({ key, value, subSection }));
    }
    // Clear field error
    setErrors(prev => ({ ...prev, [`${subSection ? subSection + '.' : ''}${key}`]: '' }));
  };

  // Education change
  const handleEducationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    key: string
  ) => {
    const value = key === 'docs' ? e.target.files?.[0] || null : e.target.value;
    dispatch(updateEducation({ index, key, value }));
    setErrors(prev => ({ ...prev, [`education.${index}.${key}`]: '' }));
  };

  // File upload
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
    subSection: string
  ) => {
    const file = e.target.files?.[0] || null;
    dispatch(updateJobDetails({ key, value: file, subSection }));
    setErrors(prev => ({ ...prev, [`${subSection}.${key}`]: '' }));
  };

  // Profile image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePreview(URL.createObjectURL(file));
      dispatch(updatePersonalInfo({ key: 'profileImage', value: file }));
      setErrors(prev => ({ ...prev, profileImage: '' }));
    }
  };

  // Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FieldErrors = {};

    // Personal Info
    if (!formData.personalInfo.firstName.trim()) newErrors['firstName'] = 'First Name is required';
    if (!formData.personalInfo.lastName.trim()) newErrors['lastName'] = 'Last Name is required';
    if (!formData.personalInfo.email.trim()) newErrors['email'] = 'Email is required';
    if (!formData.personalInfo.password.trim()) newErrors['password'] = 'Password is required';
    if (formData.personalInfo.password !== formData.personalInfo.confirmPassword)
      newErrors['confirmPassword'] = 'Passwords do not match';
    if (!formData.personalInfo.dob) newErrors['dob'] = 'Date of Birth is required';
    if (!formData.personalInfo.phone.trim()) newErrors['phone'] = 'Phone number is required';
    if (!formData.personalInfo.gender) newErrors['gender'] = 'Gender is required';
    if (!formData.personalInfo.profileImage) newErrors['profileImage'] = 'Profile image is required';

    // Addresses
    const { permanentAddress, presentAddress } = formData.personalInfo;
    if (!permanentAddress.addressLine) newErrors['permanentAddress.addressLine'] = 'Permanent address required';
    if (!permanentAddress.city) newErrors['permanentAddress.city'] = 'Permanent city required';
    if (!permanentAddress.area) newErrors['permanentAddress.area'] = 'Permanent area required';
    if (!permanentAddress.pin) newErrors['permanentAddress.pin'] = 'Permanent pin required';

    if (!presentAddress.addressLine) newErrors['presentAddress.addressLine'] = 'Present address required';
    if (!presentAddress.city) newErrors['presentAddress.city'] = 'Present city required';
    if (!presentAddress.area) newErrors['presentAddress.area'] = 'Present area required';
    if (!presentAddress.pin) newErrors['presentAddress.pin'] = 'Present pin required';

    // Education
    formData.education.forEach((edu, i) => {
      if (!edu.sno) newErrors[`education.${i}.sno`] = 'SI No required';
      if (!edu.qualification) newErrors[`education.${i}.qualification`] = 'Qualification required';
      if (!edu.year) newErrors[`education.${i}.year`] = 'Year required';
      if (!edu.marks) newErrors[`education.${i}.marks`] = 'Marks required';
      if (!edu.docs) newErrors[`education.${i}.docs`] = 'Document required';
    });

    // Job
    if (!formData.jobDetails.jobTitle) newErrors['jobDetails.jobTitle'] = 'Job Title required';
    if (!formData.jobDetails.experience) newErrors['jobDetails.experience'] = 'Experience required';
    if (!formData.jobDetails.uploads.aadhar) newErrors['jobDetails.uploads.aadhar'] = 'Aadhar required';
    if (!formData.jobDetails.uploads.cv) newErrors['jobDetails.uploads.cv'] = 'CV required';
    if (!formData.jobDetails.uploads.pan) newErrors['jobDetails.uploads.pan'] = 'PAN required';
    if (!formData.jobDetails.uploads.others)
      newErrors['jobDetails.uploads.others'] = 'Vehicle & license required';

    // Terms
    if (!agreedToTerms) newErrors['agreedToTerms'] = 'You must agree to terms';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      dispatch(submitDeliveryForm(formData));
    }
  };

  const getError = (key: string) => errors[key];

  return (
    <div className="deliveryform-container">
      <h1 className="deliveryform-header">Delivery Signup</h1>

      <div className="deliveryform-profile-image-container">
        <img src={profilePreview || guestAvatar} alt="Profile" className="deliveryform-profile-image" />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {getError('profileImage') && <p className="deliveryform-error">{getError('profileImage')}</p>}
      </div>

      <form className="deliveryform-form" onSubmit={handleSubmit}>
        <div className="deliveryform-forms-container">
          {/* Personal Info */}
          <div className="deliveryform-form-section">
            <h2>Personal Information</h2>
            <input
              type="text"
              placeholder="First Name"
              value={formData.personalInfo.firstName}
              onChange={(e) => handleInputChange(e, 'personalInfo', 'firstName')}
            />
            {getError('firstName') && <p className="deliveryform-error">{getError('firstName')}</p>}

            <input
              type="text"
              placeholder="Last Name"
              value={formData.personalInfo.lastName}
              onChange={(e) => handleInputChange(e, 'personalInfo', 'lastName')}
            />
            {getError('lastName') && <p className="deliveryform-error">{getError('lastName')}</p>}

            <input
              type="date"
              placeholder="Date of Birth"
              value={formData.personalInfo.dob}
              onChange={(e) => handleInputChange(e, 'personalInfo', 'dob')}
            />
            {getError('dob') && <p className="deliveryform-error">{getError('dob')}</p>}

            <input
              type="text"
              placeholder="Phone Number"
              value={formData.personalInfo.phone}
              onChange={(e) => handleInputChange(e, 'personalInfo', 'phone')}
            />
            {getError('phone') && <p className="deliveryform-error">{getError('phone')}</p>}

            <input
              type="email"
              placeholder="Email ID"
              value={formData.personalInfo.email}
              onChange={(e) => handleInputChange(e, 'personalInfo', 'email')}
            />
            {getError('email') && <p className="deliveryform-error">{getError('email')}</p>}

            <input
              type="password"
              placeholder="Password"
              value={formData.personalInfo.password}
              onChange={(e) => handleInputChange(e, 'personalInfo', 'password')}
            />
            {getError('password') && <p className="deliveryform-error">{getError('password')}</p>}

            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.personalInfo.confirmPassword}
              onChange={(e) => handleInputChange(e, 'personalInfo', 'confirmPassword')}
            />
            {getError('confirmPassword') && <p className="deliveryform-error">{getError('confirmPassword')}</p>}

            <select
              value={formData.personalInfo.gender}
              onChange={(e) => handleInputChange(e, 'personalInfo', 'gender')}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {getError('gender') && <p className="deliveryform-error">{getError('gender')}</p>}

            {/* Permanent Address */}
            <h3>Permanent Address</h3>
            <input
              type="text"
              placeholder="Address"
              value={formData.personalInfo.permanentAddress.addressLine}
              onChange={(e) =>
                handleInputChange(e, 'personalInfo', 'addressLine', 'permanentAddress')
              }
            />
            {getError('permanentAddress.addressLine') && <p className="deliveryform-error">{getError('permanentAddress.addressLine')}</p>}

            <input
              type="text"
              placeholder="City"
              value={formData.personalInfo.permanentAddress.city}
              onChange={(e) => handleInputChange(e, 'personalInfo', 'city', 'permanentAddress')}
            />
            {getError('permanentAddress.city') && <p className="deliveryform-error">{getError('permanentAddress.city')}</p>}

            <input
              type="text"
              placeholder="Area"
              value={formData.personalInfo.permanentAddress.area}
              onChange={(e) => handleInputChange(e, 'personalInfo', 'area', 'permanentAddress')}
            />
            {getError('permanentAddress.area') && <p className="deliveryform-error">{getError('permanentAddress.area')}</p>}

            <input
              type="text"
              placeholder="Pin Code"
              value={formData.personalInfo.permanentAddress.pin}
              onChange={(e) => handleInputChange(e, 'personalInfo', 'pin', 'permanentAddress')}
            />
            {getError('permanentAddress.pin') && <p className="deliveryform-error">{getError('permanentAddress.pin')}</p>}

            {/* Present Address */}
            <h3>Present Address</h3>
            <input
              type="text"
              placeholder="Address"
              value={formData.personalInfo.presentAddress.addressLine}
              onChange={(e) =>
                handleInputChange(e, 'personalInfo', 'addressLine', 'presentAddress')
              }
            />
            {getError('presentAddress.addressLine') && <p className="deliveryform-error">{getError('presentAddress.addressLine')}</p>}

            <input
              type="text"
              placeholder="City"
              value={formData.personalInfo.presentAddress.city}
              onChange={(e) => handleInputChange(e, 'personalInfo', 'city', 'presentAddress')}
            />
            {getError('presentAddress.city') && <p className="deliveryform-error">{getError('presentAddress.city')}</p>}

            <input
              type="text"
              placeholder="Area"
              value={formData.personalInfo.presentAddress.area}
              onChange={(e) => handleInputChange(e, 'personalInfo', 'area', 'presentAddress')}
            />
            {getError('presentAddress.area') && <p className="deliveryform-error">{getError('presentAddress.area')}</p>}

            <input
              type="text"
              placeholder="Pin Code"
              value={formData.personalInfo.presentAddress.pin}
              onChange={(e) => handleInputChange(e, 'personalInfo', 'pin', 'presentAddress')}
            />
            {getError('presentAddress.pin') && <p className="deliveryform-error">{getError('presentAddress.pin')}</p>}
          </div>

          {/* Education */}
          <div className="deliveryform-form-section">
            <h2>Education Qualification</h2>
            <table>
              <thead>
                <tr>
                  <th>SI No</th>
                  <th>Qualification</th>
                  <th>Year</th>
                  <th>Marks %</th>
                  <th>Upload Docs</th>
                </tr>
              </thead>
              <tbody>
                {formData.education.map((edu, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        value={edu.sno}
                        onChange={(e) => handleEducationChange(e, index, 'sno')}
                      />
                      {getError(`education.${index}.sno`) && <p className="deliveryform-error">{getError(`education.${index}.sno`)}</p>}
                    </td>
                    <td>
                      <input
                        type="text"
                        value={edu.qualification}
                        onChange={(e) => handleEducationChange(e, index, 'qualification')}
                      />
                      {getError(`education.${index}.qualification`) && <p className="deliveryform-error">{getError(`education.${index}.qualification`)}</p>}
                    </td>
                    <td>
                      <input
                        type="text"
                        value={edu.year}
                        onChange={(e) => handleEducationChange(e, index, 'year')}
                      />
                      {getError(`education.${index}.year`) && <p className="deliveryform-error">{getError(`education.${index}.year`)}</p>}
                    </td>
                    <td>
                      <input
                        type="text"
                        value={edu.marks}
                        onChange={(e) => handleEducationChange(e, index, 'marks')}
                      />
                      {getError(`education.${index}.marks`) && <p className="deliveryform-error">{getError(`education.${index}.marks`)}</p>}
                    </td>
                    <td>
                      <input
                        type="file"
                        onChange={(e) => handleEducationChange(e, index, 'docs')}
                      />
                      {getError(`education.${index}.docs`) && <p className="deliveryform-error">{getError(`education.${index}.docs`)}</p>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Job Details */}
          <div className="deliveryform-form-section">
            <h2>Delivery Job Details</h2>
            <select
              value={formData.jobDetails.jobTitle}
              onChange={(e) => handleInputChange(e, 'jobDetails', 'jobTitle')}
            >
              <option value="">Select Job Title</option>
              <option value="Delivery Executive (2 Wheeler)">Delivery Executive (2 Wheeler)</option>
              <option value="Delivery Executive (3 Wheeler)">Delivery Executive (3 Wheeler)</option>
              <option value="Delivery Executive (4 Wheeler)">Delivery Executive (4 Wheeler)</option>
            </select>
            {getError('jobDetails.jobTitle') && <p className="deliveryform-error">{getError('jobDetails.jobTitle')}</p>}

            <input
              type="text"
              placeholder="Work Experience"
              value={formData.jobDetails.experience}
              onChange={(e) => handleInputChange(e, 'jobDetails', 'experience')}
            />
            {getError('jobDetails.experience') && <p className="deliveryform-error">{getError('jobDetails.experience')}</p>}

            <h3>Uploads</h3>
            <label>Aadhar</label>
            <input type="file" onChange={(e) => handleFileUpload(e, 'aadhar', 'uploads')} />
            {getError('jobDetails.uploads.aadhar') && <p className="deliveryform-error">{getError('jobDetails.uploads.aadhar')}</p>}

            <label>CV</label>
            <input type="file" onChange={(e) => handleFileUpload(e, 'cv', 'uploads')} />
            {getError('jobDetails.uploads.cv') && <p className="deliveryform-error">{getError('jobDetails.uploads.cv')}</p>}

            <label>PAN</label>
            <input type="file" onChange={(e) => handleFileUpload(e, 'pan', 'uploads')} />
            {getError('jobDetails.uploads.pan') && <p className="deliveryform-error">{getError('jobDetails.uploads.pan')}</p>}

            <label>Vehicle Registration & Driving License</label>
            <input type="file" onChange={(e) => handleFileUpload(e, 'others', 'uploads')} />
            {getError('jobDetails.uploads.others') && <p className="deliveryform-error">{getError('jobDetails.uploads.others')}</p>}
          </div>

          {/* Terms & Submit */}
          <div className="deliveryform-terms">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={() => setAgreedToTerms(!agreedToTerms)}
            />
            <label>I agree to the terms and conditions.</label>
            {getError('agreedToTerms') && <p className="deliveryform-error">{getError('agreedToTerms')}</p>}
          </div>

          <button type="submit" className="deliveryform-submit-btn">Submit</button>
        </div>
      </form>

      {formData.successMessage && (
        <div className="deliveryform-success">{formData.successMessage}</div>
      )}
    </div>
  );
};

export default DeliveryForm;
