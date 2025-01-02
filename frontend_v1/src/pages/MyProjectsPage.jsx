/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Clock, Users, Briefcase, ArrowUpRight } from "lucide-react";

// Mock function to fetch user's projects
const fetchUserProjects = async (userId) => {
  // In a real application, this would be an API call
  return [
    {
      id: 1,
      title: "E-commerce Platform",
      description:
        "A full-featured online store with product management, shopping cart, and secure checkout process.",
      status: "In Progress",
      progress: 65,
      dueDate: "2023-08-15",
      teamSize: 5,
      category: "Web Development",
      techStack: ["React", "Node.js", "MongoDB", "Redux", "Express"],
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "A comprehensive task management solution with features like task creation, assignment, due dates, priority levels, and progress tracking.",
      status: "Planning",
      progress: 20,
      dueDate: "2023-09-30",
      teamSize: 3,
      category: "Mobile App",
      techStack: ["React Native", "Firebase", "Redux"],
    },
    {
      id: 3,
      title: "AI-powered Analytics Dashboard",
      description:
        "An advanced analytics dashboard using machine learning algorithms to provide predictive insights and data visualization.",
      status: "Completed",
      progress: 100,
      dueDate: "2023-05-01",
      teamSize: 4,
      category: "Data Science",
      techStack: ["Python", "TensorFlow", "D3.js", "Flask", "PostgreSQL"],
    },
  ];
};

function MyProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // In a real application, you would get the user ID from authentication
    const userId = "current-user-id";
    fetchUserProjects(userId).then(setProjects);
  }, []);

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter(
          (project) => project.status.toLowerCase() === activeTab
        );

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "in progress":
        return "bg-blue-100 text-blue-800";
      case "planning":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Projects</h1>
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
            All Projects
          </TabsTrigger>
          <TabsTrigger
            value="in progress"
            onClick={() => setActiveTab("in progress")}
          >
            In Progress
          </TabsTrigger>
          <TabsTrigger
            value="planning"
            onClick={() => setActiveTab("planning")}
          >
            Planning
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="w-full" />
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  Due: {project.dueDate}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-2 h-4 w-4" />
                  Team Size: {project.teamSize}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Briefcase className="mr-2 h-4 w-4" />
                  {project.category}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
              <Link to={`/single-project/${project.id}`} className="w-full">
                <Button className="w-full">
                  View Project
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default MyProjectsPage;
