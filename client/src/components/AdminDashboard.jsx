import { Link } from "react-router-dom";
import calendar from "../assets/calendar.png";
import docu from "../assets/docu.png";
import group from "../assets/group.png";
import intranet from "../assets/intranet.png";
import org from "../assets/org.png";
import policy from "../assets/policy.png";
import userRole from "../assets/user.png";
import Card from "./Card";

const AdminDashboard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full lg:w-auto">
      <Link to="/employee">
        <Card title="View User roles & Responsibilities" icon={userRole} />
      </Link>
      <Link to="/riskAssesements">
        {" "}
        <Card title="View Documents" icon={docu} />
      </Link>
      <Link to="/calendar">
        {" "}
        <Card title="Calendar" icon={calendar} />
      </Link>

      <Link to="/intranet">
        {" "}
        <Card title="Intranet" icon={intranet} />
      </Link>
      <Link to="/policy">
        {" "}
        <Card title="Organization Guidelines & Policies" icon={policy} />
      </Link>
      <Link to="/org">
        {" "}
        <Card title="Organization Communication Hierarchy" icon={org} />
      </Link>

      <Link to="/meeting">
        <Card title="Meetings" icon={group} />
      </Link>
    </div>
  );
};

export default AdminDashboard;
