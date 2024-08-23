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

      // Construct the full URL for the profile image
      const fullImageUrl = `http://localhost:5000${response.data.profileImg}`;

      // Update the user state with the new profile photo URL returned from the server
      setUser((prevUser) => ({
        ...prevUser,
        profileImg: fullImageUrl,
      }));

      // Update the preview URL with the new profile image URL
      setPreviewUrl(fullImageUrl);
      console.log("Full profile image URL:", fullImageUrl);
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

      // Clear the profile image state
      setUser((prevUser) => ({
        ...prevUser,
        profileImg: null,
      }));

      // Clear the preview URL
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
    return <div className="text-blue-900 text-md">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-full p-4 bg-sky-100 rounded-2xl md:mr-2">
      {/* Profile Heading */}
      <div className="w-full text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-500">
          Profile
        </h1>
      </div>

      {/* Profile Picture and Edit Button */}
      <div className="flex flex-col items-center justify-center space-y-5 p-5">
        <div className="w-44 h-44 flex items-center justify-center rounded-full overflow-hidden bg-green-500">
          {previewUrl ? (
            <img
              src={previewUrl} // Directly use the base64 data URL
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl font-bold text-white">
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

        {/* Edit Button */}
        {!editing && (
          <div className="flex space-x-2">
            <button
              className="btn-primary px-2 py-1 rounded"
              onClick={handleEdit}
            >
              Edit
            </button>
            {user?.profileImg && (
              <button
                className="btn-primary px-2 py-1 rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
          </div>
        )}
        {/* <p>{user.profileImg}</p> */}

        {/* Save and Cancel Buttons */}
        {editing && !saveSuccess && (
          <div className="flex justify-center mt-4 space-x-2">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving && (
                <FaSpinner className="animate-spin inline text-xl mr-2" />
              )}
              {isSaving ? "Saving..." : "Save"}
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* User Details */}
      {user ? (
        <div className="mt-6 gap-x-6 gap-y-4">
          {/* Left column */}
          <div>
            <h2 className="font-bold text-xl text-blue-900">{user.name}</h2>
            <p className="text-md text-blue-900">{user.email}</p>
          </div>
          {/* Right column */}
          <div>
            <p className="text-md text-blue-900">{user.role}</p>
            <p className="text-md text-blue-900 capitalize">{user.section}</p>
            <p className="text-md text-blue-900">
              Service No: {user.serviceNumber}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-blue-900 text-md mt-6">No user details found.</p>
      )}
    </div>
  );
};

export default UserProfile;
