import React from 'react';
import { ProjectsTable } from './components/ProjectsTable';

function Projects() {
  return (
    <div className="p-6">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">Projects Management</h1>
      <ProjectsTable />
    </div>
  );
}

export default Projects;

