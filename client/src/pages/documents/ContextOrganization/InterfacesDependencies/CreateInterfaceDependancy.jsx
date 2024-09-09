import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getUsers } from "../../../../services/userAPI";

const CreateInterfaceDependancy = () => {
  const [processName, setProcessName] = useState("");
  const [externalEntityName, setExternalEntityName] = useState("");
  const [informationExchanged, setInformationExchanged] = useState("");
  const [inwardOutward, setInwardOutWard] = useState("");
  const [medium, setMedium] = useState("");
  const [exchangeMethod, setExchangeMethod] = useState("");
  const [serviceProvidedObtained, setServiceProvidedObtained] = useState("");
  const [externalEntityOptions, setExternalEntityOptions] = useState([]);
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
        navigate("/Context-of-the-Organization/interfaces");
      })
      .catch((error) => {
        handleErrorAlert();
        console.log(error);
      });
  };

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      const externalEntityOptions = response.data.map((item) => item.name);
      // console.log(externalEntityOptions);
      setExternalEntityOptions(externalEntityOptions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
    <div className="w-full rounded-2xl bg-sky-100 p-5 h-full overflow-auto">
      <h1 className="text-2xl font-bold text-green-500">
        Create New Interfaces and Dependencies
      </h1>
      <div className="w-full mt-5 rounded-2xl">
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
                <label htmlFor="externalEntityName" className="font-semibold">
                  External Entity Name
                </label>
                <select
                  id="externalEntityName"
                  value={externalEntityName}
                  onChange={(e) => setExternalEntityName(e.target.value)}
                  className="w-[500px] p-2 rounded-lg bg-slate-100"
                >
                  <option>Select</option>
                  {externalEntityOptions.map((option, index) => (
                    <option value={option} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
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
                <option value="Inward/Outward">Inward/Outward</option>
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
              <Link to="/Context-of-the-Organization/interfaces">
                <button className="p-2 w-32 bg-red-500 text-white rounded-lg font-semibold">
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInterfaceDependancy;
