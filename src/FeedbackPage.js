import React, { useState } from 'react';

const FeedbackPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent('Suggestion and Feedback');
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nSuggestion:\n${suggestion}\n\nFeedback:\n${feedback}`
    );

    const mailtoLink = `mailto:info@bookmypartys.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink; // This will redirect to the user's email client
  };

  const formStyle = {
    padding: '30px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '80%',
    maxWidth: '700px',
    margin: '0 auto',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
    fontSize: '28px',
    fontWeight: '600',
    letterSpacing: '1px',
  };

  const inputStyle = {
    padding: '12px',
    width: '100%',
    marginBottom: '15px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
    color: '#333',
    outline: 'none',
    transition: '0.3s ease',
  };

  const inputFocusStyle = {
    border: '1px solid #4CAF50',
    boxShadow: '0 0 8px rgba(76, 175, 80, 0.5)',
  };

  const buttonStyle = {
    padding: '14px 25px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    width: '100%',
    fontSize: '18px',
    transition: '0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#45a049',
  };

  const textAreaStyle = {
    padding: '12px',
    width: '100%',
    height: '150px',
    marginBottom: '15px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
    color: '#333',
    outline: 'none',
    transition: '0.3s ease',
  };

  const textAreaFocusStyle = {
    border: '1px solid #4CAF50',
    boxShadow: '0 0 8px rgba(76, 175, 80, 0.5)',
  };

  return (
    <div style={{ backgroundColor: '#f7f7f7', padding: '50px 0' }}>
      <h2 style={titleStyle}>We Value Your Feedback</h2>
      <form
        style={formStyle}
        onSubmit={handleSubmit}
      >
        <label style={{ fontSize: '16px', marginBottom: '8px' }}>Your Name:</label>
        <input
          type="text"
          style={inputStyle}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          required
        />

        <label style={{ fontSize: '16px', marginBottom: '8px' }}>Your Email:</label>
        <input
          type="email"
          style={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
        />

        <label style={{ fontSize: '16px', marginBottom: '8px' }}>Your Suggestion:</label>
        <textarea
          style={textAreaStyle}
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          placeholder="Please provide your suggestion"
          required
        />

        <label style={{ fontSize: '16px', marginBottom: '8px' }}>Your Feedback:</label>
        <textarea
          style={textAreaStyle}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Let us know your feedback"
          required
        />

        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackPage;
