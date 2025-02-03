/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MyProjectsPage from "./pages/MyProjectsPage";
import LoginPage from "./pages/LoginPage";
import AccountPage from "./pages/AccountPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import SingleProjectPage from "./pages/SingleProjectPage";
import SearchPage from "./pages/SearchPage";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";
import ProjectWorkplace from "./pages/ProjectWorkplace";
import RegisterPage from "./pages/RegisterPage";
import PublicLayout from "./layouts/PublicLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import ProtectedAdminLayout from "./layouts/ProtectedAdminLayout";
import Dashboard from "./pages/admin/features/dashboard/Dashboard";
import Users from "./pages/admin/features/users/Users";
import Projects from "./pages/admin/features/projects/Projects";
import Settings from "./pages/admin/features/settings/Settings";
import Layout from "./pages/admin/components/Layout";
import TeamManagementPage from "./pages/TeamManagementPage";

function App() {
  return (
    <div className="App">
      {/* ✅ Added Router wrapper */}
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Protected User Routes */}
          <Route path="/" element={<ProtectedLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/my-projects" element={<MyProjectsPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/create-project" element={<CreateProjectPage />} />
            <Route path="/single-project/:id" element={<SingleProjectPage />} />
            <Route path="/team-management" element={<TeamManagementPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route
              path="/project/:projectId/workplace"
              element={<ProjectWorkplace />}
            />
          </Route>

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<ProtectedAdminLayout />}>
            <Route index element={<Dashboard />} /> {/* Default /admin */}
            <Route path="users" element={<Users />} /> {/* /admin/users */}
            <Route path="projects" element={<Projects />} />{" "}
            {/* /admin/projects */}
            <Route path="settings" element={<Settings />} />{" "}
            {/* /admin/settings */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
