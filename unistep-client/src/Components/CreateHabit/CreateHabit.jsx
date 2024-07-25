import React, { useState } from "react";
import axios from "axios";
import {
  UilWaterGlass,
  UilBook,
  UilCodeBranch,
  UilDumbbell,
  UilLaughing,
} from "@iconscout/react-unicons";

const icons = [
  { name: "Water", component: <UilWaterGlass /> },
  { name: "Reading", component: <UilBook /> },
  { name: "Coding", component: <UilCodeBranch /> },
  { name: "Exercise", component: <UilDumbbell /> },
  { name: "Laughing", component: <UilLaughing /> },
  // Add more icons as needed
];

const CreateHabit = ({ isOpen, onClose, user }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#fece2e");
  const [schedule, setSchedule] = useState("daily");
  const [repeatingDays, setRepeatingDays] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newHabit = {
      userId: user._id, // Replace with actual user ID
      name,
      description,
      color,
      schedule,
      repeatingDays,
      icon: selectedIcon,
    };

    // console.log(newHabit);

    try {
      const response = await axios.post(`/habit/newHabit`, newHabit);
      console.log("Habit created:", response);
      // Clear the form after submission
      setName("");
      setDescription("");
      setColor("#fece2e");
      setSchedule("daily");
      setRepeatingDays([]);
      setSelectedIcon(null);
      onClose();
    } catch (error) {
      console.error("Error creating habit:", error);
    }
  };

  const handleRepeatingDaysChange = (day) => {
    setRepeatingDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  z-50 bg-slate-600 bg-opacity-40">
      <div className="bg-white  p-8 rounded-lg shadow-lg max-w-lg w-full relative">
        <span
          className="absolute top-2 right-2  text-2xl cursor-pointer"
          onClick={onClose}
        >
          &times;
        </span>
        <form className="" onSubmit={handleSubmit}>
          <h2 className="mb-4 text-center text-2xl">Create a New Habit</h2>

          <div className="mb-3">
            <label className="block mb-1" htmlFor="name">
              Habit Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter habit name"
              required
              className="   
              mt-1 block w-full p-2 border border-gray-300 rounded-md "
            />
          </div>

          <div className="form-group">
            <label className="block mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter habit description"
              className="   
              mt-1 block w-full p-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>

          <div className="form-group">
            <label className="block mt-2" htmlFor="color">
              Habit Color
            </label>
            <input
              type="color"
              className="w-full h-12 rounded-md"
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          <div className="mt-2">
            <label className=" mt-3" htmlFor="schedule">
              Habit Schedule
            </label>
            <select
              id="schedule"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md "
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="mt-2">
            <label className="block mb-1">Repeating Days</label>
            <div className="flex gap-4 ">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <label key={day}>
                  <input
                    className="mr-1"
                    type="checkbox"
                    value={day}
                    checked={repeatingDays.includes(day)}
                    onChange={() => handleRepeatingDaysChange(day)}
                  />
                  {day}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-2">
            <label className="block mb-1">Choose an Icon</label>
            <div className="flex flex-wrap">
              {icons.map((icon) => (
                <div
                  key={icon.name}
                  className={` m-2 p-2 border rounded-md cursor-pointer flex w-12 justify-center transition-all ${
                    selectedIcon === icon.name
                      ? "border-yellow-400 bg-gray-100 dark:bg-gray-700"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  onClick={() => setSelectedIcon(icon.name)}
                >
                  {icon.component}
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 w-full p-2 bg-yellow-400 text-black font-medium rounded-md transition-all hover:bg-yellow-500"
          >
            Create Habit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHabit;
