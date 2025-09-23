import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearMessages, UserFormData, initialFormData } from './slices/userSlice';
import type { AppDispatch, RootState } from './store/store';
import './assets/css/CompanyForm.css';
import guestAvatar from './assets/image.png';

const UserForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, success } = useSelector((state: RootState) => state.user);

  const [formData, setFormData] = useState<UserFormData>(initialFormData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset success/error messages after 3 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => dispatch(clearMessages()), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  // Handle input changes and clear the corresponding error
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onload = () => setFormData(prev => ({ ...prev, profileImage: reader.result as string }));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Full validation
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.area.trim()) newErrors.area = 'Area is required';
    if (!formData.pin || !/^\d{6}$/.test(formData.pin)) newErrors.pin = 'Valid 6-digit PIN is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Valid 10-digit phone number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const resultAction = await dispatch(registerUser(formData)).unwrap();

      // ✅ Display backend success message
      if (resultAction?.message) {
        alert(resultAction.message); // or set some local state if you want custom display
      }

      setFormData(initialFormData); // Reset form on success
    } catch (err: any) {
      // ✅ Display backend error message
      if (err?.message) {
        alert(err.message); // or set some local state for error
      }
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="company-form-container">
      <h2 className="form-title">User Signup Form</h2>

      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}

      {/* Profile Image */}
      <div className="profile-image-container">
        <img
          src={formData.profileImage || guestAvatar}
          alt="Profile Preview"
          className="profile-image"
          onClick={() => document.getElementById('profileImage')?.click()}
        />
        <input
          type="file"
          id="profileImage"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="company-form-section">
        {['firstName', 'lastName', 'phone', 'email', 'password', 'confirmPassword'].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
            <input
              type={field.includes('password') ? 'password' : 'text'}
              name={field}
              value={(formData as any)[field]}
              onChange={handleChange}
            />
            {errors[field] && <span className="error">{errors[field]}</span>}
          </div>
        ))}

        <div className="form-group">
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <span className="error">{errors.gender}</span>}
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
          {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}
        </div>

        <div className="form-group">
          <label>Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Street Address" />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>

        <div className="form-group">
          <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
          <input type="text" name="area" value={formData.area} onChange={handleChange} placeholder="Area" />
          <input type="text" name="pin" value={formData.pin} onChange={handleChange} placeholder="PIN Code" />
          {(errors.city || errors.area || errors.pin) && (
            <span className="error">{errors.city || errors.area || errors.pin}</span>
          )}
        </div>

        <div className="form-group" style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting || loading}
            style={{
              backgroundColor: '#d8b573',
              color: '#000',
              padding: '10px 30px',
              border: 'none',
              borderRadius: '5px',
              cursor: isSubmitting || loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              width: '250px',
            }}
          >
            {isSubmitting || loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
