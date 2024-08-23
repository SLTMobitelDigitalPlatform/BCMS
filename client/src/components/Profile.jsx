import axios from "axios";
import { useEffect, useState } from "react";
// import { getInitials } from "../utilities/helper";
import UserProfile from "./UserProfile";
import EventCard from "./EventCard";

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
    <div className="h-full flex flex-col md:flex-row">
      <div className="w-full md:w-3/4">
        <UserProfile />
      </div>
      <div className="w-full md:w-1/4">
        <EventCard />
      </div>
    </div>
  );
};

export default Profile;
