/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

function CreateProjectPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle project creation logic here
    console.log("Project creation submitted");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Project Title</Label>
                <Input id="title" placeholder="Enter project title" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your project"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="budget">Budget</Label>
                <Input
                  id="budget"
                  placeholder="Enter project budget"
                  type="number"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="deadline">Deadline</Label>
                <Input id="deadline" type="date" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            Create Project
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default CreateProjectPage;
