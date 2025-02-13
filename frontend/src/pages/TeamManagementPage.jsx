/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCustomToast } from "@/hooks/useCustomToast";
import { Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useDebounce } from "@/hooks/useDebounce";

const API_BASE_URL = "http://localhost:5000/api";

const TeamManagementPage = () => {
  const { user } = useAuth(); // Fetch and validate user

  const [teams, setTeams] = useState([]);
  const [newTeamName, setNewTeamName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [userSuggestions, setUserSuggestions] = useState([]);
  const debouncedSearchTerm = useDebounce(newMemberEmail, 300);
  const { showToast } = useCustomToast();

  const token = localStorage.getItem("token"); // Get the token

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // Add token to headers
  };

  // Fetch Teams from API
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/team/my-teams`, {
          headers,
        });
        if (!response.ok) throw new Error("Failed to fetch teams");
        const data = await response.json();
        console.log(data);

        // Ensure each team includes the creator information
        const formattedTeams = data.teams.map((team) => ({
          ...team,
          creatorEmail: user.email,
          members: team.members || [],
        }));

        setTeams(formattedTeams);
      } catch (error) {
        showToast("Error", error.message, "destructive");
      }
    };
    fetchTeams();
  }, [token]); // Re-run effect when token changes

  // Create New Team
  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/team`, {
        method: "POST",
        headers,
        body: JSON.stringify({ name: newTeamName }),
      });
      if (!response.ok) throw new Error("Failed to create team");

      const newTeam = await response.json();
      setTeams([
        ...teams,
        { ...newTeam, creatorEmail: newTeam.creator?.email, members: [] },
      ]);
      setNewTeamName("");

      showToast("Team Created", `${newTeamName} has been created.`, "success");
    } catch (error) {
      showToast("Error", error.message, "destructive");
    }
  };

  // Request to Join a Team
  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!selectedTeam) {
      showToast("Error", "Please select a team first.", "destructive");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/request/team`, {
        method: "POST",
        headers,
        body: JSON.stringify({ teamId: selectedTeam.id, email: newMemberEmail }),
      });

      if (!response.ok) throw new Error("Failed to send join request");

      showToast(
        "Request Sent",
        `Join request sent to ${selectedTeam.name}.`,
        "success"
      );
      setNewMemberEmail("");
      setUserSuggestions([]);
    } catch (error) {
      showToast("Error", error.message, "destructive");
    }
  };

  // Remove Team Member
  const handleRemoveMember = async (teamId, memberId) => {
    console.log(JSON.stringify({ teamId }));
    
    try {
      const response = await fetch(`${API_BASE_URL}/team/removeMember/${memberId}`, {
        method: "DELETE",
        headers,
        body: JSON.stringify({ teamId }),
      });

      if (!response.ok) throw new Error("Failed to remove member");

      // Update the team list after removing the member
      setTeams((prevTeams) =>
        prevTeams.map((team) =>
          team.id === teamId
            ? {
                ...team,
                members: team.members.filter((member) => member.id !== memberId),
              }
            : team
        )
      );

      showToast("Member Removed", "The member has been removed from the team.", "success");
    } catch (error) {
      showToast("Error", error.message, "destructive");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Team Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Create Team */}
        <Card>
          <CardHeader>
            <CardTitle>Create New Team</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateTeam}>
              <Label htmlFor="teamName">Team Name</Label>
              <Input
                id="teamName"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                required
              />
              <Button type="submit" className="mt-4">
                Create Team
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Add Team Member */}
        <Card>
          <CardHeader>
            <CardTitle>Add Team Member</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddMember}>
              <Label htmlFor="teamSelect">Select Team</Label>
              <select
                id="teamSelect"
                className="w-full p-2 border rounded"
                onChange={(e) =>
                  setSelectedTeam(
                    teams.find((team) => team.id === parseInt(e.target.value))
                  )
                }
                required
              >
                <option value="">Select a team</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>

              <Label htmlFor="memberEmail" className="mt-4">
                Member Email
              </Label>
              <div className="relative">
                <Input
                  id="memberEmail"
                  type="email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  required
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              <Button type="submit" className="mt-4">
                Send Request
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Team List */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Team List</h2>
        {teams.map((team) => (
          <Card key={team.id} className="mb-8">
            <CardHeader>
              <CardTitle>{team.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Admin</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow key={`creator-${team.id}`}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>Yes</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  {team.members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>No</TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          onClick={() => handleRemoveMember(team.id, member.id)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamManagementPage;
