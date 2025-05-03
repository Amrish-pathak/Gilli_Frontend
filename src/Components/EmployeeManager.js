import React, { useEffect, useState } from "react";

export default function EmployeeManager() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", role: "", contact: "", profilePhoto: null });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const API_URL = "https://gullibackend.onrender.com";

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/employees`);
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error("Error fetching employees:", err);
      setError("Failed to load employees.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${API_URL}/admin/employees/${editingId}` : `${API_URL}/admin/employees`;

      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("role", formData.role);
      form.append("contact", formData.contact);
      if (formData.profilePhoto) form.append("profilePhoto", formData.profilePhoto);

      const res = await fetch(url, {
        method,
        body: form,
      });
      
      if (!res.ok) throw new Error("Failed to save employee");
      const data = await res.json();

      if (editingId) {
        setEmployees((prev) => prev.map((emp) => (emp.id === editingId ? data : emp)));
      } else {
        setEmployees((prev) => [...prev, data]);
      }

      setFormData({ name: "", email: "", role: "", contact: "", profilePhoto: null });
      setEditingId(null);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Submit error:", err);
      setError("Failed to save employee.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (emp) => {
    setFormData({ ...emp, profilePhoto: null }); // don't preload image
    setEditingId(emp.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await fetch(`${API_URL}/admin/employees/${id}`, { method: "DELETE" });
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete employee.");
    }
  };

  const openModal = () => {
    setFormData({ name: "", email: "", role: "", contact: "", profilePhoto: null });
    setEditingId(null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Employees</h2>
        <button
          onClick={openModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Employee
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">Employee List</h3>
        {loading ? (
          <p className="text-gray-500">Loading employees...</p>
        ) : employees.length === 0 ? (
          <p className="text-gray-500">No employees found.</p>
        ) : (
          <table className="w-full table-auto border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-1 border">Photo</th>
                <th className="px-2 py-1 border">Name</th>
                <th className="px-2 py-1 border">Email</th>
                <th className="px-2 py-1 border">Contact</th>
                <th className="px-2 py-1 border">Role</th>
                <th className="px-2 py-1 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td className="border px-2 py-1">
                    {emp.profilePhoto ? (
                      <img
                        src={emp.profilePhoto}
                        alt={emp.name}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xs">
                        N/A
                      </div>
                    )}
                  </td>
                  <td className="border px-2 py-1">{emp.name}</td>
                  <td className="border px-2 py-1">{emp.email}</td>
                  <td className="border px-2 py-1">{emp.contact}</td>
                  <td className="border px-2 py-1">{emp.role}</td>
                  <td className="border px-2 py-1 space-x-2">
                    <button
                      onClick={() => handleEdit(emp)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">
              {editingId ? "Update Employee" : "Add New Employee"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {["name", "email", "contact", "role"].map((field) => (
                <input
                  key={field}
                  name={field}
                  type="text"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-blue-500"
                  required
                />
              ))}
              <div>
                <label className="block text-sm font-medium mb-1">Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  name="profilePhoto"
                  onChange={(e) => setFormData((prev) => ({ ...prev, profilePhoto: e.target.files[0] }))}
                  className="w-full p-2 border rounded"
                />

              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                disabled={submitting}
              >
                {submitting
                  ? editingId
                    ? "Updating..."
                    : "Adding..."
                  : editingId
                    ? "Update Employee"
                    : "Add Employee"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
