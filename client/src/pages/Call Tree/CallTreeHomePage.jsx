import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CallTreeHomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="btn btn-primary w-60 m-10">
        <Link to="/call-tree">Sectional Call Tree</Link>
      </div>
      <div className="btn btn-secondary w-60 m-10">
        <Link to="/org-call-tree">Organizational Call Tree</Link>
      </div>
    </div>
  );
};

export default CallTreeHomePage;
