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
  const { user } = useAuth();
  const [teams, setTeams] = useState([]);
  const [newTeamName, setNewTeamName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [userSuggestions, setUserSuggestions] = useState([]);
  const debouncedSearchTerm = useDebounce(newMemberEmail, 300);
  const { showToast } = useCustomToast();

  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/team/my-teams`, {
          headers,
        });
        if (!response.ok) throw new Error("Failed to fetch teams");
        const data = await response.json();

        setTeams(data.teams);
      } catch (error) {
        showToast("Error", error.message, "destructive");
      }
    };
    fetchTeams();
  }, [token]);

  const fetchUserSuggestions = async (email) => {
    if (!email) {
      setUserSuggestions([]);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user/searchUsers?email=${email}`, { headers });
      if (!response.ok) throw new Error("Failed to fetch user suggestions");

      const data = await response.json();
      setUserSuggestions(data);
    } catch (error) {
      console.error("Error fetching user suggestions:", error);
      setUserSuggestions([]);
    }
  };

  useEffect(() => {
    fetchUserSuggestions(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

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
      setTeams([...teams, newTeam]);
      setNewTeamName("");

      showToast("Team Created", `${newTeamName} has been created.`, "success");
    } catch (error) {
      showToast("Error", error.message, "destructive");
    }
  };

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

      showToast("Request Sent", `Join request sent to ${selectedTeam.name}.`, "success");
      setNewMemberEmail("");
      setUserSuggestions([]);
    } catch (error) {
      showToast("Error", error.message, "destructive");
    }
  };

  const handleRemoveMember = async (teamId, memberId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/team/removeMember/${memberId}`, {
        method: "DELETE",
        headers,
        body: JSON.stringify({ teamId }),
      });

      if (!response.ok) throw new Error("Failed to remove member");

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
                  setSelectedTeam(teams.find((team) => team.id === parseInt(e.target.value)))
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
                {userSuggestions.length > 0 && (
                  <ul className="absolute w-full bg-white border border-gray-300 rounded shadow-md z-10">
                    {userSuggestions.map((user) => (
                      <li
                        key={user.id}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setNewMemberEmail(user.email);
                          setUserSuggestions([]);
                        }}
                      >
                        {user.email}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <Button type="submit" className="mt-4">
                Send Request
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamManagementPage;
