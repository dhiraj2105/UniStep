import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, user }) => {
  return (
    <aside className="flex flex-col bg-primary w-60 h-screen border-r-4 border-black rounded-lg">
      <span className="text-center text-4xl font-bold w-full p-2 mt-4">
        UniStep
      </span>
      <div className="mt-10  h-5/6 px-3 py-4">
        <ul className="space-y-3">
          <li className="bg-background p-2 rounded-xl cursor-pointer hover:bg-black hover:text-white flex items-center border-4 border-black hover:border-white">
            <svg
              className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 18"
            >
              <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
            </svg>
            <span className="ms-3">Dashboard</span>
          </li>
          <li className="bg-background p-2 rounded-xl cursor-pointer hover:bg-black hover:text-white flex items-center">
            <svg
              className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 21"
            >
              <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
              <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
            </svg>
            <span className="ms-3">Analytics</span>
          </li>
        </ul>
      </div>
      <div className="bg-background flex flex-col cursor-pointer rounded-xl px-3 py-4 w-11/12 m-auto mb-2 border-4 border-black ">
        {isAuthenticated ? (
          <Link to="/user">
            <div className="flex flex-col">
              <span className="text-xl font-medium">{user.username}</span>
              <span>{user.email}</span>
            </div>
          </Link>
        ) : (
          <Link to="/auth/login">Login</Link>
        )}
      </div>
    </aside>
  );
};

export default Navbar;
