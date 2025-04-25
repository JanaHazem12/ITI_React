import React from "react";
import { Link, NavLink } from "react-router";

export default function NavBar(props) {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm text-left text-green-400">
        <div className="flex-1">
          <a className="btn btn-ghost text-4xl">Menu</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li className="flex flex-row">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "border border-green-600" : " "
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="flex flex-row">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "border border-green-600" : " "
                }
                to="/countries"
              >
                Countries
              </NavLink>
            </li>
            <li className="flex flex-row">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "border border-green-600" : " "
                }
                to="/about"
              >
                About
              </NavLink>
            </li>
            <li>
              <a className="relative">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "border border-green-600" : " "
                  }
                >
                  <Link to="/cart">
                    <span className="bg-green-300 rounded-full size-5 text-black text-center absolute bottom-5 right-6">
                      {props.noOfItems}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                  </Link>
                </NavLink>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <br />
    </>
  );
}
