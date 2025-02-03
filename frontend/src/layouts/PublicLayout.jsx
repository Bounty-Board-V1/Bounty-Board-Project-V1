/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Toaster } from "@/components/ui/toaster";

const PublicLayout = () => {
  const { user } = useAuth();

  // If already logged in, redirect to home
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <Outlet />
      <Toaster />
    </main>
  );
};

export default PublicLayout;
