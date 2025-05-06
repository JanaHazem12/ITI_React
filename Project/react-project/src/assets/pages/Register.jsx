import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faMessage, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router';


export default function register() {
  return (
    <>
   <div className="flex items-center justify-center p-4 min-h-screen">
        <div className="flex flex-col md:flex-row shadow-xl rounded-xl h-fit md:h-[500px] bg-purple-100 max-w-4xl w-full">
          <div className="flex w-full md:w-96 items-center justify-center bg-white rounded-sm p-6 md:p-8 h-full">
            <div className="w-full max-w-xs">
              <h2 className="text-2xl font-bold text-center mb-2">CREATE ACCOUNT</h2>
              <p className="text-sm text-gray-400 text-center mb-6">
                Get Started at PixelBlog.
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
                <div className="mb-4">
                  <div className="flex bg-purple-200 rounded-xl w-full h-10 items-center px-3">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-gray-400 mr-2"
                    />
                    <input
                      type="text"
                      placeholder="Email"
                      className="outline-none border-none focus:ring-0"
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
                      className="outline-none border-none focus:ring-0"
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
                      placeholder="Confirm Password"
                      className="outline-none border-none focus:ring-0"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-900 text-white py-3 rounded-xl font-bold hover:bg-purple-700 cursor-pointer relative bottom-2"
                >
                   Sign Up
                </button>
                <div className='flex flex-row items-center justify-center'>
                <span className='text-gray-400'>Already have an account ?</span>
                <Link to='/login' className='underline px-2 text-purple-700'> Login</Link>
                </div><br />
              </form>
            </div>
          </div>

          <div className="flex-1 bg-purple-900 rounded-sm p-4 flex flex-col">
            <div className="flex justify-center items-center relative bottom-4">
              <img
                src='https://static.vecteezy.com/system/resources/previews/029/726/216/non_2x/3d-purple-illustration-icon-of-using-smartphone-for-sign-up-or-login-to-profile-account-with-security-padlock-side-free-png.png'
                alt="Login"
                className="object-contain w-100"
              />
            </div>
            <div className='text-2xl md:text-6xl text-white relative md:bottom-7 font-font2'>Sign Up Now</div> 
          </div>
        </div>
      </div>
    </>
  )
}

