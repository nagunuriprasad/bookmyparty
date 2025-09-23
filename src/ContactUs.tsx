import React, { useState } from 'react';
import './assets/css/ContactUs.css';

interface FormData {
  name: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
}

const ContactUs = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
    } else {
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    let newErrors: Partial<FormData> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.mobile) newErrors.mobile = 'Mobile Number is required';
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.message) newErrors.message = 'Message is required';
    return newErrors;
  };

  return (
    <div className="contactus-container">
      <section className="contact-section">
      <h2 className="contactus-heading">CONTACT US</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <div>
            <label className="contactus-label" >Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div>
            <label className="contactus-label" >Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div>
            <label className="contactus-label">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
            {errors.mobile && <span className="error">{errors.mobile}</span>}
          </div>
          <div>
            <label className="contactus-label">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
            {errors.subject && <span className="error">{errors.subject}</span>}
          </div>
          <div>
            <label className="contactus-label">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && <span className="error">{errors.message}</span>}
          </div>
          <div className="contactus-button-container">
  <button type="submit" className="contactus-button">Submit</button>
</div>

        </form>
      </section>
    </div>
  );
};

export default ContactUs;
