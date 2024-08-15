import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
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
    <div className="container mx-auto py-8">
      <div className="flex gap-x-10">
        {/* Sidebar */}
        <Sidebar />
        <div className="border-2 w-full p-5 rounded-2xl ml-10 mt-1 mr-10">
          <div className="justify-between flex">
            <h1 className="mt-5 text-[#52B14A] font-bold text-3xl">
              Roles & Responsibilities
            </h1>
            {user &&
            (user.role === "superadmin" ||
              user.role === "secretariat coordinator") ? (
              <div>
                <Link to="/roles/createRoles">
                  <button
                    type="button"
                    className="text-white bg-[#003E81] focus:outline-none focus:ring-2 focus:ring-black font-medium rounded-lg text-sm px-6 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    Add
                  </button>
                </Link>
                <Link to="/roles/editRoles">
                  <button
                    type="button"
                    className="text-white bg-red-700 focus:outline-none focus:ring-2 focus:ring-black font-medium rounded-lg text-sm px-6 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    Update
                  </button>
                </Link>
              </div>
            ) : (
              " "
            )}
          </div>
          <div className="bg-cyan-50 p-3 mt-5 rounded-2xl px-5 border">
            <div className="relative overflow-x-auto">
              <table className="w-full text-lg rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xl text-[#003E81] uppercase dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 border-r border-gray-600"
                    >
                      Roles
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Responsibilities
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role, index) => (
                    <tr
                      key={index}
                      className="dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4 text-gray-600 font-semibold border-r border-gray-600">
                        {role.roles}
                      </td>
                      <td className="px-6 py-4 text-justify">
                        <ol className="list-decimal list-inside">
                          {role.responsibilities
                            .split(/(\d+\.\s)/g)
                            .filter(Boolean)
                            .map(
                              (item, idx) =>
                                idx % 2 !== 0 && (
                                  <li key={idx}>{item.trim()}</li>
                                )
                            )}
                        </ol>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roles;
