import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';

function ResetPasswordForm() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formStep, setFormStep] = useState('sendOTP');

  const sendOTP = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api-v2/forgot/${email}`);
      if (response.ok) {
        setFormStep('verifyOTP');
      } else {
        const data = await response.json();
        setPasswordError(data.message || 'Failed to send OTP. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setPasswordError('Failed to send OTP. Please try again later.');
    }
  };

  const verifyOTP = async () => {
    try {
      const response = await fetch('http://localhost:8081/api-v2/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        setFormStep('changePassword');
      } else {
        const data = await response.json();
        setPasswordError(data || 'Failed to verify OTP. Please enter the correct OTP.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setPasswordError('Failed to verify OTP. Please try again later.');
    }
  };

  // Update the changePassword function to accept email as a parameter
  const changePassword = async (email) => {
    try {
      
      const response = await fetch(`http://localhost:8081/api-v2/employeeForgotPasswordChange?email=${email}&newPassword=${newPassword}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({ email, newPassword }),
        
      });
       
      const data = await response.json();
  
      if (response.ok) {
        // Password changed successfully
        setPasswordError('');
        setFormStep('success');
      } else {
        // Password change failed, display error message
        setPasswordError(data.message || 'Failed to change password. Please try again later.');
      }
    } catch (success) {
      alert('Password changed successfully.');
    }
  };
  

// Modify the handleSubmit function to pass the email parameter to changePassword
const handleSubmit = (e) => {
  e.preventDefault();
  if (formStep === 'sendOTP') {
    sendOTP();
  } else if (formStep === 'verifyOTP') {
    verifyOTP();
  } else if (formStep === 'changePassword') {
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
    } else {
      setPasswordError('');
      // Pass the email state as a parameter to changePassword
      changePassword(email);
    }
  }
};


  return (
    <div className='container-fluid'>
      <div className='row justify-content-center align-items-center min-vh-100'>
        <div className='col-md-4'>
          <div className="card" style={{ width: '23rem', height: 'auto', borderColor: 'lightblue' }}>
            <div className="card-body">
              <h2 className='card-title text-center'>Reset Password</h2>

              {formStep === 'sendOTP' && (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3" style={{ marginTop: '3rem' }}>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <span className="input-group-text"><i className="bi bi-envelope-fill"></i></span>
                    </div>
                    {passwordError && <div className="text-danger mt-2">{passwordError}</div>}
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Send OTP</button>
                </form>
              )}

              {formStep === 'verifyOTP' && (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3" style={{ marginTop: '3rem' }}>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder='Enter OTP'
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                      />
                      <span className="input-group-text"><i className="bi bi-key-fill"></i></span>
                    </div>
                    {passwordError && <div className="text-danger mt-2">{passwordError}</div>}
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Verify OTP</button>
                </form>
              )}
              {formStep === 'changePassword' && (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3" style={{ marginTop: '3rem' }}>
                    <div className="input-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder='Enter new password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                      <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
                    </div>
                    {passwordError && <div className="text-danger mt-2">{passwordError}</div>}
                  </div>
                  <div className="mb-3">
                    <div className="input-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder='Confirm new password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
                    </div>
                    {passwordError && <div className="text-danger mt-2">{passwordError}</div>}
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Submit</button>
                </form>
              )}

              {successMessage && (
                <div className="alert alert-success mt-3" role="alert">
                  {successMessage}
                </div>
              )}

              <div className="mt-3 text-center">
                <Link to="/">Back to Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordForm;
