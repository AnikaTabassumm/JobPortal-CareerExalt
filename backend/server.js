const express = require("express");
const colors = require("colors");
const SSLCommerzPayment = require('sslcommerz-lts')
const cronJobs = require('./utils/cronJobs')
const path = require('path');
require('dotenv').config();
const { errorHandler } = require("./middleware/errorMiddleware");
const { sequelize, connectDB } = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

console.log('JWT_SECRET:', process.env.JWT_SECRET);

const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json({limit: '2mb'}));
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require('./routes/userRoute'));
app.use('/api/employers', require('./routes/employerRoute'));
app.use("/api/jobSeekers", require('./routes/jobSeekerRoute'));
app.use('/api/jobPosts', require('./routes/jobPostRoute'));
app.use('/api/jobApplications', require('./routes/jobApplicationRoute'));
// app.use('/api/resumes', require('./routers/resumeRoute'));
// app.use('/api/notifications', require('./routers/notificationRoute'));
app.use('/api/contacts', require('./routes/contactRoute'));
app.use('/api/experiences', require('./routes/candidateExperienceRoute'));
app.use('/api/certificates', require('./routes/candidateCertificateRoute'));
app.use('/api/educations', require('./routes/candidateEducationRoute'));
app.use('/api/skills', require('./routes/candidateSkillRoute'));
app.use('/api/orders', require('./routes/orderRoute'));
app.use('/api/packages', require('./routes/packageRoute'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route to get the PDF file (optional)
// app.get('/uploads/:filename', (req, res) => {
//   const filePath = path.join(__dirname, 'uploads', req.params.filename);
//   res.download(filePath); // This will set headers to download
// });

app.use(errorHandler);

require('./utils/cronJobs')

sequelize.sync().then(() => {
  console.log("Database & tables created!".green);
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`.yellow);
  });
});
