/* eslint-disable react/prop-types */
import { useState } from "react";
import { DialogWrapper } from "../../../components/ui/dialog-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddProjectDialog({ isOpen, onClose, onAddProject, users }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open");
  const [rewardAmount, setRewardAmount] = useState("");
  const [posterUserId, setPosterUserId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProject({
      id: "",
      title,
      description,
      status,
      rewardAmount: parseFloat(rewardAmount),
      posterUserId,
    });
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus("open");
    setRewardAmount("");
    setPosterUserId("");
  };

  return (
    <DialogWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Project"
      footer={
        <>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="add-project-form">
            Add Project
          </Button>
        </>
      }
    >
      <form id="add-project-form" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter project title"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Enter project description"
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={(value) => setStatus(value)} value={status}>
              <SelectTrigger>
                <SelectValue placeholder="Select project status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="rewardAmount">Reward Amount</Label>
            <Input
              id="rewardAmount"
              type="number"
              step="0.01"
              value={rewardAmount}
              onChange={(e) => setRewardAmount(e.target.value)}
              required
              placeholder="Enter reward amount"
            />
          </div>
          <div>
            <Label htmlFor="posterUser">Poster User</Label>
            <Select
              onValueChange={setPosterUserId}
              value={posterUserId}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select poster user" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </form>
    </DialogWrapper>
  );
}
