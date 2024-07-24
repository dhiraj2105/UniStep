import React from "react";
import { useNavigate } from "react-router-dom";

const User = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    onLogout();
    navigate("/");
  };
  return (
    <div className="">
      <h1>Hello, {user.username}</h1>
      <button
        onClick={handleLogout}
        className="bg-red-600 p-4 rounded-lg hover:bg-red-700 cursor-pointer text-xl font-bold"
      >
        Logout
      </button>
    </div>
  );
};

export default User;
