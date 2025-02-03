/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Button } from "@/components/ui/button";
import { useCustomToast } from "@/hooks/useCustomToast";

const ClaimProjectButton = ({ project }) => {
  const { showToast } = useCustomToast();

  const handleClaimProject = async () => {
    // Replace with actual API call to claim the project
    try {
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      showToast(
        "Project Claimed",
        `You have successfully claimed the project: ${project.title}`,
        "success"
      );
    } catch (error) {
      showToast(
        "Error",
        "Failed to claim the project. Please try again.",
        "destructive"
      );
    }
  };

  // Check if the current user is a team admin
  // Replace this with actual logic to check user's admin status
  const isTeamAdmin = true; // Placeholder

  if (!project.assignedTeam) {
    return null; // Don't show the button if no team is assigned
  }

  return (
    <Button
      onClick={handleClaimProject}
      disabled={!isTeamAdmin}
      title={!isTeamAdmin ? "Only team admins can claim projects" : ""}
    >
      Claim Project
    </Button>
  );
};

export default ClaimProjectButton;
