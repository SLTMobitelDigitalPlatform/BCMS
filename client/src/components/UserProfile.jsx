import axios from "axios";
import { useEffect, useState } from "react";
import { getInitials } from "../utilities/helper";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/currentuser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
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
    if (selectedFile) {
      const formData = new FormData();
      formData.append("profilePhoto", selectedFile);

      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:5000/uploadProfilePhoto",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Save response:", response.data);

        // Update the user state with the new profile photo URL returned from the server
        setUser((prevUser) => ({
          prevUser,
          profilePhoto: response.data.profilePhoto,
        }));


        setEditing(false);
        setSaveSuccess(true); 
      } catch (error) {
        console.error("Error uploading profile photo:", error);
        setSaveSuccess(false); 
      }
    }
  };

  const handleCancel = () => {
    
    setPreviewUrl(user?.profilePhoto || null);
    setSelectedFile(null);
    setEditing(false);
  };

  if (loading) {
    return <div className="text-blue-900 text-md">Loading...</div>;
  }

  return (
    <div>
      <div className="w-full text-center">
        <h1 className="text-green-500 font-bold text-3xl">Profile</h1>
      </div>

      <div className="flex justify-center m-4 relative">
        <div className="w-32 h-32 flex items-center justify-center rounded-full overflow-hidden">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : user?.profilePhoto ? (
            <img
              src={user.profilePhoto}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            getInitials(user?.name)
          )}
        </div>

        {editing && !saveSuccess && (
          <input
            type="file"
            accept="image/*"
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
          />
        )}

        {!editing && !saveSuccess && (
          <button
            className="absolute bottom-0 right-0 bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
        )}
      </div>

      {editing && !saveSuccess && (
        <div className="flex justify-center mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      )}

      {user ? (
        <>
          <h2 className="font-bold text-blue-900 text-xl">{user.name}</h2>
          <p className="text-blue-900 text-md">{user.email}</p>
          <p className="text-blue-900 text-md">{user.role}</p>
          <p className="text-blue-900 text-md capitalize">{user.section}</p>
          <p className="text-blue-900 text-md">
            Service No: {user.serviceNumber}
          </p>
        </>
      ) : (
        <p className="text-blue-900 text-md">No user details found.</p>
      )}
    </div>
  );
};

export default UserProfile;
