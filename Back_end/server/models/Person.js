const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');

const Personschema = new Schema({
  id:{type:String,required:true, unique:[true,'id must be unique!']},
  role:{type:String,required:true,enum : ['employee','HR']},
  username:{type:String,required:true, unique:[true,'username must be unique!'] },
  password:{type:String,required:true},
  email:{type:String,required:true, unique: [true,'email must be unique!'], validate: [ isEmail, 'invalid email' ] },
  onboarding:{type:String,enum : ['not started','pending','rejected','approved'],required:true},
  first_name:{type:String},
  last_name:{type:String},
  middle_name:{type:String},
  current_address:{type:String},
  phone_number:{type:String},
  car_information:{make:String,model:String,color:String},
  SSN:{type:String},
  birthday:{type:String},
  gender:{type:String,enum : ['male','female','no answer']},

  visa_status:{
    type:String,enum : ['green card','citizen']
  },
  work_authorization:{
    title: String ,
    start_date:String,
    end_date:String,
    OPT_type:{type:String,enum : ['OPT_receipt','OPT_EAD','I_983','I_20','done']},
    OPT_status:{type:String,enum : ['pending','rejected','approved']},
  },
  work_authorization_documents:{
    OPT_receipt:String,
    OPT_receipt_date:Date,
    OPT_EAD:String,
    OPT_EAD_date:Date,
    I_983:String,
    I_983_date:Date,
    I_20:String,
    I_20_date:Date,
  },
  driver_license:{
    number:String,
    expiration_date:Date,
    license_copy:String
  }|undefined,
  Reference:{
    first_name:String,
    last_name:String,
    middle_name:String|undefined,
    phone_number:String,
    email:String,
    relationship:String
  },
  emergency_contact:{
    first_name:String,
    last_name:String,
    middle_name:String|undefined,
    phone_number:String,
    email:String,
    relationship:String
  },
  // employee_list:[{type:String, validate: [ function() {
  //   return this.role ==='HR';
  // }, 'invalid role' ] }],
  profile_picture:String|undefined,
 
});

const Person = mongoose.model("Person", Personschema, "Person");

module.exports = Person;
