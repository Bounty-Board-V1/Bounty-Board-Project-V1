/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function ProjectList() {
  // Mock data - replace with actual API call
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "E-commerce Platform",
      status: "In Progress",
      budget: "$15,000",
    },
    {
      id: 2,
      title: "Mobile App Development",
      status: "Completed",
      budget: "$20,000",
    },
  ]);

  const deleteProject = (id) => {
    // Implement delete functionality
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button asChild>
          <Link to="/admin/projects/new">Add New Project</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.title}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    project.status === "Completed" ? "success" : "warning"
                  }
                >
                  {project.status}
                </Badge>
              </TableCell>
              <TableCell>{project.budget}</TableCell>
              <TableCell>
                <Button asChild variant="outline" className="mr-2">
                  <Link to={`/admin/projects/${project.id}/edit`}>Edit</Link>
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => deleteProject(project.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
