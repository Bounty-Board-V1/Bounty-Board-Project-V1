import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth(); // Fetch and validate user
  const navigate = useNavigate();

  if (!user) {
    return <p>Loading...</p>; // Show a loading state until user data is fetched
  }

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");

    // Optionally, call backend logout API to clear server-side session
    fetch("http://localhost:5000/api/auth/logout", {
      method: "GET",
      credentials: "include", // For session-based logout
    });

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {user ? (
        <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">
            Welcome, {user.name}!
          </h1>
          <p className="text-gray-700 text-lg mb-6">Email: {user.email}</p>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-gray-700 text-lg">Loading...</p>
      )}
    </div>
  );
};

export default Profile;
