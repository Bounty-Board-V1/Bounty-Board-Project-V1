/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
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
import { useDebounce } from "@/hooks/useDebounce";

const TeamManagementPage = () => {
  const [teams, setTeams] = useState([]);
  const [newTeamName, setNewTeamName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(false);
  const debouncedSearchTerm = useDebounce(newMemberEmail, 300);
  const { showToast } = useCustomToast();

  useEffect(() => {
    // Fetch teams from API
    const fetchTeams = async () => {
      // Replace with actual API call
      const mockTeams = [
        {
          id: 1,
          name: "Team Alpha",
          members: [
            {
              id: 1,
              name: "John Doe",
              email: "john@example.com",
              isAdmin: true,
            },
          ],
        },
        {
          id: 2,
          name: "Team Beta",
          members: [
            {
              id: 2,
              name: "Jane Smith",
              email: "jane@example.com",
              isAdmin: true,
            },
          ],
        },
      ];
      setTeams(mockTeams);
    };
    fetchTeams();
  }, []);

  useEffect(() => {
    const searchUsers = async () => {
      if (debouncedSearchTerm) {
        // Replace with actual API call
        const mockUsers = [
          { id: 1, name: "John Doe", email: "john@example.com" },
          { id: 2, name: "Jane Smith", email: "jane@example.com" },
          { id: 3, name: "Bob Johnson", email: "bob@example.com" },
        ].filter((user) => user.email.includes(debouncedSearchTerm));
        setUserSuggestions(mockUsers);
      } else {
        setUserSuggestions([]);
      }
    };

    searchUsers();
  }, [debouncedSearchTerm]);

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    // Replace with actual API call
    const newTeam = { id: teams.length + 1, name: newTeamName, members: [] };
    setTeams([...teams, newTeam]);
    setNewTeamName("");
    showToast(
      "Team Created",
      `${newTeamName} has been created successfully.`,
      "success"
    );
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!selectedTeam) {
      showToast("Error", "Please select a team first.", "destructive");
      return;
    }
    // Replace with actual API call
    const newMember = userSuggestions.find(
      (user) => user.email === newMemberEmail
    );
    if (!newMember) {
      showToast("Error", "User not found.", "destructive");
      return;
    }
    const updatedTeams = teams.map((team) =>
      team.id === selectedTeam.id
        ? {
            ...team,
            members: [...team.members, { ...newMember, isAdmin: false }],
          }
        : team
    );
    setTeams(updatedTeams);
    setNewMemberEmail("");
    setUserSuggestions([]);
    showToast(
      "Member Added",
      `${newMember.name} added to ${selectedTeam.name}.`,
      "success"
    );
  };

  const handleRemoveMember = async (teamId, memberId) => {
    // Replace with actual API call
    const updatedTeams = teams.map((team) =>
      team.id === teamId
        ? {
            ...team,
            members: team.members.filter((member) => member.id !== memberId),
          }
        : team
    );
    setTeams(updatedTeams);
    showToast("Member Removed", "Team member has been removed.", "success");
  };

  const handleToggleAdmin = async (teamId, memberId) => {
    if (!isCurrentUserAdmin) {
      showToast(
        "Error",
        "Only team admins can change admin status.",
        "destructive"
      );
      return;
    }
    // Replace with actual API call
    const updatedTeams = teams.map((team) =>
      team.id === teamId
        ? {
            ...team,
            members: team.members.map((member) =>
              member.id === memberId
                ? { ...member, isAdmin: !member.isAdmin }
                : member
            ),
          }
        : team
    );
    setTeams(updatedTeams);
    showToast(
      "Admin Status Updated",
      "Team member admin status has been updated.",
      "success"
    );
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
              <div className="space-y-2">
                <Label htmlFor="teamName">Team Name</Label>
                <Input
                  id="teamName"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  required
                />
              </div>
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
              <div className="space-y-2">
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
              </div>
              <div className="space-y-2 mt-4">
                <Label htmlFor="memberEmail">Member Email</Label>
                <div className="relative">
                  <Input
                    id="memberEmail"
                    type="email"
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {userSuggestions.length > 0 && (
                  <ul className="mt-2 border rounded-md shadow-sm">
                    {userSuggestions.map((user) => (
                      <li
                        key={user.id}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setNewMemberEmail(user.email)}
                      >
                        {user.name} ({user.email})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <Button type="submit" className="mt-4">
                Add Member
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
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
                  {team.members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.isAdmin ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
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
