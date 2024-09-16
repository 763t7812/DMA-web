
import ApiUrl from "../../Common/ApiUrl";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import OTPModal from "./OtpModal"; // Adjust the import path accordingly
import { setAuthData } from "../../Slice/Auth/AuthSlice";
import GoogleIcon from "../../assets/Images/GoogleIcon.jpg";
import { Link } from "react-router-dom";

const Modal = ({
  isOpen,
  onClose,
  modalType,
  switchToSignUp,
  onSignInSuccess,
}) => {
  const [signInData, setSignInData] = useState({ username: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    nationalId: "",
    imageFront: null,
    imageBack: null,
  });
  const [errors, setErrors] = useState({});
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();

  if (!isOpen) return null;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 3 && password.length <= 16;
  };

  const validateField = (field, value) => {
    switch (field) {
      case "username":
        return value ? "" : "Username is required";
      case "email":
        return !value
          ? "Email is required"
          : !validateEmail(value)
          ? "Invalid email format"
          : "";
      case "password":
        return !value
          ? "Password is required"
          : !validatePassword(value)
          ? "Password must be between 3 and 16 characters"
          : "";
      default:
        return "";
    }
  };

  const handleSignIn = async () => {
    let validationErrors = {};

    Object.keys(signInData).forEach((field) => {
      const error = validateField(field, signInData[field]);
      if (error) validationErrors[field] = error;
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const signData = {
        email: signInData.username,
        password: signInData.password,
      };

      const response = await axios.post(
       ` ${ApiUrl}/api/users/login`,
        signData
      );

      console.log("Login data:", response.data);

      const {
        token,
        id,
        name,
        email,
        role,
        phoneNumber,
        address,
        imageBack,
        imageFront,
        nationalId,
        favorite,
      } = response.data;

      // Save data to local storage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", id);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("imageFront", imageFront);
      localStorage.setItem("imageBack", imageBack);
      localStorage.setItem("address", address);
      localStorage.setItem("nationalId", nationalId);
      localStorage.setItem("phoneNumber", phoneNumber);
      localStorage.setItem("role", role);
      localStorage.setItem("favorite", JSON.stringify(favorite)); // Save favorite array as JSON string

      // Dispatch to Redux
      dispatch(
        setAuthData({
          token,
          userId: id,
          name,
          email,
          address,
          imageBack,
          imageFront,
          nationalId,
          phoneNumber,
          role,
          favorite, // Add favorite to the Redux state
        })
      );

      onClose();
      onSignInSuccess({ name, profilePicture: imageFront });
    } catch (error) {
      console.error("Sign In Error:", error);
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleSignUp = async () => {
    let validationErrors = {};
  
    Object.keys(signUpData).forEach((field) => {
      const error = validateField(field, signUpData[field]);
      if (error) validationErrors[field] = error;
    });
  
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length > 0) return;
  
    try {
      const signUpFormData = new FormData();
      signUpFormData.append("name", signUpData.username);
      signUpFormData.append("email", signUpData.email);
      signUpFormData.append("password", signUpData.password);
      signUpFormData.append("role", "user");
      signUpFormData.append("phoneNumber", signUpData.phoneNumber || ""); // Handle optional field
      signUpFormData.append("address", signUpData.address || "");         // Handle optional field
      signUpFormData.append("nationalId", signUpData.nationalId || "");   // Handle optional field
  
      // Append image files only if they are selected
      if (signUpData.imageFront) {
        signUpFormData.append("imageFront", signUpData.imageFront);
      }
      if (signUpData.imageBack) {
        signUpFormData.append("imageBack", signUpData.imageBack);
      }
  
      const response = await axios.post(
        `${ApiUrl}/api/users/register`,
        signUpFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Registered successfully:", response.data);
  
      if (response.data.message === "success") {
        setEmailForOtp(signUpData.email);
        setIsOtpModalOpen(true);
      } else {
        setError("Failed to register. Please try again.");
      }
    } catch (error) {
      console.error("Sign Up Error:", error);
      setError("Failed to register. Please try again.");
    }
  };
  
  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear specific field error on change
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear specific field error on change
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setSignUpData((prevState) => ({ ...prevState, [name]: files[0] })); // Assign the first file from the file input
  };
  

  const handleVerifyOtp = (otp) => {
    console.log("Verify OTP:", otp);
    setIsOtpModalOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-end">
        <div className="fixed inset-0" onClick={onClose}></div>
        <div className="relative w-80 h-full bg-white bg-opacity-95 shadow-lg p-8 overflow-y-auto">
          {" "}
          {/* Add overflow-y-auto here */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500"
          >
            &#10005;
          </button>
          {modalType === "signin" ? (
            <div>
              <h2 className="text-2xl mb-4 text-customColor-circleColor font-bold">
                Sign In
              </h2>
              {error && <p className="text-red-500 mb-2">{error}</p>}
              <div>
                <h3 className="text-black">Email:</h3>
                <input
                  type="text"
                  name="username"
                  value={signInData.username}
                  onChange={handleSignInChange}
                  placeholder="Email"
                  className={`w-full mb-4 p-2 border ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  } text-black rounded`}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">{errors.username}</p>
                )}
              </div>
              <div>
                <h3 className="text-black">Password:</h3>
                {/* <input
                type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={signInData.password}
                  onChange={handleSignInChange}
                  placeholder="Password"
                  className={`w-full mb-4 p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} text-black rounded`}
                /> */}
              <div className="relative">
              <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={signInData.password}
                  onChange={handleSignInChange}
                  // className="input-field"
                  className={`w-full mb-4 input-field p-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } text-black rounded`}
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="password-toggle"
                >
                  {showPassword ? (
                 <div className="absolute top-2 right-4">
                     <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 3C6.48 3 2 8.48 2 12s4.48 9 10 9 10-4.48 10-9S17.52 3 12 3zM12 14.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
                      />
                    </svg>
                 </div>
                  ) : (
                    <div className="absolute top-2 right-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 17.657A9.944 9.944 0 0 0 19 12a9.944 9.944 0 0 0-1.343-5.657M3.343 4.343a9.944 9.944 0 0 0-1.343 5.657A9.944 9.944 0 0 0 3.343 17.657m13.314 0L6.343 6.343m6.314 6.314a2.5 2.5 0 1 0-5 0"
                      />
                    </svg>
                    </div>
                  )}
                </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              <button
                className="w-full py-2 bg-yellow-500 text-white rounded"
                onClick={handleSignIn}
              >
                Log In
              </button>
              <div className="flex justify-between my-5">
                <p className="text-sm">Remember</p>
                <Link to="/Forgot">
                  <p
                    onClick={onClose}
                    className="text-sm text-customColor-circleColor underline"
                  >
                    Lost Your Password?
                  </p>
                </Link>
              </div>
              <div className="flex justify-center text-center">
                <p className="text-sm">
                  <span
                    className="text-customColor-circleColor underline cursor-pointer"
                    onClick={switchToSignUp}
                  >
                    Create An Account
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl mb-4 text-customColor-circleColor">
                Sign Up
              </h2>
              {error && <p className="text-red-500 mb-2">{error}</p>}
              <div>
                <h3 className="text-black">Username:</h3>
                <input
                  type="text"
                  name="username"
                  value={signUpData.username}
                  onChange={handleSignUpChange}
                  placeholder="Username"
                  className={`w-full mb-4 p-2 border ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  } text-black rounded`}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">{errors.username}</p>
                )}
              </div>
              <div>
                <h3 className="text-black">Email:</h3>
                <input
                  type="text"
                  name="email"
                  value={signUpData.email}
                  onChange={handleSignUpChange}
                  placeholder="Email"
                  className={`w-full mb-4 p-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } text-black rounded`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div>
                <h3 className="text-black">Password:</h3>
                <input
                  type="password"
                  name="password"
                  value={signUpData.password}
                  onChange={handleSignUpChange}
                  placeholder="Password"
                  className={`w-full mb-4 p-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } text-black rounded`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              <div>
                <h3 className="text-black">Phone Number (Optional):</h3>
                <input
                  type="text"
                  name="phoneNumber"
                  value={signUpData.phoneNumber}
                  onChange={handleSignUpChange}
                  placeholder="Phone Number"
                  className="w-full mb-4 p-2 border text-black border-gray-300 rounded"
                />
              </div>
              <div>
                <h3 className="text-black">Address (Optional):</h3>
                <input
                  type="text"
                  name="address"
                  value={signUpData.address}
                  onChange={handleSignUpChange}
                  placeholder="Address"
                  className="w-full mb-4 p-2 border text-black border-gray-300 rounded"
                />
              </div>
              <div>
                <h3 className="text-black">National ID (Optional):</h3>
                <input
                  type="text"
                  name="nationalId"
                  value={signUpData.nationalId}
                  onChange={handleSignUpChange}
                  placeholder="National ID"
                  className="w-full mb-4 p-2 border text-black border-gray-300 rounded"
                />
              </div>
              <div>
                <h3 className="text-black">Front Image (Optional):</h3>
                <input
                  type="file"
                  name="imageFront"
                  onChange={handleFileChange}
                  className="w-full mb-4 p-2 border text-black border-gray-300 rounded"
                />
              </div>
              <div>
                <h3 className="text-black">Back Image (Optional):</h3>
                <input
                  type="file"
                  name="imageBack"
                  onChange={handleFileChange}
                  className="w-full mb-4 p-2 border text-black border-gray-300 rounded"
                />
              </div>
              <button
                className="w-full py-2 bg-yellow-500 text-white rounded"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
      <OTPModal
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        onVerify={handleVerifyOtp}
        email={emailForOtp}
      />
    </>
  );
};

export default Modal;
