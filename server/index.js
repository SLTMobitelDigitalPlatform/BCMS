const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const bodyParser = require("body-parser");

// http server
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

// Database Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error("DB Connection Error:", err));

// Routes
const NewMeetingRoute = require("./routes/NewMeetingRoute");
app.use("/meeting", NewMeetingRoute);

const EmployeeRoute = require("./routes/EmployeeRoute");
app.use("/employees", EmployeeRoute);

const AboutMeRoute = require("./routes/AboutMeRoute");
app.use("/aboutMe", AboutMeRoute);

const RoleRoute = require("./routes/RoleRoute");
app.use("/roles", RoleRoute);

const AttendeeRoute = require("./routes/AttendeeRoute")
app.use("/attendees", AttendeeRoute);

const ActionRoute = require("./routes/ActionRoute")
app.use("/actions", ActionRoute);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
