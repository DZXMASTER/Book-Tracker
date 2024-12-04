import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to BookTracker</h1>
      <p className="text-lg text-gray-700 mb-6">
        Your personal library assistant to track, organize, and manage your
        reading journey!
      </p>
      <Link
        to="/dashboard"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default Home;
