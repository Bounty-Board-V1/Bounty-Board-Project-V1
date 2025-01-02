/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", role: "User" });

  useEffect(() => {
    if (id) {
      // Fetch user data if editing
      // Replace with actual API call
      setUser({
        id,
        name: "John Doe",
        email: "john@example.com",
        role: "User",
      });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement create/update functionality
    console.log("User data:", user);
    navigate("/admin/users");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="role">Role</Label>
        <Select
          value={user.role}
          onValueChange={(value) => setUser({ ...user, role: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="User">User</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">{id ? "Update" : "Create"} User</Button>
    </form>
  );
}
