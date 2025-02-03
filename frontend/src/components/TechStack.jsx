/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Check } from "lucide-react";

const techOptions = [
  { id: "react", name: "React" },
  { id: "nextjs", name: "Next.js" },
  { id: "typescript", name: "TypeScript" },
  { id: "javascript", name: "JavaScript" },
  { id: "nodejs", name: "Node.js" },
  { id: "express", name: "Express" },
  { id: "mongodb", name: "MongoDB" },
  { id: "postgresql", name: "PostgreSQL" },
  { id: "graphql", name: "GraphQL" },
  { id: "rest", name: "REST API" },
  { id: "tailwind", name: "Tailwind CSS" },
  { id: "sass", name: "Sass" },
  { id: "redux", name: "Redux" },
  { id: "docker", name: "Docker" },
  { id: "aws", name: "AWS" },
];

export default function TeckStack() {
  const [selectedTech, setSelectedTech] = useState([]);

  const toggleTech = (techId) => {
    setSelectedTech((prev) =>
      prev.includes(techId)
        ? prev.filter((id) => id !== techId)
        : [...prev, techId]
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {techOptions.map((tech) => (
          <label
            key={tech.id}
            className={`flex items-center p-3 rounded-md cursor-pointer transition-colors ${
              selectedTech.includes(tech.id)
                ? "bg-primary text-primary-foreground"
                : "bg-secondary hover:bg-secondary/80"
            }`}
          >
            <input
              type="checkbox"
              checked={selectedTech.includes(tech.id)}
              onChange={() => toggleTech(tech.id)}
              className="sr-only"
            />
            <span className="flex-grow">{tech.name}</span>
            {selectedTech.includes(tech.id) && (
              <Check className="h-5 w-5 ml-2" />
            )}
          </label>
        ))}
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-medium text-foreground mb-2">
          Selected Technologies:
        </h3>
        <div className="flex flex-wrap gap-2">
          {selectedTech.map((techId) => (
            <span
              key={techId}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
            >
              {techOptions.find((t) => t.id === techId).name}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
