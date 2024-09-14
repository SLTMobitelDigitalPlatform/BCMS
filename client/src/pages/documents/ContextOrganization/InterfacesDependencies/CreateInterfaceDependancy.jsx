import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import { useUsers } from "../../../../hooks/useUsers";

const CreateInterfaceDependancy = () => {
  const [formData, setFormData] = useState({
    processName: "",
    externalEntityName: "",
    informationExchanged: "",
    inwardOutward: "",
    medium: "",
    exchangeMethod: "",
    serviceProvidedObtained: "",
  });

  // const [processName, setProcessName] = useState("");
  // const [externalEntityName, setExternalEntityName] = useState("");
  // const [informationExchanged, setInformationExchanged] = useState("");
  // const [inwardOutward, setInwardOutWard] = useState("");
  // const [medium, setMedium] = useState("");
  // const [exchangeMethod, setExchangeMethod] = useState("");
  // const [serviceProvidedObtained, setServiceProvidedObtained] = useState("");
  // const [externalEntityOptions, setExternalEntityOptions] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // const data = {
    //   processName,
    //   externalEntityName,
    //   informationExchanged,
    //   inwardOutward,
    //   medium,
    //   exchangeMethod,
    //   serviceProvidedObtained,
    // };

    axios
      .post("http://localhost:5000/interfaceDependancy/create", formData)
      .then(() => {
        handleSuccessAlert();
        navigate("/Context-of-the-Organization/interfaces-and-dependencies");
      })
      .catch((error) => {
        handleErrorAlert();
        console.log(error);
      });
  };

  // const fetchUsers = async () => {
  //   try {
  //     const response = await getUsers();
  //     const externalEntityOptions = response.data.map((item) => item.name);
  //     // console.log(externalEntityOptions);
  //     setExternalEntityOptions(externalEntityOptions);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const { sortedUsers, loading, error, fetchUsers } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (selectedOption, name) => {
    setFormData({
      ...formData,
      [name]: selectedOption ? selectedOption.value : "",
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-2xl font-bold text-green-500">
        Create New Interfaces and Dependencies
      </h1>
      <div className="bg-indigo-200 h-full mt-5 rounded-2xl p-8 overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="processName" className="font-semibold">
                Process Name
              </label>
              <input
                type="text"
                id="processName"
                name="processName"
                placeholder="Process Name"
                value={formData.processName}
                onChange={handleChange}
                className="p-2 w-full rounded"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="font-semibold">External Entity Name</label>
              <Select
                options={sortedUsers}
                name="externalEntityName"
                value={sortedUsers.find(
                  (user) => user.value === formData.externalEntityName
                )}
                onChange={(option) =>
                  handleSelectChange(option, "externalEntityName")
                }
                isClearable={true}
                placeholder="Select External Entity Name"
              />
            </div>
          </div>
          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="informationExchanged" className="font-semibold">
                Information Exchanged
              </label>
              <input
                type="text"
                id="informationExchanged"
                name="informationExchanged"
                placeholder="Information Exchanged"
                value={formData.informationExchanged}
                onChange={handleChange}
                className="p-2 rounded"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="inwardOutward" className="font-semibold">
                Inward/Outward
              </label>
              <select
                id="inwardOutward"
                name="inwardOutward"
                value={formData.inwardOutward}
                onChange={handleChange}
                className="p-2 rounded"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="Inward">Inward</option>
                <option value="Outward">Outward</option>
                <option value="Inward/Outward">Inward/Outward</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="medium" className="font-semibold">
                Medium
              </label>
              <input
                type="text"
                id="medium"
                name="medium"
                placeholder="Medium"
                value={formData.medium}
                onChange={handleChange}
                className="p-2 rounded"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="exchangeMethod" className="font-semibold">
                Exchange Method
              </label>
              <input
                type="text"
                id="exchangeMethod"
                name="exchangeMethod"
                placeholder="Exchange Method"
                value={formData.exchangeMethod}
                onChange={handleChange}
                className="p-2 rounded"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-1/2 pr-4">
            <label htmlFor="serviceProvidedObtained" className="font-semibold">
              Service provided/obtained
            </label>
            <select
              id="serviceProvidedObtained"
              name="serviceProvidedObtained"
              value={formData.serviceProvidedObtained}
              onChange={handleChange}
              className="p-2 rounded"
            >
              <option value="">Select</option>
              <option value="Provided">Provided</option>
              <option value="Obtained">Obtained</option>
            </select>
          </div>

          <div className="flex justify-start gap-2">
            <button
              type="submit"
              className="p-2 w-32 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold"
            >
              Save
            </button>
            <Link
              to="/Context-of-the-Organization/interfaces-and-dependencies"
              className="p-2 w-32 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInterfaceDependancy;
