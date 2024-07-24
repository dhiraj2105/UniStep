import React from "react";
import Navbar from "../../Components/navbar/Navbar";
import Dashboard from "../../Components/Dashboard/Dashboard";

const HomePage = ({ isAuthenticated, user, habits, onDelete, onUpdate }) => {
  return (
    <div className="flex flex-row h-screen">
      <Navbar isAuthenticated={isAuthenticated} user={user} />
      <Dashboard
        habits={habits}
        user={user}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </div>
  );
};

export default HomePage;
