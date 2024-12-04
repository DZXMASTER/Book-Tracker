import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  const activeClassName = "text-blue-500 font-bold";
  const inactiveClassName = "text-gray-600";

  return (
    <nav className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-500">
          BookTracker
        </Link>
        <div className="flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeClassName : inactiveClassName
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? activeClassName : inactiveClassName
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? activeClassName : inactiveClassName
            }
          >
            Profile
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
