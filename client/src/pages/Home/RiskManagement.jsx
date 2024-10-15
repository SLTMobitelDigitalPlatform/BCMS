import logo from "../../assets/risk management logo.png";
import ellipse from "../../assets/Ellipse.png";

const RiskManagement = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${ellipse})`,
        backgroundSize: "55%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center px-20 py-2">
        <img
          src={logo}
          alt="Risk Management Logo"
          className="w-44 h-44 mr-14"
        />

        <div>
          <h1 className="text-5xl font-bold mb-4 text-blue-800">
            RISK MANAGEMENT
          </h1>
          <h2 className="text-3xl font-semibold">
            Ensure that management identifies, analyzes, and responds
            appropriately to risks that may adversely affect realization of your
            business objectives.
          </h2>
        </div>
      </div>
      <div className="px-16">
        <h3 className="text-2xl font-bold ">Types of Risk Analysis</h3>
        <h4 className="text-xl font-bold pt-5">Risk-Benefits</h4>
        <p className="font-semibold pt-1">
          Many people are aware of a cost-benefit analysis. In this type of
          analysis, an analyst compares the benefits a company receives to the
          financial and non-financial expenses related to the benefits. The
          potential benefits may cause other, new types of potential expenses to
          occur. In a similar manner, a risk-benefit analysis compares potential
          benefits with associated potential risks. Benefits may be ranked and
          evaluated based on their likelihood of success or the projected impact
          the benefits may have.
        </p>

        <h4 className="text-xl font-bold pt-5">Needs Assessment</h4>

        <p className="font-semibold pt-1">
          A needs risk analysis is an analysis of the current state of a
          company. Often, a company will undergo a needs assessment to better
          understand a need or gap that is already known. Alternatively, a needs
          assessment may be done if management is not aware of gaps or
          deficiencies. This analysis lets the company know where they need to
          spending more resources in.
        </p>

        <h4 className="text-xl font-bold pt-5">Business Impact Analysis</h4>
        <p className="font-semibold pt-1">
          In many cases, a business may see a potential risk looming and wants
          to know how the situation may impact the business. For example,
          consider the probability of a concrete worker strike to a real estate
          developer. The real estate developer may perform a business impact
          analysis to understand how each additional day of the delay may impact
          their operations.
        </p>
        <h4 className="text-xl font-bold pt-5">Root Cause Analysis</h4>
        <p className="font-semibold pt-1">
          Opposite of a needs analysis, a root cause analysis is performed
          because something is happening that shouldn't be. This type of risk
          analysis strives to identify and eliminate processes that cause
          issues. Whereas other types of risk analysis often forecast what needs
          to be done or what could be getting done, a root cause analysis aims
          to identify the impact of things that have already happened or
          continue to happen.
        </p>
      </div>
    </div>
  );
};

export default RiskManagement;
