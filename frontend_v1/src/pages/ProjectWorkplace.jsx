/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle2, Upload } from 'lucide-react';

// Mock data for demonstration
const mockProject = {
  id: '1',
  title: 'E-commerce Platform Development',
  milestones: [
    { id: 1, title: 'Project Setup', completed: true },
    { id: 2, title: 'Frontend Development', completed: false },
    { id: 3, title: 'Backend Integration', completed: false },
    { id: 4, title: 'Testing and Deployment', completed: false },
  ],
  currentMilestone: {
    id: 2,
    title: 'Frontend Development',
    requirements: [
      'Implement responsive design',
      'Create product listing page',
      'Develop shopping cart functionality',
      'Design and implement checkout process',
    ],
  },
};

export default function ProjectWorkplace() {
  const { projectId } = useParams();
  const [project] = useState(mockProject); // In a real app, you'd fetch this based on projectId
  const [files, setFiles] = useState([]);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Here you would typically send the files and comment to your backend
    console.log('Submitting files:', files);
    console.log('Comment:', comment);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Milestone submitted for approval!');
    }, 2000);
  };

  const currentMilestoneIndex = project.milestones.findIndex(m => m.id === project.currentMilestone.id);
  const progress = ((currentMilestoneIndex + 1) / project.milestones.length) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{project.title} - Workplace</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Milestone Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="w-full" />
          <div className="flex justify-between mt-2">
            {project.milestones.map((milestone, index) => (
              <div key={milestone.id} className="flex flex-col items-center">
                {milestone.completed ? (
                  <CheckCircle2 className="text-green-500" />
                ) : (
                  <AlertCircle className="text-gray-300" />
                )}
                <span className="text-sm mt-1">{index + 1}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Current Milestone: {project.currentMilestone.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Requirements:</h3>
          <ul className="list-disc pl-5">
            {project.currentMilestone.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Submit Work</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="file-upload">Upload Files</Label>
            <div className="mt-1 flex items-center">
              <Input
                id="file-upload"
                type="file"
                multiple
                onChange={handleFileChange}
                className="sr-only"
              />
              <Label
                htmlFor="file-upload"
                className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Upload className="h-4 w-4 inline-block mr-1" />
                Choose files
              </Label>
            </div>
            {files.length > 0 && (
              <ul className="mt-2 text-sm text-gray-600">
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={handleCommentChange}
              placeholder="Add any comments about your submission here..."
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit for Approval'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

