import React from "react";
import axiosClient from "../api/axiosClient";

const Login = () => {
  const handleMicrosoftLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/microsoft";
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Login</h2>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
          onClick={handleMicrosoftLogin}
        >
          Login with Microsoft
        </button>
      </div>
    </div>
  );
};

export default Login;
