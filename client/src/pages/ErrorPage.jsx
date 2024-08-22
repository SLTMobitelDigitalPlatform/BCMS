import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div>
      <h1>Oops...</h1>
      <p>
        {isRouteErrorResponse(error)
          ? "This page does not exist"
          : "An Unexpected error occured"}
      </p>
    </div>
  );
};

export default ErrorPage;
