/* eslint-disable no-unused-vars */
import React from 'react';
import { Overview } from './components/Overview';

function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">Dashboard Overview</h1>
      <Overview />
    </div>
  );
}

export default Dashboard;

