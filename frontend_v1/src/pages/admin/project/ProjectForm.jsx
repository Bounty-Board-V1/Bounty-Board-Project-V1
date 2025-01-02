/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({ title: '', description: '', status: 'Not Started', budget: '' });

  useEffect(() => {
    if (id) {
      // Fetch project data if editing
      // Replace with actual API call
      setProject({ id, title: 'E-commerce Platform', description: 'An online store project', status: 'In Progress', budget: '15000' });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement create/update functionality
    console.log('Project data:', project);
    navigate('/admin/projects');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={project.title}
          onChange={(e) => setProject({ ...project, title: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={project.description}
          onChange={(e) => setProject({ ...project, description: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select value={project.status} onValueChange={(value) => setProject({ ...project, status: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Not Started">Not Started</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="budget">Budget</Label>
        <Input
          id="budget"
          type="number"
          value={project.budget}
          onChange={(e) => setProject({ ...project, budget: e.target.value })}
          required
        />
      </div>
      <Button type="submit">{id ? 'Update' : 'Create'} Project</Button>
    </form>
  );
}

