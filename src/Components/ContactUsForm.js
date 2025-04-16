import { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import SocialButtons from "./SocialButtons";

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        contactNumber: "",
        email: "",
        address: "",
        businessName: "",
        gstin: "",
        query: "",
        description: "",
    });

    const [showPopup, setShowPopup] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            const response = await fetch("https://gullibackend.onrender.com/api/submit-form", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setShowPopup(true);
                setFormData({
                    name: "",
                    contactNumber: "",
                    email: "",
                    address: "",
                    businessName: "",
                    gstin: "",
                    query: "",
                    description: "",
                });
            } else {
                alert(data.error);
            }
        } catch (error) {
            alert("Error submitting form: " + error.message);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid lg:grid-cols-2 gap-10 bg-white shadow-2xl rounded-2xl overflow-hidden">
                {/* Contact Info Panel */}
                <div className="bg-indigo-900 text-white p-8 space-y-6 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold">Get in Touch</h2>
                    <p className="text-blue-100">We’d love to hear from you! Drop us a message and we’ll get back shortly.</p>

                    <div className="flex items-center gap-4">
                        <FaEnvelope className="text-xl" />
                        <span>gullitech.rewa@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <FaPhoneAlt className="text-xl" />
                        <span>+91-9755377307</span>
                    </div>
                    <div className="flex items-start gap-4">
                        <FaMapMarkerAlt className="text-xl mt-1" />
                        <span>
                            MPS Complex, Near Subhash Chowk Boda Bag Road, Civil Lines, Rewa (M.P.) - 486001
                        </span>
                    </div>

                    <div className="pt-4">
                        <SocialButtons />
                    </div>
                </div>

                {/* Contact Form Panel */}
                <form onSubmit={handleSubmit} className="p-8 space-y-5 bg-gray-50">
                    <h3 className="text-2xl font-semibold text-gray-800">Contact Us</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                        <Input name="name" label="Name" value={formData.name} onChange={handleChange} required placeholder="Enter your name" />
                        <Input name="contactNumber" label="Contact Number" type="number" value={formData.contactNumber} onChange={handleChange} required placeholder="Enter your phone number" />
                        <Input name="email" label="Email" type="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email" />
                        <Input name="address" label="Address" value={formData.address} onChange={handleChange} required placeholder="Enter your address" />
                        <Input name="businessName" label="Business Name" value={formData.businessName} onChange={handleChange} required placeholder="Enter your business name" />
                        <Input name="gstin" label="GSTIN (if any)" value={formData.gstin} onChange={handleChange} placeholder="Enter GSTIN if applicable" />

                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Query Type</label>
                        <select
                            name="query"
                            value={formData.query}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="">-- Select an Option --</option>
                            <option value="Tally Prime Silver">Tally Prime Silver</option>
                            <option value="Tally Prime Gold">Tally Prime Gold</option>
                            <option value="Tally Software Service - Silver">Tally Software Service - Silver</option>
                            <option value="Tally Software Service - Gold">Tally Software Service - Gold</option>
                            <option value="Tally Prime Support">Tally Prime Support</option>
                            <option value="Tally Prime On Cloud">Tally Prime On Cloud</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Describe Your Query</label>
                        <textarea
                            name="description"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            placeholder="Write a brief description of your query"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 px-6 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                                }`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8z"
                                        ></path>
                                    </svg>
                                    Submitting...
                                </div>
                            ) : (
                                "Submit Enquiry"
                            )}
                        </button>

                    </div>
                </form>
            </div>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
                    <div className="bg-white p-6 rounded-xl shadow-2xl text-center max-w-sm w-full animate-bounce-in">
                        <h3 className="text-2xl font-bold text-green-600">Submitted Successfully!</h3>
                        <p className="mt-2 text-gray-700">We'll contact you very soon.</p>
                        <button
                            onClick={() => setShowPopup(false)}
                            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Reusable Input Component
const Input = ({ name, label, type = "text", value, onChange, required, placeholder }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
    </div>
);


export default ContactUsForm;
