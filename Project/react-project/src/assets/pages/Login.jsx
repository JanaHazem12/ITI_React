import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faPencil, faTractor, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

export default function Login() {
  return (
      <div className="flex items-center justify-center p-4 min-h-screen">
        <div className="flex flex-col md:flex-row shadow-xl rounded-xl h-fit md:h-[400px] bg-purple-100 max-w-4xl w-full">
          <div className="flex w-full md:w-96 items-center justify-center bg-white rounded-sm p-6 md:p-8 h-full">
            <div className="w-full max-w-xs">
              <h2 className="text-2xl font-bold text-center mb-2">LOGIN</h2>
              <p className="text-sm text-gray-400 text-center mb-6">
              Hey! Good to see you again.
              </p>

              <form>
                <div className="mb-4">
                  <div className="flex bg-purple-200 rounded-xl w-full h-10 items-center px-3">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-gray-400 mr-2"
                    />
                    <input
                      type="text"
                      placeholder="Username"
                      className="bg-transparent outline-none border-none focus:ring-0"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex bg-purple-200 rounded-xl w-full h-10 items-center px-3">
                    <FontAwesomeIcon
                      icon={faLock}
                      className="text-gray-400 mr-2"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="bg-transparent outline-none border-none focus:ring-0"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-900 text-white py-3 rounded-xl font-bold hover:bg-purple-700 cursor-pointer relative bottom-2"
                >
                  Login
                </button>
                <div className='flex flex-row items-center justify-center'>
                <span className='text-gray-400'>Don't have an account ?</span>
                <Link to='/register' className='underline px-2 text-purple-700'> Register</Link>
                </div><br />
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
