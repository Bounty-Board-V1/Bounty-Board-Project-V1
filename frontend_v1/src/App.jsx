/* eslint-disable no-unused-vars */
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
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
import { AdminDashboard } from "./components/AdminDashboard";
import { AdminHome } from "./pages/admin/AdminHome";
import { UserList } from "./pages/admin/user/UserList";
import { UserForm } from "./pages/admin/user/UserForm";
import { ProjectList } from "./pages/admin/project/ProjectList";
import { ProjectForm } from "./pages/admin/project/ProjectForm";

function MainAppRoutes() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  return (
    <div className="App">
      {!isLoginPage && <Navbar />}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/my-projects" element={<MyProjectsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/create-project" element={<CreateProjectPage />} />
          <Route path="/single-project/:id" element={<SingleProjectPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route
            path="/project/:projectId/workplace"
            element={<ProjectWorkplace />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />}>
        <Route index element={<AdminHome />} />
        <Route path="users" element={<UserList />} />
        <Route path="users/new" element={<UserForm />} />
        <Route path="users/:id/edit" element={<UserForm />} />
        <Route path="projects" element={<ProjectList />} />
        <Route path="projects/new" element={<ProjectForm />} />
        <Route path="projects/:id/edit" element={<ProjectForm />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<MainAppRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
