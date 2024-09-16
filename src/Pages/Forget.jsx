import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiUrl from '../Common/ApiUrl';
import { useNavigate } from 'react-router-dom';

const Forget = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(new Array(4).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      await axios.post(`${ApiUrl}/api/users/forget-password/send-otp`, { email });
      toast.success('OTP sent successfully');
      setStep(2);
    } catch (error) {
      toast.error('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const otpCode = otp.join('');
      await axios.post(`${ApiUrl}/api/users/forget-password/verify-otp`, { email, otp: otpCode });
      toast.success('OTP verified successfully');
      setStep(3);
    } catch (error) {
      toast.error('Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${ApiUrl}/api/users/forget-password/reset-password`, { email, newPassword });
      toast.success('Password reset successfully');
      navigate("/")
      // Add your navigation logic here
    } catch (error) {
      toast.error('Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-16 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        {step === 1 && 'Forget Password'}
        {step === 2 && 'Enter OTP'}
        {step === 3 && 'Reset Password'}
      </h2>

      {step === 1 && (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            onClick={handleSendOtp}
            className="w-full p-3 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <div className="flex justify-center gap-4 mb-6">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={otp[index]}
                onChange={(e) => {
                  const newOtp = [...otp];
                  newOtp[index] = e.target.value;
                  setOtp(newOtp);

                  // Move to the next input if the current one is filled
                  if (e.target.value.length === 1 && index < otp.length - 1) {
                    document.getElementById(`otp-input-${index + 1}`).focus();
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && index > 0 && !e.target.value) {
                    document.getElementById(`otp-input-${index - 1}`).focus();
                  }
                }}
                id={`otp-input-${index}`} // Assign a unique ID to each OTP input field
                className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            ))}
          </div>
          <button
            onClick={handleVerifyOtp}
            className="w-full p-3 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            onClick={handleSubmitPassword}
            className="w-full p-3 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default Forget;
