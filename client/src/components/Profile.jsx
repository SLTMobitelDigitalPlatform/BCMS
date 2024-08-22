import axios from "axios";
import { useEffect, useState } from "react";
import { getInitials } from "../utilities/helper";

const Profile = () => {
  const [user, setUser] = useState(null);

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
      }
    };

    fetchUserDetails();
  }, []);
  return (
    <div>
      <h1 className="text-green-500 font-bold text-3xl">Profile</h1>
      <div className="flex justify-center m-4">
        <div className="w-32 h-32 flex items-center justify-center rounded-full text-blue-900 text-5xl font-medium bg-slate-100">
          {getInitials(user?.name)}
        </div>
      </div>

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
        <p className="text-blue-900 text-md">Loading user details...</p>
      )}
    </div>
  );
};

export default Profile;
