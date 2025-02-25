/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProjectSlider from "./ProjectSlider";

const uniqueTechStacks = [
  "JavaScript",
  "Python",
  "Java",
  "C#",
  "C++",
  "PHP",
  "Ruby",
  "Swift",
  "Go",
  "Kotlin",
  "TypeScript",
  "React",
  "Angular",
  "Vue.js",
  "Node.js",
  "Django",
  "Flask",
  "Spring Boot",
  "Express.js",
  "Laravel",
  "Ruby on Rails",
  "TensorFlow",
  "PyTorch",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Firebase",
];
export function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTechStack, setSelectedTechStack] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch projects from the API
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/project");
        if (response.ok) {
          const data = await response.json();
          setProjects(data);  // Store fetched projects
        } else {
          throw new Error("Failed to fetch projects");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);
  
  // Fetch specific project when "View More" is clicked
  const handleViewMore = async (projectId) => {
    setProjectLoading(true);
    try {
      const token = localStorage.getItem("token"); // Ensure your AuthContext provides the token

      const response = await fetch(
        `http://localhost:5000/api/project/${projectId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the token here
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch project details");
      }
      const projectData = await response.json();
      setSelectedProject(projectData);
      setIsSliderOpen(true);
    } catch (error) {
      console.error("Error fetching project:", error);
    } finally {
      setProjectLoading(false);
    }
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTechStack === "" || project.techStack.includes(selectedTechStack))
  );

  const uniqueTechStacks = [
    ...new Set(projects.flatMap((project) => project.techStack)),
  ];
  const handleViewMore = (project) => {
    setSelectedProject(project);
    setIsSliderOpen(true);
  };

  if (loading) {
    return <div>Loading...</div>;  // Add loading state
  }

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

        {loading && (
          <p className="text-center text-gray-500">Loading projects...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <>
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
                      <Button
                        onClick={() => handleViewMore(project.id)}
                        disabled={projectLoading}
                      >
                        {projectLoading ? "Loading..." : "View More"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <ProjectSlider
        project={selectedProject}
        isOpen={isSliderOpen}
        onClose={() => setIsSliderOpen(false)}
      />
    </div>
  );
}
