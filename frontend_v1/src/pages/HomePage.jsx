/* eslint-disable no-unused-vars */
import { ProjectsSection } from "@/components/ProjectsSection";
import React from "react";

function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome to Our Platform</h1>
      <ProjectsSection />
    </div>
  );
}

export default HomePage;
