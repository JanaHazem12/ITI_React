import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faPencil,
  faTractor,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router";
import PocketBase, { ClientResponseError } from "pocketbase";

export default function Login() {
  // CHECK IF USERNAME EXISTS IN 'users' COLLECTION - DONE
  // IF USERNAME EXISTS, CHECK IF PASSWORD MATCHES - DONE
  // IF PASSWORD MATCHES, ADD USER TO 'currently_logged_in' COLLECTION
  // IF PASSWORD DOESN'T MATCH, SHOW ERROR MESSAGE
  // IF USERNAME DOESN'T EXIST, SHOW ERROR MESSAGE
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isEmailFound, setEmail] = useState({
    errormsg: "",
    emailExists: false,
  });
  const [requiredFields, setRequiredFields] = useState({
    requiredmsg: "",
    usernamereq: false,
    passwordreq: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail({
      errormsg: "",
      emailExists: false,
    });
    setRequiredFields({
      requiredmsg: "",
      usernamereq: false,
      passwordreq: false,
    });
    if (formData.username.length === 0) {
      setRequiredFields((prev) => ({
        ...prev,
        requiredmsg: "",
        usernamereq: true,
      }));
    }
    if (formData.password.length === 0) {
      setRequiredFields((prev) => ({
        ...prev,
        requiredmsg: "Password is required",
        passwordreq: true,
      }));
    }

    try {
      const pb = new PocketBase("http://127.0.0.1:8090");
      const authData = await pb
        .collection("users")
        .authWithPassword(formData.username, formData.password);
      setEmail((prev) => ({ ...prev, errormsg: "", emailExists: true }));
      console.log("AUTH DATA", authData);
      navigate("/")
    } catch (err) {
      if (err instanceof ClientResponseError && err.status === 400) {
        try {
          const pb = new PocketBase("http://127.0.0.1:8090");
          // check if email exists
          const isEmailFound = await pb
            .collection("users")
            .getFirstListItem(`email="${formData.username}"`);
          setEmail((prev) => ({
            ...prev,
            errormsg: "Incorrect password",
            emailExists: true,
          }));
          console.log("Found", isEmailFound);
        } catch (lookupErr) {
          // email doesn't exist
          setEmail((prev) => ({
            ...prev,
            errormsg: "Email doesn't exist",
            emailExists: false,
          }));
          console.log("Not Found");
        }
      }
    }
  };

  return (
    <div className="flex items-center justify-center p-4 min-h-screen">
      <div className="flex flex-col md:flex-row shadow-xl rounded-xl h-fit md:h-[400px] bg-purple-100 max-w-4xl w-full">
        <div className="flex w-full md:w-96 items-center justify-center bg-white rounded-sm p-6 md:p-8 h-full">
          <div className="w-full max-w-xs">
            <h2 className="text-2xl font-bold text-center mb-2">LOGIN</h2>
            <p className="text-sm text-gray-400 text-center mb-6">
              Hey! Good to see you again.
            </p>

            <form onSubmit={handleSubmit}>
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
                    className="bg-transparent outline-none border-none focus:ring-0"
                  />
                </div>
                {requiredFields.usernamereq && (
                  <p className="text-red-600 text-left text-sm">
                    Email is required.
                  </p>
                )}
                {!isEmailFound.emailExists && (
                  <p className="text-red-600 text-left text-sm">
                    {isEmailFound.errormsg}
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
                    className="bg-transparent outline-none border-none focus:ring-0"
                  />
                </div>
                {requiredFields.passwordreq && (
                  <p className="text-red-600 text-left text-sm">
                    Password is required
                  </p>
                )}
                {isEmailFound.emailExists && (
                  <p className="text-red-600 text-left text-sm">
                    {isEmailFound.errormsg}
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
                <span className="text-gray-400">Don't have an account ?</span>
                <Link to="/register" className="underline px-2 text-purple-700">
                  {" "}
                  Register
                </Link>
              </div>
              <br />
            </form>
          </div>
        </div>

        <div className="flex-1 bg-purple-900 rounded-sm p-4 flex flex-col">
          <div className="flex justify-center">
            <img
              src="/assets/loginImgg.webp"
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
  );
}
