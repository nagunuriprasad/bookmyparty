import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store/store';
import { setLoginType, setField, loginUser } from './slices/loginSlice';
import { useNavigate } from 'react-router-dom';
import './assets/css/LoginForm.css';
import logo from './assets/BMP.png';

const LoginForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loginType,
    email,
    password,
    mobile,
    otp,
    otpSent,
    rememberMe,
    error,
    isLoading,
  } = useSelector((state: RootState) => state.login);

  const handleSendOtp = () => {
    if (!mobile || !/^\d{10}$/.test(mobile)) {
      dispatch(setField({ field: 'error', value: 'Enter a valid 10-digit mobile number' }));
      return;
    }
    dispatch(setField({ field: 'otpSent', value: true }));
    dispatch(setField({ field: 'error', value: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (loginType === 'email') {
      if (!email.trim() || !password.trim()) {
        dispatch(setField({ field: 'error', value: 'Enter email and password' }));
        return;
      }
      dispatch(setField({ field: 'error', value: '' }));
      dispatch(loginUser({ loginType, email, password }));
    } else {
      if (!otpSent) {
        dispatch(setField({ field: 'error', value: 'Request OTP first' }));
        return;
      }
      if (!otp.trim()) {
        dispatch(setField({ field: 'error', value: 'Enter OTP' }));
        return;
      }
      dispatch(setField({ field: 'error', value: '' }));
      dispatch(loginUser({ loginType, mobile, otp }));
    }
  };

  return (
    <div className="loginform-container">
      <div className="loginform-image">
        <img src={logo} alt="Book My Partys" />
      </div>

      <div className="login-form-events">
        <h2 className="login-form-header">Signin</h2>
        {error && <p className="error">{error}</p>}

        <div className="login-toggle">
          <button
            type="button"
            className={loginType === 'email' ? 'active' : ''}
            onClick={() => dispatch(setLoginType('email'))}
          >
            Email Login
          </button>
          <button
            type="button"
            className={loginType === 'mobile' ? 'active' : ''}
            onClick={() => dispatch(setLoginType('mobile'))}
          >
            Mobile Login
          </button>
        </div>

        <form className="form-style" onSubmit={handleSubmit}>
          {loginType === 'email' && (
            <>
              <div className="form-group-event input-container">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => dispatch(setField({ field: 'email', value: e.target.value }))}
                  required
                />
                <span className="icon email-icon">&#x2709;</span>
              </div>
              <div className="form-group-event input-container">
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => dispatch(setField({ field: 'password', value: e.target.value }))}
                  required
                />
                <span className="icon password-icon">&#x1f512;</span>
              </div>
            </>
          )}

          {loginType === 'mobile' && (
            <>
              <div className="form-group-event input-container">
                <input
                  type="tel"
                  placeholder="Enter mobile"
                  value={mobile}
                  maxLength={10}
                  onChange={(e) => dispatch(setField({ field: 'mobile', value: e.target.value }))}
                  required
                />
                <span className="icon mobile-icon">&#x260E;</span>
              </div>

              {!otpSent ? (
                <button type="button" className="loginform-button" onClick={handleSendOtp}>
                  Send OTP
                </button>
              ) : (
                <div className="form-group-event input-container">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => dispatch(setField({ field: 'otp', value: e.target.value }))}
                    required
                  />
                  <span className="icon">&#x1f4f1;</span>
                </div>
              )}
            </>
          )}

          {loginType === 'email' && (
            <div className="form-options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => dispatch(setField({ field: 'rememberMe', value: !rememberMe }))}
                />
                <label>Remember me</label>
              </div>
              <a href="/forgot-password" className="forgot-password">
                Forgot Password?
              </a>
            </div>
          )}

          {(loginType === 'email' || (loginType === 'mobile' && otpSent)) && (
            <button type="submit" className="loginform-button" disabled={isLoading}>
              {isLoading ? 'Loading...' : loginType === 'email' ? 'Signin Me' : 'Verify OTP'}
            </button>
          )}

          <div className="social-login">
            <button type="button" className="google-button">Login with Google</button>
            <button type="button" className="facebook-button">Login with Facebook</button>
          </div>

          <div className="signup-link">
            <p>Don't have an account? <a href="/UserForm">Sign up</a></p>
            <div className="signup-options-links">
              <button type="button" onClick={() => navigate('/CompanyForm')} className="link-btn">Vendor Signup</button>
              <button type="button" onClick={() => navigate('/StaffSignup')} className="link-btn">Staff Signup</button>
              <button type="button" onClick={() => navigate('/DeliveryForm')} className="link-btn">Delivery Boy Signup</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
