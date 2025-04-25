import React from "react";
import { Link, Outlet } from "react-router";

export default function About() {
  return (
    <>
      <Link to="/about/people">
        <div className="text-7xl font-serif border border-gray-200">About People</div>
      </Link><br />
      <Link to="/about/company">
        <div className="text-7xl font-serif border border-gray-200">About Company</div>
      </Link>
      <div className="text-7xl font-serif flex items-center justify-center m-auto">
        <Outlet />
      </div>
    </>
  );
}
