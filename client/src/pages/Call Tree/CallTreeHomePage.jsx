import { Link } from "react-router-dom";
import { FaBuilding, FaBuildingUser, FaPeopleGroup } from "react-icons/fa6";

const CallTreeHomePage = () => {
  return (
    <div className="px-5">
      <h1 className="topic mb-5">Organizational Communication </h1>
      <h2 className="text-xl font-semibold text-indigo-800 mb-3">
        Instructions:
      </h2>
      <p className="mb-2 font-semibold text-lg">Call Tree Procedures</p>

      <ol className="list-decimal list-inside space-y-2 font-medium text-sm">
        <li> Initiator of Call Tree is in Group B (BU BCM Coordinator).</li>
        <li>To use this Call Tree Table:</li>

        <ol
          type="a"
          className="list-[lower-roman] list-inside pl-5 space-y-1 text-sm"
        >
          <li>Look for your name in the “Name” column</li>
          <li>Identify your “To Call” group number in the “To Call” column</li>
          <li>
            If you see a “-“ in the “To Call” column, you do not need to contact
            anybody
          </li>
          <li>
            Once you have found the group number, look for that number in the
            “Group” column and start calling everybody in that group
          </li>
        </ol>

        <li>
          If a call to any member in the group is unsuccessful (i.e. message not
          passed directly) after 3 tries in 15 minutes, the caller must take
          over that member’s responsibility to continue his or her call tree
        </li>
        <li>
          Callers should report the list of un-contactable members to BCM
          Manager for follow-up
        </li>
      </ol>
      <div className="flex justify-center gap-20 mt-10 text-white">
        <Link
          to="/call-tree"
          className="flex flex-col justify-center items-center bg-indigo-800 hover:bg-indigo-900 border-2 border-indigo-800 rounded-xl w-60 h-60 space-y-5"
        >
          <FaPeopleGroup className="w-20 h-20" />
          <h1 className="text-lg font-semibold ">Sectional Call Tree</h1>
        </Link>
        <Link
          to="/org-call-tree"
          className="flex flex-col justify-center items-center bg-indigo-800 hover:bg-indigo-900 border-2 border-indigo-800 rounded-xl w-60 h-60 space-y-5 "
        >
          <FaBuildingUser className="w-20 h-20" />
          <h1 className="text-lg font-semibold ">Organizational Call Tree</h1>
        </Link>
      </div>
    </div>
  );
};

export default CallTreeHomePage;
