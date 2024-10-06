import { useParams } from "react-router-dom";

const EditRecoveryResumption = () => {
  const { bcpid, cbfid } = useParams();
  console.log(bcpid, cbfid);
  return <div>Edit</div>;
};

export default EditRecoveryResumption;
