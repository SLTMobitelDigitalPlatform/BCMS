import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { getInitials } from "../utilities/helper";
import { FaSpinner } from "react-icons/fa";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/currentuser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const fullImageUrl = `http://localhost:5000${response.data.profileImg}`;
        setUser(response.data);
        setPreviewUrl(fullImageUrl); // Set the initial previewUrl
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      alert("Only JPEG and PNG files are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds the 5MB limit.");
      return;
    }
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!selectedFile || !user) return;
    setIsSaving(true);
    const formData = new FormData();
    formData.append("profileImg", selectedFile);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/user/uploadProfileImage/${user._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const fullImageUrl = `http://localhost:5000${response.data.profileImg}`;
      setUser((prevUser) => ({
        ...prevUser,
        profileImg: fullImageUrl,
      }));
      setPreviewUrl(fullImageUrl);
      setEditing(false);
      setSaveSuccess(true);
    } catch (error) {
      console.error(
        "Error uploading profile photo:",
        error.response?.data || error.message
      );
      setSaveSuccess(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
    fileInputRef.current.click(); // Trigger the file input click
  };

  const handleDelete = async () => {
    if (!user || !user._id) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/user/deleteProfileImage/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser((prevUser) => ({
        ...prevUser,
        profileImg: null,
      }));
      setPreviewUrl(null);
      alert("Profile image deleted successfully!");
    } catch (error) {
      console.error(
        "Error deleting profile photo:",
        error.response?.data || error.message
      );
    }
  };

  const handleCancel = () => {
    setPreviewUrl(user?.profileImg || null);
    setSelectedFile(null);
    setEditing(false);
  };

  if (loading) {
    return <div className="text-center text-blue-900 text-md">Loading...</div>;
  }

  return (
    <div className="max-w-2xl  mx-auto p-6 bg-blue-100 shadow-md rounded-lg space-y-6 mt-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-600">User Profile</h1>
      </div>

      <div className="flex flex-col items-center space-y-5">
        <div className="relative w-44 h-44 rounded-full overflow-hidden bg-green-500 shadow-lg">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl font-bold text-white">
              {getInitials(user?.name)}
            </span>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        {!editing ? (
          <div className="flex space-x-3">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={handleEdit}
            >
              Edit Photo
            </button>
            {user?.profileImg && (
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                onClick={handleDelete}
              >
                Delete Photo
              </button>
            )}
          </div>
        ) : (
          <div className="flex space-x-3">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <FaSpinner className="animate-spin inline mr-2" />
              ) : (
                "Save"
              )}
            </button>
            <button
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {user ? (
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner text-center">
          <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.role}</p>
          <p className="text-gray-600 capitalize">{user.section.name}</p>
          <p className="text-gray-600">Service No: {user.serviceNumber}</p>
        </div>
      ) : (
        <p className="text-red-500">No user details found.</p>
      )}
    </div>
  );
};

export default UserProfile;
