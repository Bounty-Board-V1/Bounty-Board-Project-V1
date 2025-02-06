/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const CreateProject = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic");
  const { user } = useAuth(); // Fetch and validate user
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    posterId: user?.id,
    status: "Open",
    rewardAmount: "",
    techStack: [],
    estimatedTime: "",
    timeline: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      timeline: date,
    }));
  };

  const handleTechStackAdd = (tech) => {
    if (tech && !formData.techStack.includes(tech)) {
      setFormData((prevState) => ({
        ...prevState,
        techStack: [...prevState.techStack, tech],
      }));
    }
  };

  const handleTechStackRemove = (tech) => {
    setFormData((prevState) => ({
      ...prevState,
      techStack: prevState.techStack.filter((t) => t !== tech),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(JSON.stringify(formData));

    try {
      const token = localStorage.getItem("token"); // Ensure your AuthContext provides the token

      const response = await fetch("http://localhost:5000/api/project/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token here
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Project created successfully!",
          description: "Your new project has been added to the system.",
        });
        navigate("/my-projects");
      } else {
        throw new Error("Failed to create project");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl h-[65vh] flex flex-col">
      <Card>
        <CardHeader>
          <CardTitle>Create New Project</CardTitle>
          <CardDescription>
            Fill in the details to create a new project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <input
              type="hidden"
              id="posterId"
              name="posterId"
              value={formData.posterId}
            />
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="details">Project Details</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>
              <TabsContent value="basic">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Project Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="details">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="rewardAmount">Reward Amount</Label>
                    <Input
                      id="rewardAmount"
                      name="rewardAmount"
                      type="number"
                      value={formData.rewardAmount}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="techStack">Tech Stack</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                          <button
                            type="button"
                            onClick={() => handleTechStackRemove(tech)}
                            className="ml-1 text-xs"
                          >
                            <X size={12} />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        id="techStack"
                        placeholder="Add technology"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleTechStackAdd(e.target.value);
                            e.target.value = "";
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          const input = document.getElementById("techStack");
                          handleTechStackAdd(input.value);
                          input.value = "";
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="timeline">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="timeline">Project Timeline</Label>
                    <DatePicker
                      id="timeline"
                      selected={formData.timeline}
                      onChange={handleDateChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="estimatedTime">Estimated Time</Label>
                    <Input
                      id="estimatedTime"
                      name="estimatedTime"
                      value={formData.estimatedTime}
                      onChange={handleChange}
                      placeholder="e.g., 2 weeks, 3 months"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </CardContent>
        <CardFooter>
          <div className="flex justify-between w-full">
            <Button
              variant="outline"
              onClick={() => {
                const tabs = ["basic", "details", "timeline"];
                const currentIndex = tabs.indexOf(activeTab);
                if (currentIndex > 0) {
                  setActiveTab(tabs[currentIndex - 1]);
                }
              }}
              disabled={activeTab === "basic"}
            >
              Previous
            </Button>
            {activeTab !== "timeline" ? (
              <Button
                onClick={() => {
                  const tabs = ["basic", "details", "timeline"];
                  const currentIndex = tabs.indexOf(activeTab);
                  if (currentIndex < tabs.length - 1) {
                    setActiveTab(tabs[currentIndex + 1]);
                  }
                }}
              >
                Next
              </Button>
            ) : (
              <Button type="submit" onClick={handleSubmit}>
                Create Project
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateProject;
