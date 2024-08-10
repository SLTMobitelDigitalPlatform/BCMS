import React, { useEffect, useState } from "react";
import Activity from "../assets/Activity.png";
import { Link } from "react-router-dom";

const AboutmeView = () => {
  const [aboutme, setAboutme] = useState({});

  // Get aboutme data from database
  useEffect(() => {
    fetch("http://localhost:5000/aboutMe/getAboutMe")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched aboutme data:", data);
        setAboutme(data);
      })
      .catch((error) => console.error("Error fetching aboutme data:", error));
  }, []);

  return (
    <div className="border-2 w-full p-5 rounded-2xl ml-96 mt-20 mr-5">
      <div className="bg-cyan-50 p-3 mt-5 rounded-2xl px-5 border">
      <div className="flex flex-row">
        <div className="flex-1 flex-col mt-5">
          <div>
            {aboutme.image && (
              <div className="flex justify-center mb-4">
                <img
                  src={`http://localhost:5000/${aboutme.image}`}
                  alt="Profile"
                  className=" w-55 shadow-lg shadow-cyan-200 h-60 rounded-xl border-2 border-black"
                />
              </div>
            )}
            <h1 className="mt-5 block text-2xl mb-5 font-bold leading-6 text-[#003E81]">
              About Me
            </h1>
            <p className="text-justify text-lg text-gray-600">
              {aboutme.about}
            </p>
          </div>
        </div>
        <div className="flex-1">
          <Link to="/AboutmeView/AboutmeForm">
            <img src={Activity} className="w-10 h-10 absolute ml-96" />
          </Link>
          <h1 className="text-black text-center mt-5 text-xl font-semibold">
            Hello Everyone, I'm
          </h1>
          <h1 className="text-center mt-3 text-3xl text-[#00BBF6] font-semibold">
            {aboutme.name}
          </h1>
          <h1 className="text-center mt-1 text-xl text-[#4688ec] font-semibold">
            {aboutme.serviceNo}
          </h1>
          <div class="relative overflow-x-auto mt-5 ">
            <table class=" justify-center items-center flex w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                <tr class=" dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Section
                  </th>
                  <td class="px-6 py-4">{aboutme.section}</td>
                </tr>
                <tr class=" dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Country
                  </th>
                  <td class="px-6 py-4">{aboutme.country}</td>
                </tr>
                <tr class=" dark:bg-gray-800">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Address
                  </th>
                  <td class="px-6 py-4">{aboutme.address}</td>
                </tr>
                <tr class=" dark:bg-gray-800">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Official E-mail
                  </th>
                  <td class="px-6 py-4">{aboutme.officialEmail}</td>
                </tr>
                <tr class=" dark:bg-gray-800">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    E-mail
                  </th>
                  <td class="px-6 py-4">{aboutme.email}</td>
                </tr>
                <tr class=" dark:bg-gray-800">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Contact Number
                  </th>
                  <td class="px-6 py-4">{aboutme.contact}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AboutmeView;
