const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const Housingschema = new Schema({
  id:{type:String,required:true, unique:[true,'id must be unique!']},
  address: String,
  Landlord:{
    name:String,
    phone_number:Number,
    email:String
  },
  number_of_residents: Number,
  Facility_information:{
    beds:Number,
    mattresses:Number,
    tables:Number,
    chairs:Number,
    reports:[{
      title:String,
      date:Date,
      status:String,
      description:String,
      comments:String
    }]
  },
  Employees:[{ type: refType, ref: 'Person' }]

});

const Housing = mongoose.model("Housing", Housingschema, "Housing");

module.exports = Housing;
