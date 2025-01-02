/* eslint-disable no-unused-vars */
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function SingleProjectPage() {
  const { id } = useParams();

  // Mock project data (in a real app, this would be fetched based on the id)
  const project = {
    id,
    title: "E-commerce Platform Development",
    description:
      "Develop a full-featured online store with product management, shopping cart, and secure checkout process.",
    status: "In Progress",
    progress: 60,
    budget: "$15,000",
    deadline: "2023-12-31",
    client: {
      name: "John Doe",
      avatar: "https://github.com/shadcn.png",
    },
    techStack: ["React", "Node.js", "MongoDB"],
    tasks: [
      { id: 1, title: "Design UI/UX", status: "Completed" },
      { id: 2, title: "Implement user authentication", status: "In Progress" },
      { id: 3, title: "Set up product database", status: "Not Started" },
      {
        id: 4,
        title: "Implement shopping cart functionality",
        status: "Not Started",
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl">{project.title}</CardTitle>
              <CardDescription className="mt-2">
                {project.description}
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-lg">
              {project.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Budget
              </p>
              <p className="text-2xl font-bold">{project.budget}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Deadline
              </p>
              <p className="text-2xl font-bold">{project.deadline}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Progress
              </p>
              <Progress value={project.progress} className="w-[100px]" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <Badge key={index} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Tasks</h3>
            <ul className="space-y-2">
              {project.tasks.map((task) => (
                <li key={task.id} className="flex justify-between items-center">
                  <span>{task.title}</span>
                  <Badge
                    variant={
                      task.status === "Completed"
                        ? "success"
                        : task.status === "In Progress"
                        ? "warning"
                        : "secondary"
                    }
                  >
                    {task.status}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Client</h3>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  src={project.client.avatar}
                  alt={project.client.name}
                />
                <AvatarFallback>{project.client.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{project.client.name}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button asChild>
            <Link to={`/project/${id}/workplace`}>Go to Workplace</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SingleProjectPage;
