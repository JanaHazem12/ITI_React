import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router";
import { login } from '../../api';
import { Toaster, toast } from 'react-hot-toast';
// import { login } from '../../../public/assets/loginImgg.webp';

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    general: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
      general: ""
    });
  };

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setErrors({
      username: "",
      password: "",
      general: ""
    });

    let isValid = true;
    if (!formData.username) {
      setErrors(prev => ({...prev, username: "Username is required"}));
      isValid = false;
    }
    if (!formData.password) {
      setErrors(prev => ({...prev, password: "Password is required"}));
      isValid = false;
    }

    if (!isValid) return;

    try {
      const data = await login(formData);
      console.log("DATA: ", data);
      // Store the token in local storage
      localStorage.setItem('username', formData.username);
      // localStorage.setItem('id', data.id);
      // localStorage.setItem('token', data.token);
      // console.log("LOCAL: ", localStorage);
      // if (response.access) {
        // localStorage.setItem('token', response.access);
      //   if (response.refresh) {
      //     localStorage.setItem('refreshToken', response.refresh);
      //   }
      console.log('Login successful:', data);
      toast.success("✅LOGGED IN✅")
      navigate("/");
    } catch (err) {
      console.error('Login failed:', err.response?.data);
      if (err.response?.data?.detail) {
        setErrors(prev => ({
          ...prev,
          general: err.response.data.detail
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          general: "Login failed. Please try again."
        }));
      }
    }
  };

  return (
    <>
    <Toaster position="top-center" />
    <div className="flex items-center justify-center p-4 min-h-screen">
      <div className="flex flex-col md:flex-row shadow-xl rounded-xl h-fit md:h-[400px] bg-purple-100 max-w-4xl w-full">
        <div className="flex w-full md:w-96 items-center justify-center bg-white rounded-sm p-6 md:p-8 h-full">
          <div className="w-full max-w-xs">
            <h2 className="text-2xl font-bold text-center mb-2">LOGIN</h2>
            <p className="text-sm text-gray-400 text-center mb-6">
              Hey! Good to see you again.
            </p>

            <form onSubmit={handleSubmit}>
              {errors.general && (
                <p className="text-red-600 text-sm mb-4 text-center">
                  {errors.general}
                </p>
              )}
              
              <div className="mb-4">
                <div className="flex bg-purple-200 rounded-xl w-full h-10 items-center px-3">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-gray-400 mr-2"
                  />
                  <input
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    name="username"
                    placeholder="Username"
                    className="bg-transparent outline-none border-none focus:ring-0 w-full"
                  />
                </div>
                {errors.username && (
                  <p className="text-red-600 text-left text-sm mt-1">
                    {errors.username}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <div className="flex bg-purple-200 rounded-xl w-full h-10 items-center px-3">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="text-gray-400 mr-2"
                  />
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
                  <p className="text-red-600 text-left text-sm mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-purple-900 text-white py-3 rounded-xl font-bold hover:bg-purple-700 cursor-pointer relative bottom-2"
              >
                Login
              </button>
              <div className="flex flex-row items-center justify-center">
                <span className="text-gray-400">Don't have an account?</span>
                <Link to="/register" className="underline px-2 text-purple-700">
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>

        <div className="flex-1 bg-purple-900 rounded-sm p-4 flex flex-col">
          <div className="flex justify-center">
            <img
              src='../../../public/assets/loginImgg.webp'
              alt="Login"
              className="max-h-[180px] md:max-h-[220px] object-contain"
            />
          </div>
          <div className="mt-4 text-center font-font1 text-white text-xl md:text-3xl px-4">
            "Words are the paint of the mind—your blog is the canvas. Create
            boldly."
          </div>
        </div>
      </div>
    </div>
    </>
  );
}