import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./auth/AuthContext.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./routes.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      {/* <App /> */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
