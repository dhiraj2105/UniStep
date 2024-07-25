import React, { useState } from "react";

import {
  UilWaterGlass,
  UilBook,
  UilCodeBranch,
  UilDumbbell,
  UilLaughing,
} from "@iconscout/react-unicons";
import axios from "axios";
import CreateHabit from "../CreateHabit/CreateHabit";
import Dropdown from "../DropDown/Dropdown";

const icons = {
  Water: <UilWaterGlass />,
  Reading: <UilBook />,
  Coding: <UilCodeBranch />,
  Exercise: <UilDumbbell />,
  Laughing: <UilLaughing />,
  // Add more icons  needed
};

const Dashboard = ({ habits, user, onDelete, onUpdate }) => {
  const [isCreateHabitOpen, setIsCreateHabitOpen] = useState(false);

  const handlleHabitCreated = () => {
    window.location.reload();
    closeCreateHabit();
  };

  const openCreateHabit = () => {
    setIsCreateHabitOpen(true);
  };
  const closeCreateHabit = () => {
    setIsCreateHabitOpen(false);
  };
  // daily habit update
  const handleCheckboxChange = async (id, day, status) => {
    try {
      await axios.put(`/habit/dailyCompletion/${id}`, { day, status });

      window.location.reload();
    } catch (error) {
      console.error("Error uploading daily completion:", error);
    }
  };
  return (
    <div className="flex flex-col w-4/5 p-3 ">
      {/* Welcome User */}
      <div className="flex flex-col  backdrop-blur-md justify-center items-center h-44">
        {user ? (
          <span className="text-3xl font-bold">
            Welcome back, {user.username}
          </span>
        ) : (
          <span className="text-4xl font-bold">Welcome back , username</span>
        )}
        <span>Track your habits and achieve your goals!</span>
        {/* Create Habit Button */}
        {user ? (
          <>
            <a
              onClick={openCreateHabit}
              className="relative px-6 py-3 mt-4 font-bold text-black group cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-primary group-hover:translate-x-0 group-hover:translate-y-0 rounded-lg"></span>
              <span className="absolute inset-0 w-full h-full border-4 border-black rounded-lg"></span>
              <span className="relative">Create Habit</span>
            </a>
          </>
        ) : null}
      </div>
      {/* Habits */}
      {user ? (
        <div className="bg-slate-300 mt-2 h-screen border-4 border-black rounded-lg overflow-y-auto">
          {/* habit */}
          <div>
            <ul>
              {habits.map((habit) => (
                <li
                  key={habit}
                  className="flex h-40  m-4 border-4 border-black rounded-lg p-2 gap-2 justify-between"
                  style={{ backgroundColor: habit.color }}
                >
                  <div className="flex items-center gap-2">
                    <div>{icons[habit.icon]}</div>
                    <div className="flex flex-col">
                      <span className="text-2xl font-medium">{habit.name}</span>
                      <p>{habit.description}</p>
                      <span>{habit.schedule}</span>
                      <span>{habit.repeatingDays.join(", ")}</span>
                    </div>
                  </div>
                  <div className="items-center flex gap-2 ">
                    {habit.repeatingDays.map((day) => (
                      <label key={day}>
                        <input
                          className="mr-1"
                          type="checkbox"
                          checked={habit.dailyCompletion[day] || false}
                          onChange={(e) =>
                            handleCheckboxChange(
                              habit._id,
                              day,
                              e.target.checked
                            )
                          }
                        />
                        {day}
                      </label>
                    ))}
                  </div>
                  <Dropdown
                    habit={habit}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Login to Create and see all your habits</p>
      )}

      <CreateHabit
        isOpen={isCreateHabitOpen}
        onClose={handlleHabitCreated}
        user={user}
      />
    </div>
  );
};

export default Dashboard;
