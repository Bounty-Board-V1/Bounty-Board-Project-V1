/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Mock search function
  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, this would call an API to get search results
    const mockResults = [
      {
        id: 1,
        title: "E-commerce Platform",
        status: "Open",
        budget: "$15,000",
      },
      {
        id: 2,
        title: "Mobile App Development",
        status: "In Progress",
        budget: "$20,000",
      },
      { id: 3, title: "Website Redesign", status: "Open", budget: "$10,000" },
    ];
    setSearchResults(mockResults);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Search Projects</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit">Search</Button>
        </div>
      </form>
      <div className="grid gap-4">
        {searchResults.map((result) => (
          <Card key={result.id}>
            <CardHeader>
              <CardTitle>{result.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <Badge variant="outline">{result.status}</Badge>
                <span className="text-sm text-muted-foreground">
                  Budget: {result.budget}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
