/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCustomToast } from "@/hooks/useCustomToast"; // Import toast
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { showToast } = useCustomToast(); // Initialize toast
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        showToast("Error", errorData.message || "Login failed", "destructive");
        return;
      }

      const data = await response.json();
      login(data.token); // Save token

      const decoded = JSON.parse(atob(data.token.split(".")[1]));
      console.log("Decoded Token:", decoded);
      
      
      if (decoded.role !== "Admin") {
        showToast("Success", "User login successful!", "success");
        console.log("Navigating to /...");
        navigate("/");
      } else {
        showToast("Success", "Admin login successful!", "success");
        console.log("Navigating to /admin...");
        setTimeout(() => {
          navigate("/admin");
        }, 1);
      }
    } catch (error) {
      console.error("Login Error:", error);
      showToast("Error", error.message || "Server error", "destructive");
    }
  };

  // const handleMicrosoftLogin = () => {
  //   window.location.href = "http://localhost:5000/api/auth/microsoft";
  // };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px] bg-gray-50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="m@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          {/* <Button
            variant="outline"
            className="w-full"
            onClick={handleMicrosoftLogin}
          >
            Sign in with Microsoft
          </Button> */}
          <p className="text-sm text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
