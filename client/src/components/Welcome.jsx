import { useEffect, useState } from "react";
import axios from "axios";
import userAcc from "../assets/Vector.png";

const Welcome = () => {
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
    <div className="flex flex-col items-center bg-gradient-to-r from-blue-900 to-green-500 p-1 rounded-lg m-10 lg:mb-0 lg:mr-16 w-72 lg:w-1/5 lg:h-full">
      <div className="flex flex-col items-center justify-center bg-white p-20 rounded-lg w-full h-full">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-900">Welcome!</h2>
          <div className="flex justify-center m-4">
            <img src={userAcc} alt="user profile" className="w-16 h-16" />
          </div>
          {user ? (
            <>
              <h2 className="font-bold text-blue-900 text-xl">{user.name}</h2>
              <p className="text-blue-900 text-md">{user.email}</p>
              <p className="text-blue-900 text-md">
                {user.role === "superadmin"
                  ? "Super Admin"
                  : user.role === "secretariat coordinator"
                  ? "Secretariat Coordinator"
                  : user.role === "coordinators"
                  ? "Coordinators"
                  : user.role === "persons giving approvals"
                  ? "Persons Giving Approvals"
                  : user.role === "bcmteams"
                  ? "BCM Teams"
                  : "Employee"}
              </p>
              <p className="text-blue-900 text-md capitalize">{user.section}</p>
              <p className="text-blue-900 text-md">
                Service No: {user.serviceNumber}
              </p>
            </>
          ) : (
            <p className="text-blue-900 text-md">Loading user details...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
