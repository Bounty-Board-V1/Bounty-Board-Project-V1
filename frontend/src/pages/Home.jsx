import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Bounty Board</h1>
        <nav>
          <a href="/login" className="hover:text-gray-300">
            Login
          </a>
        </nav>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="bg-gray-800 text-white w-64 p-6 space-y-4">
          <h2 className="text-xl font-semibold">Navigation</h2>
          <ul className="space-y-2">
            <li>
              <a href="/profile" className="block hover:text-gray-300">
                Profile
              </a>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 p-6">
          <h2 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example Cards */}
            <div className="bg-white p-4 shadow rounded-lg">
              <h3 className="text-lg font-semibold">Project 1</h3>
              <p className="text-gray-600">Estimated time: 2 weeks</p>
              <p className="mt-2 text-blue-500">Reward: $500</p>
            </div>
            <div className="bg-white p-4 shadow rounded-lg">
              <h3 className="text-lg font-semibold">Project 2</h3>
              <p className="text-gray-600">Estimated time: 1 week</p>
              <p className="mt-2 text-blue-500">Reward: $300</p>
            </div>
            <div className="bg-white p-4 shadow rounded-lg">
              <h3 className="text-lg font-semibold">Project 3</h3>
              <p className="text-gray-600">Estimated time: 3 weeks</p>
              <p className="mt-2 text-blue-500">Reward: $1000</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
