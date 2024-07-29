import React, { useState } from "react";
import profile from "../assets/profile.png";

const AboutmeForm = () => {
  const [name, setName] = useState("");
  const [serviceNo, setServiceNo] = useState("");
  const [about, setAbout] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState(null);
  const [section, setSection] = useState("");
  const [officialEmail, setOfficialEmail] = useState("");

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("serviceNo", serviceNo);
    formData.append("about", about);
    formData.append("country", country);
    formData.append("address", address);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("image", image);
    formData.append("section", section);
    formData.append("officialEmail", officialEmail);

    fetch("http://localhost:5000/aboutMe/createAboutMe", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          alert("Data submitted successfully");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="border-2 w-full p-5 rounded-2xl ml-96 mt-20 mr-5">
      <div className="flex flex-row">
        <div className=" flex-1 flex-col">
          <div className="mr-20 mt-5">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center h-60 w-60 border-2 border-[#52B14A] border-dashed rounded-lg cursor-pointer bg-gray-200 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-300 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <img src={profile} alt="profile" className="w-20 " />
                <p className="mb-2 text-base text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> <br />or drag and
                  drop
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
            </label>
          </div>
          <div>
            <label
              htmlFor="AboutMe"
              className="mt-5 block text-xl mb-5 font-bold leading-6 text-[#003E81]"
            >
              About Me
            </label>
            <div className="mt-2">
              <textarea
                type="text"
                name="AboutMe"
                id="AboutMe"
                required
                rows={9}
                className="block w-full rounded-md border-0 py-1.5 text-[#003E81] shadow-sm ring-1 ring-inset ring-[#52B14A] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-black text-center mt-5 text-xl font-semibold">
            Hello Everyone, I'm
          </h1>
          <div className="mt-5">
            <div className="px-10">
              <input
                type="text"
                name="name"
                id="name"
                required
                placeholder="Name"
                className="block w-full rounded-md border-0 py-1.5 text-[#003E81] shadow-sm ring-1 ring-inset ring-[#52B14A] placeholder:text-gray-400 placeholder:text-center focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="px-10 mt-5">
              <input
                type="text"
                name="ServiceNo"
                id="ServiceNo"
                required
                placeholder="Service Number"
                className="block w-full rounded-md border-0 py-1.5 text-[#003E81] shadow-sm ring-1 ring-inset ring-[#52B14A] placeholder:text-gray-400 placeholder:text-center focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                onChange={(e) => setServiceNo(e.target.value)}
              />
            </div>
            <div className="flex mt-5 justify-between px-20 items-center">
              <label
                htmlFor="Section"
                className="text-lg ml-5 font-medium leading-6 text-[#003E81]"
              >
                Section
              </label>
              <div className="">
                <input
                  type="text"
                  name="Section"
                  id="Section"
                  required
                  className="block w-full rounded-md border-0 py-1 mx-12 text-[#003E81] shadow-sm ring-1 ring-inset ring-[#52B14A] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setSection(e.target.value)}
                />
              </div>
            </div>
            <div className="flex mt-5 justify-between px-20 items-center">
              <label
                htmlFor="Country"
                className="text-lg ml-5 font-medium leading-6 text-[#003E81]"
              >
                Country
              </label>
              <div className="">
                <input
                  type="text"
                  name="Country"
                  id="Country"
                  required
                  className="block w-full rounded-md border-0 py-1 mx-12 text-[#003E81] shadow-sm ring-1 ring-inset ring-[#52B14A] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>
            <div className="flex mt-5 justify-between px-20 items-center">
              <label
                htmlFor="Address"
                className="text-lg ml-5 font-medium leading-6 text-[#003E81]"
              >
                Address
              </label>
              <div className="">
                <input
                  type="text"
                  name="Address"
                  id="Address"
                  required
                  className="block w-full rounded-md border-0 py-1 mx-12 text-[#003E81] shadow-sm ring-1 ring-inset ring-[#52B14A] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="flex mt-5 justify-between px-20 items-center">
              <label
                htmlFor="OfficialEmail"
                className="text-lg ml-5 font-medium leading-6 text-[#003E81]"
              >
                Official <br />E-mail
              </label>
              <div className="">
                <input
                  type="text"
                  name="OfficialEmail"
                  id="OfficialEmail"
                  required
                  className="block w-full rounded-md border-0 py-1 mx-12 text-[#003E81] shadow-sm ring-1 ring-inset ring-[#52B14A] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setOfficialEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="flex mt-5 justify-between px-20 items-center">
              <label
                htmlFor="Email"
                className="text-lg ml-5 font-medium leading-6 text-[#003E81]"
              >
                E-mail
              </label>
              <div className="">
                <input
                  type="text"
                  name="Email"
                  id="Email"
                  required
                  className="block w-full rounded-md border-0 py-1 mx-12 text-[#003E81] shadow-sm ring-1 ring-inset ring-[#52B14A] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="flex mt-5 justify-between px-20 items-center">
              <label
                htmlFor="ContactNo"
                className="text-lg ml-5 font-medium leading-6 text-[#003E81]"
              >
                Contact <br /> Number
              </label>
              <div className="">
                <input
                  type="text"
                  name="ContactNo"
                  id="ContactNo"
                  required
                  className="block w-full rounded-md border-0 py-1 mx-12 text-[#003E81] shadow-sm ring-1 ring-inset ring-[#52B14A] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="border-gray-900/10 mt-4 flex items-center justify-center gap-x-6">
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
      </div>
    </div>
  );
};

export default AboutmeForm;
