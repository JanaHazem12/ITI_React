import React from "react";
import { NavLink } from "react-router";
export default function NavBar() {
  return (
    <div className="navbar bg-linear-to-r from-cyan-100 to-cyan-500 shadow-md text-purple-600  w-full fixed top-0 left-0">
      <span className="hover:animate-spin bg-purple-100 px-4 py-2 rounded-lg mr-4 font-mono">
        PixelBlog
      </span>
      <div className="flex-1">
        <div className="btn btn-ghost text-xl hover:bg-purple-600 hover:text-white float-start active:scale-95 transition-transform underline">
          <NavLink suppressHydrationWarning={true}
            className={({ isActive }) =>
              isActive ? "flex items-center gap-2" : "flex items-center gap-2"
            }
            to="/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            Home
          </NavLink>
        </div>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li className="hover:bg-purple-600 hover:text-white mr-2 active:scale-95 transition-transform active:!bg-purple-700 active:!text-white">
            <NavLink
              className={({ isActive }) =>
                isActive ? "border border-purple-500" : ""
              }
              to="/login"
            >
              Login
            </NavLink>
          </li>
          <li className="hover:bg-purple-600 hover:text-white mr-2 active:scale-95 transition-transform active:!bg-purple-700 active:!text-white">
            <NavLink
              className={({ isActive }) =>
                isActive ? "border border-purple-500" : ""
              }
              to="/register"
            >
              Register
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
