const mongoose = require("mongoose");
const { MONGO_URL } = process.env;
const { v4: uuidv4 } = require('uuid');
const Person= require('../models/Person.js');

mongoose.connect(MONGO_URL, {
  dbName: 'HR_application',
},async (error) => {
  if (error) console.log(error);
  else {
    console.log('connected to database!')
  //   Person.create({id:uuidv4(),role:'HR',
  //   username:'HR1',
  //   password:'HR1',
  //   email:'HR@gmail.com',
  //   onboarding:'approved'
  // })

  }
}
);

module.exports = mongoose.connection;
