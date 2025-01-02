/* eslint-disable no-unused-vars */
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { ProjectsSection } from "./components/ProjectsSection";
import { AccountPage } from "./pages/AccountPage";
import Login from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { Footer } from "./components/Footer";
import MyProjectsPage from "./pages/MyProjectsPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import SingleProjectPage from "./pages/SingleProjectPage";
import SettingsPage from "./pages/SettingsPage";
import SearchPage from "./pages/SearchPage";
import NotificationsPage from "./pages/NotificationsPage";

function About() {
  return <h1 className="text-3xl font-bold">About Page</h1>;
}

function Services() {
  return <h1 className="text-3xl font-bold">Services Page</h1>;
}

function Contact() {
  return <h1 className="text-3xl font-bold">Contact Page</h1>;
}

function AppContent() {
  const location = useLocation();

  // Define routes where Navbar should not be displayed
  const noNavbarRoutes = ["/login"];
  const showNavbar = !noNavbarRoutes.includes(location.pathname);

  const noFooterRoutes = ["/login"];
  const showFooter = !noFooterRoutes.includes(location.pathname);

  return (
    <div className="App">
      {showNavbar && <Navbar />}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/my-projects" element={<MyProjectsPage />} />
          <Route path="/create-project" element={<CreateProjectPage />} />
          <Route path="/single-project/:id" element={<SingleProjectPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
