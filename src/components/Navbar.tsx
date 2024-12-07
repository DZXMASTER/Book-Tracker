import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut(auth).then(() => console.log("Logged out successfully!"));
  };

  return (
    <nav className="bg-blue-500 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/dashboard" className="text-lg font-bold">Book Tracker</Link>
        <button
          className="sm:hidden block focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <ul className={`sm:flex sm:items-center sm:space-x-4 sm:static sm:flex-row 
          absolute right-4 top-16 bg-blue-500 shadow-lg rounded-md transition-transform duration-200 
          transform ${menuOpen ? "scale-100" : "scale-0"} sm:scale-100 origin-top-right`}>
          <li><Link to="/dashboard" className="block px-4 py-2 hover:bg-blue-600 rounded-md">Dashboard</Link></li>
          <li><Link to="/profile" className="block px-4 py-2 hover:bg-blue-600 rounded-md">Profile</Link></li>
          <li>
            <button
              onClick={handleLogout}
              className="block px-4 py-2 hover:bg-blue-600 rounded-md"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
