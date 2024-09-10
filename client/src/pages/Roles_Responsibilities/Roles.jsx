import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Roles = () => {
  const [roles, setRoles] = useState([]);
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

    const fetchRoles = async () => {
      try {
        const response = await fetch("http://localhost:5000/getRole");
        const data = await response.json();
        // console.log("Fetched role data:", data);
        setRoles(data);
      } catch (error) {
        console.error("Error fetching role data:", error);
      }
    };

    fetchUserDetails();
    fetchRoles();
  }, []);

  return (
    <div className="flex flex-col gap-x-10 h-full">
      <div className="justify-between flex">
        <h1 className="topic">Roles & Responsibilities</h1>
        {user &&
        (user.role === "Super Admin" ||
          user.role === "Secretariat Coordinator") ? (
          <div className="space-x-4">
            <Link to="/roles/createRoles">
              <button type="button" className="btn-primary">
                Add
              </button>
            </Link>
            <Link to="/roles/editRoles">
              <button type="button" className="btn-secondary">
                Update
              </button>
            </Link>
          </div>
        ) : (
          " "
        )}
      </div>
      {/* <div className="bg-cyan-50 p-3 mt-5 rounded-2xl px-5 border"> */}
      {/* Table */}
      <div className="relative overflow-y-auto rounded-b-2xl mt-5">
        <table className="table-fixed w-full min-w-full bg-cyan-50 border-green-500">
          <thead className="bg-indigo-800 text-white h-12">
            <tr>
              <th className="w-2/5 border border-green-500">Roles</th>
              <th className="w-20 border border-green-500">Responsibilities</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => (
              <tr key={index} className="hover:bg-gray-200">
                <td className="py-3 px-8 border border-green-500 text-blue-900 text-lg">
                  {role.roles}
                </td>
                <td className="py-4 px-8 border border-green-500 text-blue-900 text-base text-justify">
                  <ol className="list-decimal list-inside">
                    {role.responsibilities
                      .split(/(\d+\.\s)/g)
                      .filter(Boolean)
                      .map(
                        (item, idx) =>
                          idx % 2 !== 0 && <li key={idx}>{item.trim()}</li>
                      )}
                  </ol>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* </div> */}
    </div>
    // </div>
    // </div>
  );
};

export default Roles;
