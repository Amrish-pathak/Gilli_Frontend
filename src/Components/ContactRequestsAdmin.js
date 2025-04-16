import React, { useEffect, useState } from "react";
import { CheckCircle, Clock, Loader2, ListChecks } from "lucide-react";
const statusOptions = ["Pending", "Ongoing", "Solved"];
const sortOptions = ["Newest", "Oldest"];

const ContactRequestsAdmin = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [productFilter, setProductFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(null);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    try {
      const res = await fetch("https://gullibackend.onrender.com/admin/contact-requests");
      const data = await res.json();
      setRequests(data);
      setFilteredRequests(data);
    } catch (err) {
      console.error("Error fetching contact requests:", err);
      setError("Failed to load contact requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    filterAndSort();
  }, [statusFilter, productFilter, sortOrder, requests]);

  const filterAndSort = () => {
    let filtered = [...requests];

    if (statusFilter !== "All") {
      filtered = filtered.filter((req) => req.status === statusFilter);
    }

    if (productFilter !== "All") {
      filtered = filtered.filter((req) => req.product === productFilter);
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "Newest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredRequests(filtered);
  };

  const updateStatus = async (id, newStatus) => {
    setStatusLoading(id);
    try {
      const res = await fetch(`https://gullibackend.onrender.com/admin/contact-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setRequests((prev) =>
          prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
        );
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Something went wrong while updating the status.");
    } finally {
      setStatusLoading(null);
    }
  };

  const getStatusCount = (status) => requests.filter((r) => r.status === status).length;

  const uniqueProducts = ["All", ...new Set(requests.map((req) => req.product).filter(Boolean))];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4 animate-fade-in">
        {/* Gear Spinner */}
        <div className="relative">
          <div className="h-20 w-20 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-3xl animate-bounce">👨‍🔧</span>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <p className="text-lg text-gray-600 font-medium animate-pulse">
            Gearing up the contact requests...
          </p>
          <p className="text-sm text-gray-400">Hang tight! Our mechanic is on it 🔧</p>
        </div>
      </div>
    );
  }


  if (error) {
    return (
      <div className="text-center text-red-500 font-semibold mt-10">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7x1 mx-auto px-1 py-10">
      {/* Dashboard Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow space-x-4">
          <ListChecks className="text-gray-500" />
          <div>
            <h4 className="text-sm text-gray-600">Total</h4>
            <p className="text-2xl font-bold">{requests.length}</p>
          </div>
        </div>
        <div className="flex items-center bg-yellow-100 p-4 rounded-lg shadow space-x-4">
          <Clock className="text-yellow-700" />
          <div>
            <h4 className="text-sm text-yellow-800">Pending</h4>
            <p className="text-xl font-bold text-yellow-800">{getStatusCount("Pending")}</p>
          </div>
        </div>
        <div className="flex items-center bg-blue-100 p-4 rounded-lg shadow space-x-4">
          <Loader2 className="text-blue-700" />
          <div>
            <h4 className="text-sm text-blue-800">Ongoing</h4>
            <p className="text-xl font-bold text-blue-800">{getStatusCount("Ongoing")}</p>
          </div>
        </div>
        <div className="flex items-center bg-green-100 p-4 rounded-lg shadow space-x-4">
          <CheckCircle className="text-green-700" />
          <div>
            <h4 className="text-sm text-green-800">Solved</h4>
            <p className="text-xl font-bold text-green-800">{getStatusCount("Solved")}</p>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="sticky top-0 z-10 bg-white py-4 mb-6 shadow-sm rounded-md flex flex-wrap gap-4 px-2 items-center">
        <select className="p-2 border border-gray-300 rounded-md shadow-sm" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <select className="p-2 border border-gray-300 rounded-md shadow-sm" value={productFilter} onChange={(e) => setProductFilter(e.target.value)}>
          {uniqueProducts.map((prod) => (
            <option key={prod} value={prod}>{prod}</option>
          ))}
        </select>

        <select className="p-2 border border-gray-300 rounded-md shadow-sm" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          {sortOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        <div className="text-center text-gray-500">No matching requests.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredRequests.map((req) => (
            <div key={req.id} className="bg-white border rounded-xl p-6 shadow hover:shadow-lg transition space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-indigo-700">{req.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${req.status === "Solved"
                    ? "bg-green-100 text-green-800"
                    : req.status === "Ongoing"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                  {req.status}
                </span>
              </div>
              <div className="text-sm space-y-1 text-gray-700">
                <p><strong>Email:</strong> {req.email}</p>
                <p><strong>Phone:</strong> {req.contactNumber}</p>
                <p><strong>Query:</strong> {req.query}</p>
                <p><strong>Business:</strong> {req.businessName || "—"}</p>
                <p><strong>GST:</strong> {req.gstNumber || "—"}</p>
                <p><strong>Description:</strong> {req.description}</p>
                <p><strong>Date:</strong> {
                  req.createdAt
                    ? new Date(req.createdAt).toLocaleString()
                    : "Loading..."
                }</p>

              </div>


              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-600">Update:</label>
                <select
                  className="border p-1 rounded"
                  value={req.status}
                  onChange={(e) => updateStatus(req.id, e.target.value)}
                  disabled={statusLoading === req.id}
                >
                  {statusOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {statusLoading === req.id && (
                  <span className="text-sm text-blue-500 animate-pulse">Updating...</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactRequestsAdmin;
