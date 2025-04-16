import React, { useEffect, useState } from "react";
import { FaCog, FaTools } from "react-icons/fa"; // Gear icons

export default function AdmissionTrainingDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://your-backend-url.com/admin/dashboard-data") // Replace with your backend
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading dashboard data:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <FaCog className="animate-spin text-4xl text-blue-500" />
        <p className="text-lg font-medium text-gray-700">Loading dashboard...</p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="flex flex-col items-center justify-center h-80 space-y-4 text-center">
        <div className="flex space-x-4">
          <FaCog className="animate-spin text-4xl text-red-500" />
          <FaTools className="animate-spin-slow text-4xl text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-red-600">Oh no!</h2>
        <p className="text-gray-600 text-lg">
          Sorry, we were unable to fetch your dashboard data.<br />
          Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold">Admission & Training Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Admissions" value={stats.totalAdmissions} />
        <StatCard title="Ongoing Trainings" value={stats.ongoingTrainings} />
        <StatCard title="Completed Trainings" value={stats.completedTrainings} />
        <StatCard title="Upcoming Assessments" value={stats.upcomingAssessments} />
      </div>

      {/* Recent Admissions Table */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Admissions</h2>
        {stats.recentAdmissions.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {stats.recentAdmissions.map((student) => (
              <li key={student.id} className="py-2 flex justify-between">
                <div>
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-gray-600">{student.course}</p>
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(student.date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recent admissions.</p>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
