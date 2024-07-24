import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Data", formData);
      const response = await fetch(`/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Registration Failed");
      }

      const data = await response.json();

      console.log("Registration good", data);

      // saving  token and id in localstorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.user._id);

      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Registration error", error);
    }
  };
  return (
    <div>
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
          <div>
            <h2 className="lg:text-5xl text-4xl font-extrabold lg:leading-[55px] text-gray-800">
              Track Your daily Habits
            </h2>
            <p className="text-sm mt-6 text-gray-800">
              Empower your habit-building journey with our customizable,
              real-time tracking, and community-supported habit tracking app.
              Create, track, and achieve your goals with ease.
            </p>
            <p className="text-sm mt-12 text-gray-800">
              Already have an account
              <Link
                to="/auth/login"
                className="text-blue-600 font-semibold hover:underline ml-1"
              >
                Login here
              </Link>
            </p>
          </div>

          <form className="max-w-md md:ml-auto w-full" onSubmit={handleSubmit}>
            <h3 className="text-gray-800 text-3xl font-extrabold mb-8">
              Sign in
            </h3>

            <div className="space-y-4">
              <div>
                <input
                  name="username"
                  type="text"
                  required
                  className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                  placeholder="Username"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  name="email"
                  type="email"
                  required
                  className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  name="password"
                  type="password"
                  required
                  className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="!mt-8">
              <input
                type="submit"
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                value="Signup"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
