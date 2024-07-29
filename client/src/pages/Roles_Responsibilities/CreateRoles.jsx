import React, { useState } from "react";

const CreateRoles = () => {
    const [roles, setRoles] = useState("");
    const [responsibilities, setResponsibilities] = useState("");


    //Store form data in database
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:5000/roles/createRole", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                roles: roles,
                responsibilities: responsibilities,
            }),
        })
       .then((response) => response.json())
       .then((data) => {
            alert("Data sent successfully:", data);
        })
       .catch((error) => console.error("Error sending data:", error));
    };

  return (
    <div className=" border-2 w-full p-5 rounded-2xl ml-96 mt-20 mr-5">
      <h1 className="mt-5 text-[#52B14A] font-bold text-3xl">
        Roles & Responsibilities
      </h1>
      <div className="bg-cyan-50 p-3 mt-5 rounded-2xl px-5 border">
        <h1 className=" text-center font-bold text-3xl text-[#003E81] mt-5">
          Add New Roles & Responsibilities
        </h1>
        <div className="relative overflow-x-auto mt-10 px-10">
          <table className="w-full text-left rtl:text-right text-[#003E81] dark:text-gray-400">
            <tbody>
              <tr className="">
                <td scope="row" className=" text-center py-4 text-xl font-semibold">
                  Roles
                </td>
                <td className="px-0 py-4">
                  <input
                    type="text"
                    name="Roles"
                    id="Roles"
                    required
                    autoComplete="Roles"
                    className="block w-full rounded-md border-0 py-1.5 text-[#003E81] shadow-sm ring-1 ring-inset ring-[#52B14A] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setRoles(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td scope="row" className=" text-center py-4 text-xl font-semibold">
                  Responsibilities
                </td>
                <td className="px-0 py-4">
                  <textarea
                    type="text"
                    name="Responsibilities"
                    id="Responsibilities"
                    placeholder="1. "
                    
                    required
                    rows={6}
                    className="block w-full rounded-md border-0 py-1.5 text-[#003E81] shadow-sm ring-1 ring-inset ring-[#52B14A] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setResponsibilities(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="border-gray-900/10 mt-5 mb-5 flex items-center justify-center gap-x-6">
              <button
                onClick={handleSubmit}
                type="submit"
                className="mt-6 rounded-md bg-[#52B14A] px-7 py-2 text-m font-semibold text-white shadow-sm hover:bg-[#499c42] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              >
                Submit
              </button>
            </div>
      </div>
    </div>
  );
};

export default CreateRoles;
