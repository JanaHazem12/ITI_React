import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router";
import { register } from '../../api';

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    if (!formData.passwordConfirm) {
      newErrors.passwordConfirm = "Please confirm your password";
      isValid = false;
    } else if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const data = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      console.log('Registration successful:', data);
      navigate("/login");
    } catch (err) {
      console.error('Registration failed:', err.response?.data);
      // handle specific error messages from the backend
      if (err.response?.data) {
        const backendErrors = err.response.data;
        setErrors({
          ...errors,
          ...backendErrors
        });
      }
    }
  };

// ... existing code ...

return (
  <div className="flex items-center justify-center p-4 min-h-screen">
    <div className="flex flex-col md:flex-row shadow-xl rounded-xl h-fit md:h-[500px] bg-purple-100 max-w-4xl w-full">
      <div className="flex w-full md:w-96 items-center justify-center bg-white rounded-sm p-6 md:p-8 h-full">
        <div className="w-full max-w-xs">
          <h2 className="text-2xl font-bold text-center mb-2">CREATE ACCOUNT</h2>
          <p className="text-sm text-gray-400 text-center mb-6">
            Get Started at PixelBlog.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="flex bg-purple-200 rounded-xl w-full h-10 items-center px-3">
                <FontAwesomeIcon icon={faUser} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="bg-transparent outline-none border-none focus:ring-0 w-full"
                />
              </div>
              {errors.username && (
                <p className="text-red-600 text-left text-sm">{errors.username}</p>
              )}
            </div>

            <div className="mb-4">
              <div className="flex bg-purple-200 rounded-xl w-full h-10 items-center px-3">
                <FontAwesomeIcon icon={faAddressBook} className="text-gray-400 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="bg-transparent outline-none border-none focus:ring-0 w-full"
                />
              </div>
              {errors.email && (
                <p className="text-red-600 text-left text-sm">{errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <div className="flex bg-purple-200 rounded-xl w-full h-10 items-center px-3">
                <FontAwesomeIcon icon={faLock} className="text-gray-400 mr-2" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="bg-transparent outline-none border-none focus:ring-0 w-full"
                />
              </div>
              {errors.password && (
                <p className="text-red-600 text-left text-sm">{errors.password}</p>
              )}
            </div>

            <div className="mb-6">
              <div className="flex bg-purple-200 rounded-xl w-full h-10 items-center px-3">
                <FontAwesomeIcon icon={faLock} className="text-gray-400 mr-2" />
                <input
                  type="password"
                  name="passwordConfirm"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="bg-transparent outline-none border-none focus:ring-0 w-full"
                />
              </div>
              {errors.passwordConfirm && (
                <p className="text-red-600 text-left text-sm">{errors.passwordConfirm}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-purple-900 text-white py-3 rounded-xl font-bold hover:bg-purple-700 cursor-pointer relative bottom-2"
            >
              Sign Up
            </button>
            <div className="flex flex-row items-center justify-center">
              <span className="text-gray-400">Already have an account?</span>
              <Link to="/login" className="underline px-2 text-purple-700">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="flex-1 bg-purple-900 rounded-sm p-4 flex flex-col">
        <div className="flex justify-center">
          <img
            src="../../../public/assets/registrationImg.png"
            alt="Register"
            className="max-h-[180px] md:max-h-[220px] object-contain"
          />
        </div>
        <div className="mt-4 text-center font-font1 text-white text-xl md:text-3xl px-4">
          "Every great story begins with a simple sign-up. Start yours today!"
        </div>
      </div>
    </div>
  </div>
);
}