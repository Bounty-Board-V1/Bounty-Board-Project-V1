import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient"; // Import axiosClient

const useAuth = ({ protectCompleteProfile = false } = {}) => {
  const [user, setUser] = useState(null); // Store user data
  const [hasFetched, setHasFetched] = useState(false); // Prevent redundant fetches
  const location = useLocation();
  const navigate = useNavigate();

  const fetchUserData = useCallback(
    async (token) => {
      try {
        console.log("Fetching user data...");

        // Use axiosClient to fetch user data
        const response = await axiosClient.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // Include cookies if necessary
        });

        const data = await response.data; // Get user data from the response
        setUser(data.user); // Store user data

        // Redirect if the user has already completed their profile
        if (protectCompleteProfile && data.user.profileCompleted) {
          navigate("/home"); // Redirect to dashboard
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        localStorage.removeItem("token");
        navigate("/login");
      }
    },
    [navigate, protectCompleteProfile]
  );

  useEffect(() => {
    if (hasFetched) return; // Prevent redundant calls

    // Extract token from the URL or localStorage
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token") || localStorage.getItem("token");

    if (token) {
      setHasFetched(true); // Mark fetch as complete
      fetchUserData(token);

      if (queryParams.get("token")) {
        localStorage.setItem("token", token); // Save token to localStorage
        navigate(location.pathname, { replace: true }); // Clean URL
      }
    } else {
      navigate("/login");
    }
  }, [location, navigate, fetchUserData, hasFetched]);

  return { user, setUser, hasFetched };
};

export default useAuth;
