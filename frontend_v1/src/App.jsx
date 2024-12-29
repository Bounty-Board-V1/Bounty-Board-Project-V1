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

function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome to Our Platform</h1>
      <ProjectsSection />
    </div>
  );
}

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

  return (
    <div className="App">
      {showNavbar && <Navbar />}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </main>
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
