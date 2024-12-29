/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { MultiSelect } from "./ui/multi-select";

const techOptions = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "nodejs", label: "Node.js" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "ruby", label: "Ruby" },
  { value: "csharp", label: "C#" },
  { value: "php", label: "PHP" },
  { value: "go", label: "Go" },
];

export function TechStackSelect({ value = [], onChange }) {
  return (
    <MultiSelect
      options={techOptions}
      value={value}
      onChange={onChange}
      placeholder="Select your tech stack"
    />
  );
}
