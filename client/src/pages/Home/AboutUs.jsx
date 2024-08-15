import backgroundImage from "../../../src/assets/aboutUsBg.png";

const AboutUs = () => {
  return (
    <div
      className="relative min-h-screen flex flex-col items-start justify-start p-14"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "55%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom center",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <h1 className="text-5xl font-bold text-black mb-4">About Us</h1>
      <p className="text-blue-900 text-2xl font-semibold mt-5">
        To meet the enterprise business objectives and ensure continuity of its
        operations, Sri Lanka Telecom PLC (SLT) has adopted well-defined and
        time-tested plans and procedures under the Business Continuity
        Management System. Accordingly Business Continuity Management (BCM)
        Policy and plans have been established to reiterate the commitment of
        SLT to continue and restore the critical business functions in a
        disruptive situation with minimal impact while maintaining predefined
        acceptable levels.
      </p>
    </div>
  );
};

export default AboutUs;
