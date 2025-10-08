import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './assets/css/LoginForm.css';
import logo from './assets/BMP.png'; // Adjust the path if needed

const LoginForm = () => {
  const [loginType, setLoginType] = useState<'email' | 'mobile'>('email');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (!mobile || mobile.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    console.log("Sending OTP to:", mobile);
    setOtpSent(true);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (loginType === 'email') {
      if (!email || !password) {
        setError('Please enter email and password');
        return;
      }
      console.log("Logging in with email:", email, password);
    }

    if (loginType === 'mobile') {
      if (!otpSent) {
        setError('Please request an OTP first');
        return;
      }
      if (!otp) {
        setError('Please enter the OTP sent to your mobile');
        return;
      }
      console.log("Verifying OTP:", otp, "for mobile:", mobile);
    }

    setError('');
  };

  return (
    <div className="loginform-container">
      {/* Logo */}
      <div className="loginform-image">
        <img src={logo} alt="Book My Partys" />
      </div>

      {/* Login Section */}
      <div className="login-form-events">
        <h2 className="login-form-header">Signin</h2>
        {error && <p className="error">{error}</p>}

        {/* Toggle */}
        <div className="login-toggle">
          <button
            type="button"
            className={loginType === 'email' ? 'active' : ''}
            onClick={() => {
              setLoginType('email');
              setOtpSent(false);
              setOtp('');
            }}
          >
            Email Login
          </button>
          <button
            type="button"
            className={loginType === 'mobile' ? 'active' : ''}
            onClick={() => {
              setLoginType('mobile');
              setPassword('');
            }}
          >
            Mobile Login
          </button>
        </div>

        <form className="form-style" onSubmit={handleSubmit}>
          {/* Email Login */}
          {loginType === 'email' && (
            <>
              <div className="form-group-event input-container">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
                <span className="icon email-icon">&#x2709;</span>
              </div>
              <div className="form-group-event input-container">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <span className="icon password-icon">&#x1f512;</span>
              </div>
            </>
          )}

          {/* Mobile Login */}
          {loginType === 'mobile' && (
            <>
              <div className="form-group-event input-container">
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter your mobile number"
                  pattern="[0-9]{10}"
                  maxLength={10}
                />
                <span className="icon mobile-icon">&#x260E;</span>
              </div>

              {!otpSent ? (
                <button
                  type="button"
                  className="loginform-button"
                  onClick={handleSendOtp}
                >
                  Send OTP
                </button>
              ) : (
                <div className="form-group-event input-container">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    maxLength={6}
                  />
                  <span className="icon">&#x1f4f1;</span>
                </div>
              )}
            </>
          )}

          {/* Remember Me */}
          {loginType === 'email' && (
            <div className="form-options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label>Remember me</label>
              </div>
              <a href="/forgot-password" className="forgot-password">
                Forgot Password?
              </a>
            </div>
          )}

          {/* Submit */}
          {loginType === 'email' || (loginType === 'mobile' && otpSent) ? (
            <button type="submit" className="loginform-button">
              {loginType === 'email' ? 'Signin Me' : 'Verify OTP'}
            </button>
          ) : null}

          {/* Social */}
          <div className="social-login">
            <button type="button" className="google-button">
              Login with Google
            </button>
            <button type="button" className="facebook-button">
              Login with Facebook
            </button>
          </div>

          {/* Signup Links */}
          <div className="signup-link">
             <p>
              Don't have an account? <a href="/UserForm">Sign up</a>
            </p>
            <div className="signup-options-links">
             
              <button type="button" onClick={() => navigate('/CompanyForm')} className="link-btn">
                Vendor Signup
              </button>
              <button type="button" onClick={() => navigate('/StaffSignup')} className="link-btn">
                Staff Signup
              </button>
              <button type="button" onClick={() => navigate('/DeliveryForm')} className="link-btn">
                Delivery Boy Signup
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
