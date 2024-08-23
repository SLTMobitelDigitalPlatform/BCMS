import Title from "../../../../components/Title";
import ContextNavigation from "../../../../components/ContextNavigation";
import Sidebar from "../../../../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    <div className="container mx-auto py-8">
      <div className="flex gap-x-10">
        <Sidebar />
        <div>
          <div className=" border-2 w-[76vw] h-[575px] rounded-2xl ml-2 mr-50 mt-1 p-5">
            <Title />
            <div className="bg-sky-50 p-5 mt-8 rounded-xl">
              <ContextNavigation />
              <div className="flex justify-between items-center mt-8">
                <h1 className="text-2xl font-bold text-blue-900">Objectives</h1>
                <Link to="/createObjective">
                  <button className="px-3 py-1 bg-[#52B14A] text-white font-semibold rounded-lg">
                    Add Details
                  </button>
                </Link>
              </div>
              <div className="mt-8">
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
                        <td className="border-2 p-3">
                          {objective.businessContinuity}
                        </td>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Objectives;
