import calendar from "../assets/calendar.png";
import docu from "../assets/docu.png";
import intranet from "../assets/intranet.png";
import org from "../assets/org.png";
import policy from "../assets/policy.png";
import userRole from "../assets/user.png";
import Card from "./Card";

const EmployeeDashboard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full lg:w-auto">
      <Card title="View User roles & Responsibilities" icon={userRole} />
      <Card title="View Documents" icon={docu} />
      <Card title="View Calendar" icon={calendar} />
      <Card title="Intranet" icon={intranet} />
      <Card title="Organization Guidelines & Policies" icon={policy} />
      <Card title="Organization Communication Hierarchy" icon={org} />
    </div>
  );
};

export default EmployeeDashboard;
