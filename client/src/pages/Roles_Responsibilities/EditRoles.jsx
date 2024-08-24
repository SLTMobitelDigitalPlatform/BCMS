import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const EditRoles = () => {
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/getRole`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched role data:", data);
        setRoles(data);
      })
      .catch((error) => {
        console.error("Error fetching role data:", error);
      });
  }, []);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRoles = [...roles];
    updatedRoles[index][name] = value;
    setRoles(updatedRoles);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:5000/updateRole`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roles),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Roles updated successfully:", data);
        navigate("/roles"); // Redirect to roles page after successful update
      })
      .catch((error) => {
        console.error("Error updating roles:", error);
      });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex gap-x-10">
        <div className="border-2 w-full p-5 rounded-2xl ml-10 mt-1 mr-10">
          <h1 className="mt-5 text-[#52B14A] font-bold text-3xl">
            Edit Roles & Responsibilities
          </h1>
          <div className="bg-cyan-50 p-3 mt-5 rounded-2xl px-5 border">
            <form onSubmit={handleSubmit}>
              {roles.map((role, index) => (
                <div
                  key={role._id}
                  className=" mt-10 p-5 bg-cyan-100 rounded-2xl"
                >
                  <label className="block text-xl font-bold mb-2 text-[#003E81]">
                    Role:
                  </label>
                  <input
                    type="text"
                    name="roles"
                    value={role.roles}
                    onChange={(e) => handleInputChange(index, e)}
                    className="block w-full rounded-md border-0 py-1.5 text-[#003E81] shadow-sm ring-1 ring-inset ring-[#52B14A] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                  />
                  <label className="block text-xl font-bold mb-2 text-[#003E81]">
                    Responsibilities:
                  </label>
                  <textarea
                    name="responsibilities"
                    value={role.responsibilities}
                    rows={8}
                    onChange={(e) => handleInputChange(index, e)}
                    className="block w-full rounded-md py-1.5 text-[#003E81] shadow-sm ring-1 ring-inset ring-[#52B14A] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                  />
                </div>
              ))}
              <div className="justify-center items-center flex">
                <button
                  type="submit"
                  className="mt-6 rounded-md bg-[#52B14A] px-7 py-2 text-m font-semibold text-white shadow-sm hover:bg-[#499c42] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRoles;
