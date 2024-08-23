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

    // Validate file type and size before uploading
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (!validTypes.includes(file.type)) {
      alert("Only JPEG and PNG files are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB size limit
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
            // "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Save response:", response.data);

      // Update the user state with the new profile photo URL returned from the server
      setUser((prevUser) => ({
        ...prevUser,
        profileImg: response.data.profileImg,
      }));

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
      <div className="flex flex-col items-center justify-center rounded-lg shadow-md space-y-5 p-5">
        <div className="w-44 h-44 flex items-center justify-center rounded-full overflow-hidden bg-green-500">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : user?.profileImg ? (
            <img
              src={user.profileImg}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            getInitials(user?.name)
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        {/* Input for editing profile picture */}
        {/* {editing && !saveSuccess && (
          <input
            type="file"
            accept="image/*"
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
          />
        )} */}

        {/* Edit Button */}
        {!editing && !saveSuccess && (
          <button
            className="btn-primary px-2 py-1 rounded"
            onClick={handleEdit}
          >
            Edit
          </button>
        )}

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

// <div>
//   <div className="w-full text-center">
//     <h1 className="text-green-500 font-bold text-3xl">Profile</h1>
//   </div>

//   <div className="flex justify-center m-4 relative">
//     <div className="w-32 h-32 flex items-center justify-center rounded-full overflow-hidden">
//       {previewUrl ? (
//         <img
//           src={previewUrl}
//           alt="Profile"
//           className="w-full h-full object-cover"
//         />
//       ) : user?.profileImg ? (
//         <img
//           src={user.profileImg}
//           alt="Profile"
//           className="w-full h-full object-cover"
//         />
//       ) : (
//         getInitials(user?.name)
//       )}
//     </div>

//     {editing && !saveSuccess && (
//       <input
//         type="file"
//         accept="image/*"
//         className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
//         onChange={handleFileChange}
//       />
//     )}

//     {!editing && !saveSuccess && (
//       <button
//         className="absolute bottom-0 right-0 bg-blue-500 text-white px-2 py-1 rounded"
//         onClick={() => setEditing(true)}
//       >
//         Edit
//       </button>
//     )}
//   </div>

//   {editing && !saveSuccess && (
//     <div className="flex justify-center mt-4">
//       <button
//         className="bg-green-500 text-white px-4 py-2 rounded mr-2"
//         onClick={handleSave}
//       >
//         Save
//       </button>
//       <button
//         className="bg-red-500 text-white px-4 py-2 rounded"
//         onClick={handleCancel}
//       >
//         Cancel
//       </button>
//     </div>
//   )}

//   {user ? (
//     <>
//       <h2 className="font-bold text-blue-900 text-xl">{user.name}</h2>
//       <p className="text-blue-900 text-md">{user.email}</p>
//       <p className="text-blue-900 text-md">{user.role}</p>
//       <p className="text-blue-900 text-md capitalize">{user.section}</p>
//       <p className="text-blue-900 text-md">
//         Service No: {user.serviceNumber}
//       </p>
//     </>
//   ) : (
//     <p className="text-blue-900 text-md">No user details found.</p>
//   )}
// </div>
