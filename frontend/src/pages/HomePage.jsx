/* eslint-disable no-unused-vars */
import { ProjectsSection } from "@/components/ProjectsSection";
import { useCustomToast } from "@/hooks/useCustomToast";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome to Our Platform</h1>
      <ProjectsSection />
    </div>
  );
}

export default HomePage;
