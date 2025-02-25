/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from "../components/ProfileForm";
import { PasswordResetForm } from "../components/PasswordResetForm";
import { useAuth } from "@/context/AuthContext";
import TechStack from "@/components/TechStack";

export default function AccountPage() {
  const { user, profile } = useAuth(); // Fetch and validate user
  const handleProfileUpdate = (updatedProfile) => {
    // Handle profile update logic here
  };

  if (!user) {
    return <p>Loading...</p>; // Show a loading state until user data is fetched
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Account</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="w-32 h-32 mb-4">
              <AvatarImage src={user.profilePicture} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <Label htmlFor="picture" className="cursor-pointer">
              <Input
                id="picture"
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      handleProfileUpdate({ profilePicture: reader.result });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <Button variant="outline">Change Picture</Button>
            </Label>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <ProfileForm user={user} onUpdate={handleProfileUpdate} />
              </TabsContent>
              <TabsContent value="security">
                <PasswordResetForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Your Tech Stack</CardTitle>
            <CardDescription>
              Select the technologies you're proficient in
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TechStack />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
