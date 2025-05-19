import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faMessage,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router";
// import PocketBase from "pocketbase";
import pb from "../../pb"

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPass: "",
  });
  const [usernameError, setUsernameError] = useState("");
  const [passError, setPassError] = useState("");
  const [passReqError, setpassReqError] = useState("");
  const [confirmPassError, setconfirmPassError] = useState("");
  const [confirmPassReqError, setconfirmPassReqError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailReqError, setemailReqError] = useState("");
  // const [isRegistered, setisRegistered] = useState("");
  const [isRegistered, setisRegistered] = useState({
    isRegistered: "",
    emailExists: false,
    usernameExists: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // let emailExists = false;
  // let usernameExists = false;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameError("");
    setPassError("");
    setpassReqError("");
    setconfirmPassError("");
    setconfirmPassReqError("");
    setEmailError("");
    setemailReqError("");
    setisRegistered({
      isRegistered: "",
      emailExists: false,
      usernameExists: false,
    });
    let isValid = true;
    // REQUIRED FIELDS
    if (formData.username.length === 0) {
      setUsernameError("Username is required.");
      isValid = false;
    }

    if (formData.confirmPass === "") {
      setconfirmPassReqError("Confirm password is required.");
      isValid = false;
    }

    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (formData.email.length == 0) {
      setemailReqError("Email is required.");
      setEmailError("");
      isValid = false;
    }
    // validation for email format
    else if (!regex.test(formData.email) && formData.email.length > 0) {
      // alert("Please enter a valid email address (e.g., user@example.com)");
      setEmailError("Please enter a valid email address.");
      setemailReqError("");
      isValid = false;
    }

    if (formData.password === "") {
      setpassReqError("Password is required.");
      isValid = false;
    }

    // validation for password length
    else if (formData.password.length < 8 && formData.password.length > 0) {
      setPassError("Password must be at least 8 characters long");
      isValid = false;
    }
    // validation for password/confirmPass if they DON'T match
    if (
      formData.password !== formData.confirmPass &&
      formData.confirmPass.length >= 0 && formData.confirmPass !== ""
    ) {
      setconfirmPassError("Passwords don't match!");
      isValid = false;
    }

    // CHECK IF EMAI/USERNAME IS ALREADY IN DB
    if (!isValid) return;
    try {
      // const pb = new PocketBase("http://127.0.0.1:8090");
      try {
        const emailFound = await pb
          .collection("users")
          .getFirstListItem(`email="${formData.email}"`, {
            expand: "relField1,relField2.subRelField",
          });
        setisRegistered((prev) => ({
          ...prev,
          isRegistered: "Email already exists",
          emailExists: true,
        }));
        console.log("EMAIL FOUND: ", emailFound);
        return;
      } catch (err) {
        setisRegistered((prev) => ({
          ...prev,
          isRegistered: prev.usernameExists ? "Username already exists" : "",
          emailExists: false,
        }));
      }
      try {
        const usernameFound = await pb
          .collection("users")
          .getFirstListItem(`username="${formData.username}"`, {
            expand: "relField1,relField2.subRelField",
          });
        setisRegistered((prev) => ({
          ...prev,
          isRegistered: "Username already exists",
          usernameExists: true,
        }));
        console.log("USERNAME FOUND: ", usernameFound);
        return;
      } catch (err) {
        setisRegistered((prev) => ({
          ...prev,
          isRegistered: prev.emailExists ? "Email already exists" : "",
          usernameExists: false,
        }));
      }

      if (
        isValid &&
        !isRegistered.emailExists &&
        !isRegistered.usernameExists
      ) {
        try {
          const record = await pb.collection("users").create({
            username: formData.username,
            email: formData.email.toLowerCase(),
            password: formData.password,
            passwordConfirm: formData.confirmPass,
            emailVisibility: true,
          });
          navigate("/login");
        } catch (err) {
          console.error("Registration failed:", err.data);
        }
      }
    } catch (err) {
      console.log("Error connecting to DB.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center p-4 min-h-screen">
        <div className="flex flex-col md:flex-row shadow-xl rounded-xl h-fit md:h-[500px] bg-purple-100 max-w-4xl w-full">
          <div className="flex w-full md:w-96 items-center justify-center bg-white rounded-sm p-6 md:p-8 h-full">
            <div className="w-full max-w-xs">
              <h2 className="text-2xl font-bold text-center mb-2">
                CREATE ACCOUNT
              </h2>
              <p className="text-sm text-gray-400 text-center mb-6">
                Get Started at PixelBlog.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <div className="flex bg-purple-200 rounded-xl w-full h-10 items-center px-3">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-gray-400 mr-2"
                    />
                    <input
                      value={formData.username}
                      onChange={handleChange}
                      name="username"
                      type="text"
                      placeholder="Username"
                      className="bg-transparent outline-none border-none focus:ring-0"
                    />
                  </div>
                  {usernameError && (
                    <p className="text-red-600 text-left text-sm">
                      {usernameError}
                    </p>
                  )}
                  {isRegistered.usernameExists && (
                    <p className="text-red-600 text-left text-sm">
                      {isRegistered.isRegistered}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <div className="flex bg-purple-200 rounded-xl w-full h-10 items-center px-3">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-gray-400 mr-2"
                    />
                    <input
                      value={formData.email}
                      onChange={handleChange}
                      name="email"
                      type="text"
                      placeholder="Email"
                      className="outline-none border-none focus:ring-0"
                    />
                  </div>
                  {/* {isRegistered && (
                    <p className="text-red-600 text-left text-sm">
                      {isRegistered}
                    </p>
                  )} */}
                  {isRegistered.emailExists && (
                    <p className="text-red-600 text-left text-sm">
                      {/* {isRegistered.isRegistered} */}
                      Email already exists.
                    </p>
                  )}
                  {emailReqError && (
                    <p className="text-red-600 text-left text-sm">
                      {emailReqError}
                    </p>
                  )}
                  {emailError && (
                    <p className="text-red-600 text-left text-sm">
                      {emailError}
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
                      value={formData.password}
                      onChange={handleChange}
                      name="password"
                      type="password"
                      placeholder="Password"
                      className="outline-none border-none focus:ring-0"
                    />
                  </div>
                  {passReqError && (
                    <p className="text-red-600 text-left text-sm">
                      {passReqError}
                    </p>
                  )}
                  {passError && (
                    <p className="text-red-600 text-left text-sm">
                      {passError}
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
                      value={formData.confirmPass}
                      onChange={handleChange}
                      name="confirmPass"
                      type="password"
                      placeholder="Confirm Password"
                      className="outline-none border-none focus:ring-0"
                    />
                  </div>
                  {confirmPassReqError && (
                    <p className="text-red-600 text-left text-sm">
                      {confirmPassReqError}
                    </p>
                  )}
                  {confirmPassError && (
                    <p className="text-red-600 text-left text-sm">
                      {confirmPassError}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-900 text-white py-3 rounded-xl font-bold hover:bg-purple-700 cursor-pointer relative bottom-2"
                >
                  Sign Up
                </button>
                <div className="flex flex-row items-center justify-center">
                  <span className="text-gray-400">
                    Already have an account ?
                  </span>
                  <Link to="/login" className="underline px-2 text-purple-700">
                    {" "}
                    Login
                  </Link>
                </div>
                <br />
              </form>
            </div>
          </div>

          <div className="flex-1 bg-purple-900 rounded-sm p-4 flex flex-col">
            <div className="flex justify-center items-center relative bottom-4">
              <img
                src="https://static.vecteezy.com/system/resources/previews/029/726/216/non_2x/3d-purple-illustration-icon-of-using-smartphone-for-sign-up-or-login-to-profile-account-with-security-padlock-side-free-png.png"
                alt="Login"
                className="object-contain w-100"
              />
            </div>
            <div className="text-2xl md:text-6xl text-white relative md:bottom-7 font-font2">
              Sign Up Now
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
