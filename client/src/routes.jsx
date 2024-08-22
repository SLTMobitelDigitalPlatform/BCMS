// import { createBrowserRouter } from "react-router-dom";
// import Layout from "./pages/Layout";
// import ErrorPage from "./pages/ErrorPage";

// import Home from "./pages/Home/Home";
// import Profile from "./components/Profile";
// import Dashboard from "./pages/Dashboards/Dashboard";
// import RiskManagement from "./pages/Home/RiskManagement";
// import AboutUs from "./pages/Home/AboutUs";
// import Contact from "./pages/Home/Contact";
// import Feedback from "./pages/Home/Feedback";
// import FeedbackList from "./pages/Home/FeedbackList";
// import DescriptionPage from "./pages/Home/description";
// import Login from "./pages/Login/Login";
// import Otp from "./pages/Otp/Otp";
// import SubscriptionPage from "./pages/Login/SubscriptionPage";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/profile",
//     element: <Layout />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "",
//         element: <Profile />,
//       },
//     ],
//   },
//   {
//     path: "/dash",
//     element: <Layout />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "",
//         element: <Dashboard />,
//       },
//     ],
//   },
//   {
//     path: "/risk-management",
//     element: <RiskManagement />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/about-us",
//     element: <AboutUs />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/contact-us",
//     element: <Contact />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/feedback",
//     element: <Feedback />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/feedbacks",
//     element: <FeedbackList />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/description/:id",
//     element: <DescriptionPage />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/otp",
//     element: <Otp />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/subscribe",
//     element: <SubscriptionPage />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/subscribeForm",
//     element: <SubscriptionForm />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/subscribeForm1",
//     element: <SubscriptionForm1 />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/employeedash",
//     element: <EmployeeHomePage />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/secrecoordinator",
//     element: <SecreCoordinatorHomePage />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/admin",
//     element: (
//       <ProtectedRoute>
//         <AdminHomePage />
//       </ProtectedRoute>
//     ),
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/coordinator",
//     element: <CoordinatorHomePage />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/team",
//     element: <TeamHomePage />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/employee",
//     element: <Employee />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/meeting",
//     element: <Meeting />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/meeting/createMeeting",
//     element: <CreateMeeting />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/meeting/updateMeetings/:id",
//     element: <UpdateMeetings />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/meeting/viewMeetings/:id",
//     element: <ViewMeeting />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/meeting/viewMeetings/:id/editmeeting",
//     element: <EditMeeting />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/roles/createRoles",
//     element: <CreateRoles />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/roles/editRoles",
//     element: <EditRoles />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/roles",
//     element: <Roles />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/AboutmeView/AboutmeForm",
//     element: <AboutmeForm />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/AboutmeView",
//     element: <AboutmeView />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/calendar",
//     element: <Calendar />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/event/:id/update",
//     element: <UpdateEvent />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/add-event",
//     element: <AddEvents />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/riskAssesements",
//     element: <RiskAssesement />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/createRisk",
//     element: <CreateRiskAssesement />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/editRisk/:id",
//     element: <EditRiskAssesement />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/versionControls",
//     element: <VersionControls />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/createVersion",
//     element: <CreateVersionControl />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/editVersion/:id",
//     element: <EditVersionControl />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/objectives",
//     element: <Objectives />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/interfaces",
//     element: <InterfacesDependencies />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/masterProcedures",
//     element: <MasterProcedures />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/internalIssues",
//     element: <InternalIssues />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/externalIssues",
//     element: <ExternalIssues />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "*",
//     element: <ErrorPage />,
//   },
// ]);

// export default router;
