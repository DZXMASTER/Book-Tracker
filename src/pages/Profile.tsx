import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { updatePassword, updateProfile, signOut, deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [name, setName] = useState(user?.displayName || "");
  const [email] = useState(user?.email || "");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleUpdateProfile = async () => {
    if (!user) return;
    setError("");
    setSuccess("");

    try {
      await updateProfile(user, { displayName: name });
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    }
  };

  const handleChangePassword = async () => {
    if (!user) return;
    setError("");
    setSuccess("");

    try {
      await updatePassword(user, newPassword);
      setSuccess("Password changed successfully!");
    } catch (err) {
      setError("Failed to change password. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    setError("");

    try {
      await deleteUser(user);
      navigate("/register");
    } catch (err) {
      setError("Failed to delete account. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <div className="flex flex-col items-center justify-center max-w-lg mx-auto">
        <div className="mb-6 w-full">
          <label htmlFor="name" className="block mb-2 font-medium">Name</label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-6 w-full">
          <label htmlFor="email" className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded"
            value={email}
            disabled
          />
        </div>
        <button
          onClick={handleUpdateProfile}
          className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 mb-4"
        >
          Update Profile
        </button>

        <div className="mb-6 w-full">
          <label htmlFor="newPassword" className="block mb-2 font-medium">New Password</label>
          <input
            type="password"
            id="newPassword"
            className="w-full p-2 border rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleChangePassword}
          className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 mb-4"
        >
          Change Password
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded w-full hover:bg-red-600 mb-4"
        >
          Logout
        </button>

        <button
          onClick={handleDeleteAccount}
          className="bg-gray-500 text-white py-2 px-4 rounded w-full hover:bg-gray-600"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
