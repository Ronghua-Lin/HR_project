const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
// var cookieParser = require('cookie-parser')
const {sendEmail} =require('./utils/nodemailer')
// const fileUpload= require('express-fileupload')


// app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
// app.use(fileUpload({
//   limits:{fileSize:50*1024*1024} //50MB
// }))
// Configuring .env
require("dotenv").config();

// Applying middleware
app.use('/', express.json()); // parse requests with JSON payload/body
app.use('/public', express.static(path.join(__dirname, '/public'))); // serve static files

// Template engine configuration
// app.set("views", path.join(__dirname, "/views")); // where template files are located
// app.set("view engine", "hbs"); // default engine, dont need to specify .ejs extension

app.use('', routes.AuthenticationRouter);
app.use('/HR', routes.HRRouter);
app.use('/employee', routes.EmployeeRouter);

app.get('/', (req, res) => {
  // sendEmail()
  // .then(res=>res.send(res.message))
  // .catch(err=>res.status(500).send(err.message))
  // res.redirect('/user/login') 

});

// Catch-all route for unsupported paths
app.all('*', (req, res) => {
  res.status(400).json({ error: "InvalidURI", description: `The URI ${req.url} is not valid.` });
});


module.exports = app;