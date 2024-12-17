import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import CompleteProfile from "../pages/CompleteProfile";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Define Routes */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />

        {/* Fallback route for unmatched URLs */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
