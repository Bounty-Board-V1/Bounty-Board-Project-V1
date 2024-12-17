import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [hasFetched, setHasFetched] = useState(false);

  const fetchUserData = useCallback(
    async (token) => {
      try {
        console.log("Fetching user data...");
        const response = await fetch("http://localhost:5000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!response.ok) {
          console.error("Error: Invalid response or network issue");
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        const data = await response.json();
        setUser(data.user);
      } catch (err) {
        console.error("Error fetching user data:", err);
        localStorage.removeItem("token");
        navigate("/login");
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (hasFetched) return; // Prevent redundant calls

    // Extract token from the URL
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token") || localStorage.getItem("token");

    if (token) {
      setHasFetched(true); // Mark fetch as complete
      fetchUserData(token);
      if (queryParams.get("token")) {
        localStorage.setItem("token", token);
        navigate("/profile", { replace: true });
      }
    } else {
      navigate("/login");
    }
  }, [location, navigate, fetchUserData, hasFetched]);

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
