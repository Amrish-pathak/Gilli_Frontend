import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://gullibackend.onrender.com/admin/tally-prime/owner/products";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [productType, setProductType] = useState("Silver");
  const [userEdition, setUserEdition] = useState("Single user edition");
  const [duration, setDuration] = useState(1);
  const [price, setPrice] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!price.trim()) return;
    const gst = (parseFloat(price) * 0.18).toFixed(2);
    const newProduct = { name: "Tally Prime", productType, userEdition, duration, price, gst };

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, newProduct);
        setProducts(products.map((p) => (p.id === editingId ? { ...p, ...newProduct } : p)));
        setEditingId(null);
      } else {
        const response = await axios.post(API_URL, newProduct);
        setProducts([...products, response.data]);
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }

    setShowPopup(false);
    setProductType("Silver");
    setUserEdition("Single user edition");
    setDuration(1);
    setPrice("");
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setProductType(product.productType);
    setUserEdition(product.userEdition);
    setDuration(product.duration);
    setPrice(product.price);
    setShowPopup(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 scroller overflow-y-auto rounded-lg shadow-md">
      <button onClick={() => setShowPopup(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
        Add New Product
      </button>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">{editingId ? "Edit Product" : "Add Product"}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <p className="font-bold">Product Name: Tally Prime</p>

              <select className="border p-2 rounded" value={productType} onChange={(e) => setProductType(e.target.value)}>
                <option value="Silver">Silver</option>
                <option value="Gold">Gold</option>
                <option value="Silver Rental">Silver Rental</option>
                <option value="Gold Rental">Gold Rental</option>
              </select>

              <select className="border p-2 rounded" value={userEdition} onChange={(e) => setUserEdition(e.target.value)}>
                <option value="Single user edition">Single User Edition</option>
                <option value="Multi-user edition">Multi-User Edition</option>
              </select>

              {productType.includes("Rental") && (
                <div className="flex gap-4">
                  {[1, 3, 12].map((month) => (
                    <button
                      key={month}
                      type="button"
                      className={`px-4 py-2 rounded ${duration === month ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                      onClick={() => setDuration(month)}
                    >
                      {month} {month > 1 ? "Months" : "Month"}
                    </button>
                  ))}
                </div>
              )}

              <input
                type="number"
                placeholder="Price (₹)"
                className="border p-2 rounded"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />

              <p className="text-gray-700">+18% GST (₹{(parseFloat(price) * 0.18).toFixed(2)})</p>

              <div className="flex justify-between">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                  {editingId ? "Update" : "Save"}
                </button>
                <button onClick={() => setShowPopup(false)} type="button" className="bg-red-500 text-white px-4 py-2 rounded">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className="w-full mt-6 border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Product Name</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Edition</th>
            <th className="border p-2">Duration</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">GST</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="text-center border">
              <td className="border p-2">Tally Prime</td>
              <td className="border p-2">{product.productType}</td>
              <td className="border p-2">{product.userEdition}</td>
              <td className="border p-2">{product.duration || "-"}</td>
              <td className="border p-2">₹{product.price}</td>
              <td className="border p-2">₹{product.gst}</td>
              <td className="border p-2">
                <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2" onClick={() => handleEdit(product)}>Edit</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductCard;
