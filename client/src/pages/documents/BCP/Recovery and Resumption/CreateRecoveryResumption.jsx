import { useParams } from "react-router-dom";

const CreateRecoveryResumption = () => {
  const { bcpid, cbfid } = useParams();
  console.log(bcpid, cbfid);
  return <div>Create</div>;
};

export default CreateRecoveryResumption;
