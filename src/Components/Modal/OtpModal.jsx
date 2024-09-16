// //8jul24
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const OTPModal = ({ isOpen, onClose, onVerify, email }) => {
//   const [otp, setOtp] = useState(['', '', '', '']);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     setOtp(['', '', '', '']); // Reset OTP fields when modal opens
//   }, [isOpen]);

//   const handleChange = (e, index) => {
//     const newOtp = [...otp];
//     newOtp[index] = e.target.value;
//     setOtp(newOtp);
//   };

//   const handleVerify = async () => {
//     const otpCode = otp.join('');
//     setIsLoading(true);
//     try {
//       const response = await axios.post('https://2lkz6gq8-5002.inc1.devtunnels.ms/api/users/verify-otp', { otp: otpCode, email });

//       console.log("otp data verified", response.data);

//       if (response.data.message === "success") {
//         onVerify(otpCode);
//       } else {
//         alert('OTP verification failed');
//       }
//     } catch (error) {
//       console.error('OTP Verification Error:', error);
//       alert('An error occurred during OTP verification.');
//     }
//     setIsLoading(false);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-gray-100 p-8 rounded shadow-lg">
//         <h2 className="text-xl font-bold mb-4 flex justify-center">OTP</h2>
//         <p className="mb-4 text-center">A verification code has been sent to {email}</p>
//         <div className="flex justify-center mb-4 space-x-2">
//           {otp.map((value, index) => (
//             <input
//               key={index}
//               type="text"
//               maxLength="1"
//               value={value}
//               onChange={(e) => handleChange(e, index)}
//               className="text-center text-2xl shadow-2xl rounded-full w-12 h-12"
//             />
//           ))}
//         </div>
//         <div className="flex justify-center">
//           <button
//             onClick={handleVerify}
//             className={`bg-yellow-500 text-white py-2 px-7 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
//             disabled={isLoading}
//           >
//             {isLoading ? 'VERIFYING...' : 'VERIFY'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OTPModal;



import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ApiUrl from '../../Common/ApiUrl';
const OTPModal = ({ isOpen, onClose, onVerify, email }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    setOtp(['', '', '', '']); // Reset OTP fields when modal opens
  }, [isOpen]);

  const handleChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    // Auto navigate to the next input field
    if (e.target.value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    setIsLoading(true);
    try {
      const response = await axios.post(`${ApiUrl}/api/users/verify-otp`, { otp: otpCode, email });

      console.log("otp data verified", response.data);

      if (response.data.message === "success") {
        onVerify(otpCode);
      } else {
        alert('OTP verification failed');
      }
    } catch (error) {
      console.error('OTP Verification Error:', error);
      alert('An error occurred during OTP verification.');
    }
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-100 p-8 rounded shadow-lg relative">
        <p className='absolute top-2 right-2 text-center cursor-pointer' onClick={()=>onClose()}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</p>
        <h2 className="text-xl font-bold mb-4 flex justify-center">OTP</h2>
        <p className="mb-4 text-center">A verification code has been sent to {email}</p>
        <div className="flex justify-center mb-4 space-x-2">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleChange(e, index)}
              ref={el => inputRefs.current[index] = el}
              className="text-center text-2xl shadow-2xl border-4 border-[#a8a8a8] rounded-full w-12 h-12"
            />
          ))}
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleVerify}
            className={`bg-yellow-500 text-white py-2 px-7 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'VERIFYING...' : 'VERIFY'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;
