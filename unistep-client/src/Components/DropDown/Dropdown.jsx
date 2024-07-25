import React, { useState } from "react";
import {
  UilWaterGlass,
  UilBook,
  UilCodeBranch,
  UilDumbbell,
  UilBars,
} from "@iconscout/react-unicons";
const icons = [
  { name: "Water", component: <UilWaterGlass /> },
  { name: "Reading", component: <UilBook /> },
  { name: "Coding", component: <UilCodeBranch /> },
  { name: "Exercise", component: <UilDumbbell /> },
  // Add more icons as needed
];

const Dropdown = ({ habit, onDelete, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [updateHabit, setUpdateHabit] = useState(habit);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateHabit({ ...updateHabit, [name]: value });
  };

  const handleUpdate = () => {
    onUpdate(updateHabit);
    setEditMode(false);
    setOpen(false);
  };
  return (
    <div className="justify-center flex flex-col">
      <button className="dropdown-toggle" onClick={() => setOpen(!open)}>
        <UilBars />
      </button>
      {open && (
        <div className="bg-white flex flex-col gap-1 p-2 rounded-md">
          <button
            className="bg-yellow-400 rounded-md p-1 hover:bg-yellow-500"
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
          <button
            className="bg-yellow-400 rounded-md p-1 hover:bg-yellow-500"
            onClick={() => onDelete(habit._id)}
          >
            Delete
          </button>
        </div>
      )}
      {editMode && (
        <div className=" flex flex-col ">
          {/* <h3>Update Habit</h3> */}
          <input
            type="text"
            name="name"
            value={updateHabit.name}
            onChange={handleChange}
            placeholder="Habit Name"
            className="border-black border"
          />
          <input
            type="text"
            name="description"
            value={updateHabit.description}
            onChange={handleChange}
            placeholder="Description"
            className="border-black border"
          />
          <input
            type="color"
            name="color"
            value={updateHabit.color}
            onChange={handleChange}
            placeholder="Color"
            className="border-black border w-full"
          />
          <input
            type="text"
            name="schedule"
            value={updateHabit.schedule}
            onChange={handleChange}
            placeholder="Schedule"
            className="border-black border"
          />
          <input
            type="text"
            name="repeatingDays"
            value={updateHabit.repeatingDays.join(", ")}
            onChange={handleChange}
            placeholder="Repeating Days"
            className="border-black border"
          />

          {/* <div className="form-group">
            <label>Repeating Days</label>
            <div className="days-checkboxes">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <label key={day}>
                  <input
                    type="checkbox"
                    value={updateHabit.day}
                    checked={repeatingDays.includes(day)}
                    onChange={handleChange}
                  />
                  {day}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Choose an Icon</label>
            <div className="icon-picker">
              {icons.map((icon) => (
                <div
                  key={icon.name}
                  className={`icon-item ${
                    selectedIcon === icon.name ? "selected" : ""
                  }`}
                  onChange={handleChange}
                >
                  {icon.component}
                  <span>{icon.name}</span>
                </div>
              ))}
            </div>
          </div> */}

          <button className="bg-primary p-3 rounded-md" onClick={handleUpdate}>
            Update
          </button>
          <button
            className="bg-red-500 p-2 rounded-md"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
