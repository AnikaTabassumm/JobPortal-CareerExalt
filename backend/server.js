const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const { sequelize, connectDB } = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require('./routes/userRoute'));
app.use('/api/employers', require('./routes/employerRoute'));
app.use("/api/jobSeekers", require('./routes/jobSeekerRoute'));
app.use('/api/jobPosts', require('./routes/jobPostRoute'));
app.use('/api/jobApplications', require('./routes/jobApplicationRoute'));
// app.use('/api/resumes', require('./routers/resumeRoute'));
// app.use('/api/notifications', require('./routers/notificationRoute'));
app.use('/api/contacts', require('./routes/contactRoute'));

app.use(errorHandler);

sequelize.sync().then(() => {
  console.log("Database & tables created!".green);
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`.yellow);
  });
});
