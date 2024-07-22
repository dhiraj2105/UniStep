import { useEffect, useState } from "react";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/AuthPage/LoginPage";
import SignupPage from "./pages/AuthPage/SignupPage";
import User from "./pages/User/User";

function App() {
  //user
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  //habits
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      if (token && id) {
        try {
          const res = await axios.get(`/user/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setIsAuthenticated(false);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    setIsAuthenticated(false);
    setUser(null);
  };

  // habits
  const userId = localStorage.getItem("id");
  const fetchHabits = async () => {
    try {
      const response = await axios.get(`/habit/${userId}`);
      setHabits(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchHabits();
  }, [userId]);

  //update habit
  const updateHabit = async (updateHabit) => {
    try {
      const respnse = await axios.put(
        `/habit/updateHabit/${updateHabit._id}`,
        updateHabit
      );
      setHabits(
        habits.map((habit) =>
          habit._id === updateHabit._id ? respnse.data : habit
        )
      );
    } catch (error) {
      console.error("Error updateing habit :", error);
    }
  };

  //delete habit
  const deleteHabit = async (id) => {
    try {
      await axios.delete(`/habit/deleteHabit/${id}`);
      setHabits(habits.filter((habit) => habit._id !== id));
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              isAuthenticated={isAuthenticated}
              user={user}
              habits={habits}
              onDelete={deleteHabit}
              onUpdate={updateHabit}
            />
          }
        />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route
          path="/user"
          element={<User user={user} onLogout={handleLogout} />}
        />
      </Routes>
    </div>
  );
}

export default App;
