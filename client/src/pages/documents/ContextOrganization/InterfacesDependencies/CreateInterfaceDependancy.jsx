import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../../../../components/Sidebar";

import React from "react";

const CreateInterfaceDependancy = () => {
  const [processName, setProcessName] = useState("");
  const [externalEntityName, setExternalEntityName] = useState("");
  const [informationExchanged, setInformationExchanged] = useState("");
  const [inwardOutward, setInwardOutWard] = useState("");
  const [medium, setMedium] = useState("");
  const [exchangeMethod, setExchangeMethod] = useState("");
  const [serviceProvidedObtained, setServiceProvidedObtained] = useState("");
  const navigate = useNavigate();

  const handleCreateInterfaceDependancy = (e) => {
    e.preventDefault();

    const data = {
      processName,
      externalEntityName,
      informationExchanged,
      inwardOutward,
      medium,
      exchangeMethod,
      serviceProvidedObtained,
    };

    axios
      .post("http://localhost:5000/interfaceDependancy/create", data)
      .then(() => {
        handleSuccessAlert();
        navigate("/interfaces");
      })
      .catch((error) => {
        handleErrorAlert();
        console.log(error);
      });
  };

  const handleSuccessAlert = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Record Added Successfully",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const handleErrorAlert = () => {
    Swal.fire({
      title: "Something Went Wrong",
      text: "Fix it and try again",
      icon: "error",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex gap-x-10">
        <Sidebar />
        <div className="border-2 w-full rounded-2xl ml-5 mr-[20px] mt-1 mb-5 p-5">
          <h1 className="text-2xl font-bold">
            Create New Interfaces and Dependencies
          </h1>
          <div className="w-full mx-auto p-8 rounded-xl shadow-lg border-2 mt-5">
            <form onSubmit={handleCreateInterfaceDependancy}>
              <div className="flex flex-col gap-6">
                <div className="flex justify-between">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="" className="font-semibold">
                      Process Name
                    </label>
                    <textarea
                      type="text"
                      placeholder="Process Name"
                      value={processName}
                      onChange={(e) => setProcessName(e.target.value)}
                      className="w-[500px] p-2 rounded-lg bg-slate-100"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="" className="font-semibold">
                      External Entity Name
                    </label>
                    <textarea
                      type="text"
                      placeholder="External Entity Name"
                      value={externalEntityName}
                      onChange={(e) => setExternalEntityName(e.target.value)}
                      className="w-[500px] p-2 rounded-lg bg-slate-100"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="font-semibold">
                    Information Exchanged
                  </label>
                  <textarea
                    type="text"
                    placeholder="Information Exchanged"
                    value={informationExchanged}
                    onChange={(e) => setInformationExchanged(e.target.value)}
                    className="w-[500px] p-2 rounded-lg bg-slate-100"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="inwardOutward" className="font-semibold">
                    Inworld/Outworld
                  </label>
                  <select
                    id="inwardOutward"
                    value={inwardOutward}
                    onChange={(e) => setInwardOutWard(e.target.value)}
                    className="w-[500px] p-2 rounded-lg bg-slate-100"
                  >
                    <option value="">Select</option>
                    <option value="Inward">Inward</option>
                    <option value="Outward">Outward</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="font-semibold">
                    Medium
                  </label>
                  <textarea
                    type="text"
                    placeholder="Medium"
                    value={medium}
                    onChange={(e) => setMedium(e.target.value)}
                    className="w-[500px] p-2 rounded-lg bg-slate-100"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="font-semibold">
                    Exchange Method
                  </label>
                  <textarea
                    type="text"
                    placeholder="Exchange Method"
                    value={exchangeMethod}
                    onChange={(e) => setExchangeMethod(e.target.value)}
                    className="w-[500px] p-2 rounded-lg bg-slate-100"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="serviceProvidedObtained"
                    className="font-semibold"
                  >
                    Service provided/obtained
                  </label>
                  <select
                    id="serviceProvidedObtained"
                    value={serviceProvidedObtained}
                    onChange={(e) => setServiceProvidedObtained(e.target.value)}
                    className="w-[500px] p-2 rounded-lg bg-slate-100"
                  >
                    <option value="">Select</option>
                    <option value="Provided">Provided</option>
                    <option value="Obtained">Obtained</option>
                  </select>
                </div>

                <div className="flex justify-start gap-2 mt-5">
                  <button
                    type="submit"
                    className="p-2 w-32 bg-sky-600 text-white rounded-lg font-semibold"
                  >
                    Save
                  </button>
                  <Link to="/interfaces">
                    <button className="p-2 w-32 bg-red-500 text-white rounded-lg font-semibold">
                      Cancel
                    </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInterfaceDependancy;
