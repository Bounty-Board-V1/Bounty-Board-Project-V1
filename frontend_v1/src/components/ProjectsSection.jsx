/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ProjectSlider } from "./ProjectSlider";

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "A full-featured online store with product management, shopping cart, and secure checkout process. Integrates with various payment gateways and shipping providers for a seamless shopping experience.",
    estimatedTime: "3 months",
    teamSize: 5,
    techStack: ["React", "Node.js", "MongoDB", "Redux", "Express"],
    paymentPrice: 15000,
    status: "In Progress",
    posterName: "John Doe",
    milestones: [
      { id: 1, name: "Project Setup and Design", status: "Completed" },
      { id: 2, name: "Backend Development", status: "In Progress" },
      { id: 3, name: "Frontend Development", status: "Not Started" },
      { id: 4, name: "Testing and Deployment", status: "Not Started" },
    ],
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A comprehensive task management solution with features like task creation, assignment, due dates, priority levels, and progress tracking. Includes team collaboration tools and reporting capabilities.",
    estimatedTime: "2 months",
    teamSize: 3,
    techStack: ["Vue.js", "Express", "PostgreSQL", "Vuex", "Socket.io"],
    paymentPrice: 8000,
    status: "Completed",
    posterName: "Jane Smith",
    milestones: [{ id: 1, name: "Full Project Cycle", status: "Completed" }],
  },
  {
    id: 3,
    title: "Social Media Dashboard",
    description:
      "An all-in-one dashboard for managing multiple social media accounts. Provides analytics, content scheduling, and engagement tracking across various platforms.",
    estimatedTime: "1 month",
    teamSize: 2,
    techStack: ["React", "Python", "MySQL", "Flask", "Pandas"],
    paymentPrice: 5000,
    status: "Not Started",
    posterName: "Alice Johnson",
    milestones: [
      { id: 1, name: "Requirements Gathering", status: "Not Started" },
      { id: 2, name: "Development", status: "Not Started" },
      { id: 3, name: "Testing and Launch", status: "Not Started" },
    ],
  },
  {
    id: 4,
    title: "Fitness Tracker",
    description:
      "A mobile app for tracking workouts, nutrition, and overall fitness progress. Includes features like custom workout plans, meal logging, and integration with wearable devices.",
    estimatedTime: "2 months",
    teamSize: 4,
    techStack: ["React Native", "Node.js", "MongoDB", "GraphQL", "Apollo"],
    paymentPrice: 12000,
    status: "In Progress",
    posterName: "Bob Williams",
    milestones: [
      { id: 1, name: "App Design and Prototyping", status: "Completed" },
      { id: 2, name: "Core Functionality Development", status: "In Progress" },
      { id: 3, name: "Integration with Wearables", status: "Not Started" },
      { id: 4, name: "Beta Testing and Refinement", status: "Not Started" },
    ],
  },
];

export function ProjectsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTechStack, setSelectedTechStack] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTechStack === "" ||
        project.techStack.includes(selectedTechStack))
  );

  const uniqueTechStacks = [
    ...new Set(projects.flatMap((project) => project.techStack)),
  ];

  const handleViewMore = (project) => {
    setSelectedProject(project);
    setIsSliderOpen(true);
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Projects
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Explore our latest projects and innovations
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64"
          />
          <select
            value={selectedTechStack}
            onChange={(e) => setSelectedTechStack(e.target.value)}
            className="block w-full sm:w-48 px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">All Tech Stacks</option>
            {uniqueTechStacks.map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {project.description.length > 100
                    ? `${project.description.substring(0, 100)}...`
                    : project.description}
                </p>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Estimated time: {project.estimatedTime}
                  </p>
                  <p className="text-sm text-gray-500">
                    Team size: {project.teamSize}
                  </p>
                </div>
                <div className="mt-4">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      +{project.techStack.length - 3} more
                    </span>
                  )}
                </div>
                <div className="mt-6">
                  <Button onClick={() => handleViewMore(project)}>
                    View More
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ProjectSlider
        project={selectedProject}
        isOpen={isSliderOpen}
        onClose={() => setIsSliderOpen(false)}
      />
    </div>
  );
}
