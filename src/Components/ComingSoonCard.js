import React from "react";
import { FaTools } from "react-icons/fa";

export default function ComingSoonCard({ title = "This Feature" }) {
  return (
    <div className="flex flex-col items-center justify-center h-96 text-center bg-white rounded-xl shadow p-6">
      <FaTools className="text-5xl text-gray-400 animate-spin-slow mb-4" />
      <h2 className="text-2xl font-bold text-gray-700">{title} Coming Soon</h2>
      <p className="text-gray-500 mt-2 max-w-md">
        We’re working hard to bring you this feature. Stay tuned, it's going to be awesome!
      </p>
    </div>
  );
}
