import React, { useState, useEffect } from "react";

const API_URL = "https://gullibackend.onrender.com/admin/tdl/owner/tdls";

const TDLManager = () => {
  const [tdls, setTdls] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [newTDL, setNewTDL] = useState({ id: "", name: "", objective: "", file: null });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTDLs();
  }, []);

  const fetchTDLs = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setTdls(data);
    } catch (error) {
      console.error("Error fetching TDLs:", error);
    }
  };

  const handleAddTDL = async () => {
    if (!newTDL.name || !newTDL.objective || !newTDL.file) {
      alert("Please fill all fields!");
      return;
    }
  
    setLoading(true);
    const formData = new FormData();
    formData.append("name", newTDL.name);
    formData.append("objective", newTDL.objective);
    formData.append("file", newTDL.file); // Send file in FormData
  
    try {
      const method = newTDL.id ? "PUT" : "POST";
      const url = newTDL.id ? `${API_URL}/${newTDL.id}` : API_URL;
  
      const response = await fetch(url, { method, body: formData });
  
      if (!response.ok) throw new Error("Failed to save TDL");
  
      await fetchTDLs();
      setShowDialog(false);
      setNewTDL({ id: "", name: "", objective: "", file: null });
    } catch (error) {
      console.error("Error saving TDL:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTDL = async (id) => {
    if (!window.confirm("Are you sure you want to delete this TDL?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete TDL");
      await fetchTDLs();
    } catch (error) {
      console.error("Error deleting TDL:", error);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center">
      <div className="w-full max-w-5xl p-6 bg-white shadow-lg rounded-lg">
        <button 
          onClick={() => setShowDialog(true)} 
          className="bg-blue-600 text-white px-5 py-2 rounded-md mb-6 hover:bg-blue-700 transition"
        >
          ➕ Add TDL
        </button>

        <table className="w-full border-collapse border border-gray-300 bg-white shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border p-3">Name</th>
              <th className="border p-3">Objective</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tdls.length > 0 ? (
              tdls.map((tdl) => (
                <tr key={tdl.id} className="border hover:bg-gray-100 transition">
                  <td className="border p-3">{tdl.name}</td>
                  <td className="border p-3">{tdl.objective}</td>
                  <td className="border p-3 flex space-x-2">
                    <button 
                      onClick={() => {
                        setNewTDL(tdl);
                        setShowDialog(true);
                      }}
                      className="bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-500"
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteTDL(tdl.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-6 text-gray-500">No TDLs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
            <h3 className="text-lg font-semibold mb-4 text-center">
              {newTDL.id ? "Edit TDL" : "Add New TDL"}
            </h3>
            <input
              type="text"
              placeholder="Name"
              value={newTDL.name}
              onChange={(e) => setNewTDL({ ...newTDL, name: e.target.value })}
              className="w-full p-3 mb-3 border rounded focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="Objective"
              value={newTDL.objective}
              onChange={(e) => setNewTDL({ ...newTDL, objective: e.target.value })}
              className="w-full p-3 mb-3 border rounded focus:ring focus:ring-blue-300"
            />
            <input
              type="file"
              onChange={(e) => setNewTDL({ ...newTDL, file: e.target.files[0] })}
              className="w-full p-3 mb-3 border rounded focus:ring focus:ring-blue-300"
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={handleAddTDL}
                className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600 transition"
                disabled={loading}
              >
                {loading ? "Saving..." : "✅ Save"}
              </button>
              <button
                onClick={() => setShowDialog(false)}
                className="bg-gray-400 text-white px-5 py-2 rounded hover:bg-gray-500 transition"
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TDLManager;
