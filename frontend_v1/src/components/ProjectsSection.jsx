/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-featured online store",
    estimatedTime: "3 months",
    teamSize: 5,
    techStack: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Organize and track your tasks",
    estimatedTime: "2 months",
    teamSize: 3,
    techStack: ["Vue.js", "Express", "PostgreSQL"],
  },
  {
    id: 3,
    title: "Social Media Dashboard",
    description: "Analytics for social media accounts",
    estimatedTime: "1 month",
    teamSize: 2,
    techStack: ["React", "Python", "MySQL"],
  },
  {
    id: 4,
    title: "Fitness Tracker",
    description: "Monitor your workouts and progress",
    estimatedTime: "2 months",
    teamSize: 4,
    techStack: ["React Native", "Node.js", "MongoDB"],
  },
];

export function ProjectsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTechStack, setSelectedTechStack] = useState("");

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTechStack === "" ||
        project.techStack.includes(selectedTechStack))
  );

  const uniqueTechStacks = [
    ...new Set(projects.flatMap((project) => project.techStack)),
  ];

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

        <div className="mt-8 flex justify-center space-x-4">
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <select
            value={selectedTechStack}
            onChange={(e) => setSelectedTechStack(e.target.value)}
            className="block w-48 px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">All Tech Stacks</option>
            {uniqueTechStacks.map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                  {project.description}
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
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-6">
                  <Button>View More</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
