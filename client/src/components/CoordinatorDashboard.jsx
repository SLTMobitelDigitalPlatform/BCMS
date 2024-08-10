import React from "react";
import Card from "./Card";
import userRole from "../assets/user.png";
import docu from "../assets/docu.png";
import calendar from "../assets/calendar.png";
import intranet from "../assets/intranet.png";
import group from "../assets/group.png";
import policy from "../assets/policy.png";
import org from "../assets/org.png";
import { Link } from "react-router-dom";

const CoordinatorDashboard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full lg:w-auto">
      <Link to="/employee">
        <Card title="View User roles & Responsibilities" icon={userRole} />
      </Link>
      <Card title="View Documents" icon={docu} />
      <Card title="Calendar" icon={calendar} />
      <Card title="Intranet" icon={intranet} />
      <Card title="Meetings" icon={group} />
      <Card title="Organization Guidelines & Policies" icon={policy} />
      <Card title="Organization Communication Hierarchy" icon={org} />
    </div>
  );
};

export default CoordinatorDashboard;
