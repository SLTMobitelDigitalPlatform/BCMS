import { Link } from "react-router-dom";
import calendar from "../assets/calendar.png";
import docu from "../assets/docu.png";
import group from "../assets/group.png";
import intranet from "../assets/intranet.png";
import org from "../assets/org.png";
import policy from "../assets/policy.png";
import userRole from "../assets/user.png";
import Card from "./Card";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full lg:w-auto">
      {user ? (
        <Link to="/roles">
          <Card title="View User roles & Responsibilities" icon={userRole} />
        </Link>
      ) : (
        " "
      )}
      {user &&
      (user.role === "Super Admin" ||
        user.role === "Secretariat Coordinator") ? (
        <Link to="/riskAssesements">
          <Card title="View Documents" icon={docu} />
        </Link>
      ) : (
        " "
      )}

      {user &&
      (user.role === "Super Admin" ||
        user.role === "Secretariat Coordinator") ? (
        <Link to="/calendar">
          <Card title="Calendar" icon={calendar} />
        </Link>
      ) : (
        " "
      )}

      {user &&
      (user.role === "Super Admin" ||
        user.role === "Secretariat Coordinator") ? (
        <Link to="/intranet">
          <Card title="Intranet" icon={intranet} />
        </Link>
      ) : (
        " "
      )}

      {user &&
      (user.role === "Super Admin" ||
        user.role === "Secretariat Coordinator") ? (
        <Link to="/policy">
          {" "}
          <Card title="Organization Guidelines & Policies" icon={policy} />
        </Link>
      ) : (
        " "
      )}

      {user &&
      (user.role === "Super Admin" ||
        user.role === "Secretariat Coordinator") ? (
        <Link to="/org">
          {" "}
          <Card title="Organization Communication Hierarchy" icon={org} />
        </Link>
      ) : (
        " "
      )}

      {user &&
      (user.role === "Super Admin" ||
        user.role === "Secretariat Coordinator") ? (
        <Link to="/meeting">
          <Card title="Meetings" icon={group} />
        </Link>
      ) : (
        " "
      )}
    </div>
  );
};

export default AdminDashboard;
