/* eslint-disable no-unused-vars */
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function NotificationsPage() {
  // Mock notifications data
  const notifications = [
    {
      id: 1,
      message: "Your project proposal was accepted!",
      type: "success",
      date: "2023-06-01",
    },
    {
      id: 2,
      message: "New message from client regarding Project X",
      type: "info",
      date: "2023-05-30",
    },
    {
      id: 3,
      message: "Reminder: Project deadline approaching",
      type: "warning",
      date: "2023-05-29",
    },
  ];

  const getNotificationColor = (type) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-800";
      case "info":
        return "bg-blue-100 text-blue-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id}>
            <CardHeader>
              <CardTitle className="text-lg flex justify-between items-center">
                <span>{notification.message}</span>
                <Badge className={getNotificationColor(notification.type)}>
                  {notification.type}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {notification.date}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default NotificationsPage;
