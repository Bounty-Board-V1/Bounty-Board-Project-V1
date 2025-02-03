/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

export function ProfileForm({ user, onUpdate }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedProfile = Object.fromEntries(formData.entries());
    onUpdate(updatedProfile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={user.name} />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" defaultValue={user.email} />
      </div>
      <div>
        <Label htmlFor="secondaryEmail">Secondary Email</Label>
        <Input
          id="secondaryEmail"
          name="secondaryEmail"
          type="email"
          defaultValue={user.secondaryEmail}
        />
      </div>
      <div>
        <Label htmlFor="cv">CV</Label>
        <Input
          id="cv"
          name="cv"
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              onUpdate({ cv: file.name });
            }
          }}
        />
      </div>
      <Button type="submit">Update Profile</Button>
    </form>
  );
}
