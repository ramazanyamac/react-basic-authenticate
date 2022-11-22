import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const pathMatchRoute = (route) => route === location.pathname;

  return (
    <footer className="z-20 p-4 w-full bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
      <ul className="flex flex-wrap justify-center items-center w-full mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <Link
            to="/"
            className={
              pathMatchRoute("/")
                ? "text-white text-2xl mr-4 hover:underline md:mr-6"
                : "text-2xl mr-4 hover:underline md:mr-6"
            }
          >
            Explore
          </Link>
        </li>
        <li>
          <Link
            to="/content"
            className={
              pathMatchRoute("/content")
                ? "text-white text-2xl mr-4 hover:underline md:mr-6"
                : "text-2xl mr-4 hover:underline md:mr-6"
            }
          >
            Content
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className={
              pathMatchRoute("/profile")
                ? "text-white text-2xl mr-4 hover:underline md:mr-6"
                : "text-2xl mr-4 hover:underline md:mr-6"
            }
          >
            Profile
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Navbar;
