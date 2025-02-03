/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCustomToast } from "@/hooks/useCustomToast";
import ClaimProjectButton from "@/components/ClaimProjectButton";

function ProjectDetailsPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const { showToast } = useCustomToast();

  useEffect(() => {
    // Fetch project details
    // Replace with actual API call
    const fetchProject = async () => {
      const mockProject = {
        id: id,
        title: "E-commerce Platform Development",
        description:
          "Develop a full-featured online store with product management, shopping cart, and secure checkout process.",
        status: "In Progress",
        progress: 60,
        budget: "$15,000",
        deadline: "2023-12-31",
        client: "John Doe",
        techStack: ["React", "Node.js", "MongoDB"],
        assignedTeam: null,
      };
      setProject(mockProject);
    };

    // Fetch teams
    // Replace with actual API call
    const fetchTeams = async () => {
      const mockTeams = [
        { id: 1, name: "Team Alpha" },
        { id: 2, name: "Team Beta" },
        { id: 3, name: "Team Gamma" },
      ];
      setTeams(mockTeams);
    };

    fetchProject();
    fetchTeams();
  }, [id]);

  const handleAssignTeam = async () => {
    if (!selectedTeam) {
      showToast("Error", "Please select a team to assign", "destructive");
      return;
    }

    // Replace with actual API call
    setProject({ ...project, assignedTeam: selectedTeam });
    showToast(
      "Team Assigned",
      `Project assigned to ${selectedTeam.name}`,
      "success"
    );
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">{project.title}</CardTitle>
          <div className="flex items-center space-x-2 mt-2">
            <Badge variant="outline">{project.status}</Badge>
            <span className="text-sm text-muted-foreground">
              Budget: {project.budget}
            </span>
            <span className="text-sm text-muted-foreground">
              Deadline: {project.deadline}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p>{project.description}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Progress</h3>
              <Progress value={project.progress} className="w-full" />
              <span className="text-sm text-muted-foreground">
                {project.progress}% Complete
              </span>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, index) => (
                  <Badge key={index} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Client</h3>
              <p>{project.client}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Assigned Team</h3>
              {project.assignedTeam ? (
                <p>{project.assignedTeam.name}</p>
              ) : (
                <div className="flex items-center space-x-2">
                  <Select
                    onValueChange={(value) =>
                      setSelectedTeam(
                        teams.find((team) => team.id === parseInt(value))
                      )
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a team" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team.id} value={team.id.toString()}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={handleAssignTeam}>Assign Team</Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Edit Project</Button>
          <ClaimProjectButton project={project} />
        </CardFooter>
      </Card>
    </div>
  );
}

export default ProjectDetailsPage;
