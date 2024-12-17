import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const CompleteProfile = () => {
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [cv, setCv] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get token from query params
  const token = searchParams.get("token");

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("password", password);
    if (image) formData.append("image", image);
    if (cv) formData.append("cv", cv);

    try {
      const response = await fetch(
        "http://localhost:5000/api/user/complete-profile",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      alert("Profile completed successfully!");
      navigate("/profile"); // Redirect to dashboard
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Complete Your Profile
        </h1>

        {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}

        {/* Password Input */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Password *</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block font-medium mb-1">
            Upload Image (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full"
          />
        </div>

        {/* CV Upload */}
        <div className="mb-6">
          <label className="block font-medium mb-1">Upload CV (Optional)</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setCv(e.target.files[0])}
            className="w-full"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full bg-blue-600 text-white font-semibold py-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Complete Profile"}
        </button>
      </form>
    </div>
  );
};

export default CompleteProfile;
