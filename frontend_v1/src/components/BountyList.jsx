/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

function BountyList({ bounties }) {
  const handleClaimBounty = (id) => {
    // In a real application, you would send this to your server
    // and then update the state with the response from the server
    console.log(`Claiming bounty with id: ${id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bounties.map((bounty) => (
        <Card key={bounty.id}>
          <CardHeader>
            <CardTitle>{bounty.title}</CardTitle>
            <CardDescription>{bounty.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">${bounty.reward}</span>
              <Badge>{bounty.status}</Badge>
            </div>
            <Progress value={bounty.progress} className="w-full" />
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => handleClaimBounty(bounty.id)}
              disabled={bounty.status !== "Open"}
            >
              {bounty.status === "Open" ? "Claim Bounty" : "Unavailable"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default BountyList;
