import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContextNavigation from "../../../../components/ContextNavigation";

const Objectives = () => {
  const [objectives, setObjectives] = useState([]);

  const fetchObjectives = async () => {
    try {
      const response = await axios.get("http://localhost:5000/objectives");
      setObjectives(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchObjectives();
  }, []);

  return (
    <div className="w-full h-full p-5 flex flex-col bg-sky-100 rounded-2xl">
      <h1 className="text-3xl mb-5  font-bold text-green-500">
        Context Of The Organization
      </h1>
      <ContextNavigation />
      {/* <div className="bg-sky-50 p-5 mt-8 rounded-xl"> */}
      <div className="flex justify-between items-center mt-10">
        <h1 className="text-2xl font-bold text-blue-900">Objectives</h1>
        <Link to="/createObjective">
          <button className="px-3 py-1 bg-[#52B14A] text-white font-semibold rounded-lg">
            Add Details
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="mt-10 h-full overflow-auto">
        <table className="w-full border-2">
          <thead>
            <tr className="border-2">
              <th className="border-2">Information Security</th>
              <th className="border-2">Business Continuity</th>
              <th className="border-2">Quality</th>
              <th className="border-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {objectives.map((objective) => (
              <tr key={objective._id}>
                <td className="border-2 p-3">
                  {objective.informationSecurity}
                </td>
                <td className="border-2 p-3">{objective.businessContinuity}</td>
                <td className="border-2 p-3">{objective.quality}</td>
                <td className="border-2 p-3 flex justify-center">
                  <div className="flex gap-3 items-center">
                    <Link to={`/editObjective/${objective._id}`}>
                      <button className="p-1 w-20 bg-sky-600 text-white rounded-lg font-semibold">
                        Edit
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    // </div>
  );
};

export default Objectives;
