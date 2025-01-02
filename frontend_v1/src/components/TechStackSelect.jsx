/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { MultiSelect } from "./ui/multi-select";

const techOptions = ["react", "ruby", "go"];

const safeOptions = Array.isArray(techOptions) ? techOptions : [];

export function TechStackSelect({ value = [], onChange }) {
  console.log("Options in MultiSelect:", techOptions);
  console.log("Value in MultiSelect:", value);

  return (
    <MultiSelect
      options={safeOptions}
      value={Array.isArray(value) ? value : []}
      onChange={onChange}
      placeholder="Select your tech stack"
    />
  );
}
