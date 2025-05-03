import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_URL = "https://gullibackend.onrender.com";

export default function OurTeam() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch(`${API_URL}/admin/employees`);
        const data = await res.json();
        setTeamMembers(data);
      } catch (error) {
        console.error("Error fetching team:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">Meet Our Team</h2>
        <p className="text-gray-500 mb-12">
          Passionate professionals dedicated to building innovative solutions.
        </p>

        {loading ? (
          <div className="flex justify-center mt-16">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={member.id}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center"
              >
                <img
                  src={member.profilePhoto || "https://via.placeholder.com/150?text=👤"}
                  alt={member.name}
                  className="w-24 h-24 rounded-full shadow-md object-cover mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
