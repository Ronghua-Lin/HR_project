const Person=require("../models/Person")
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
const {getSingleFile,uploadSingleFile,deleteSingleFile}=require('../utils/S3_bucket')


exports.personal_information = async (req, res) => { 
    const username=req.query.name
  try {
    const user=await Person.findOne({username})

    res.status(200).json({msg:'getting employee profiles',data:user})

  } catch (e) {
    console.error(e);
    res.status(500)
  }
};

exports.update_personal_information = async (req, res) => { 
  const {username,update_info}=req.body
try {

  let user=await Person.findOne({username})

  user={...user,...update_info}
  await user.save()
  res.status(200).json({msg:'update sucessfuly',data:profiles})

} catch (e) {
  console.error(e);
  res.status(500)
}
};


exports.get_visa_status = async (req, res) => { 
  const username=req.query.name
try {

  let user=await Person.findOne({username})

  const data={
    work_authorization:user.work_authorization,
    work_authorization_documents:user.work_authorization_documents
  }
  res.status(200).json({msg:'update sucessfuly',data})

} catch (e) {
  console.error(e);
  res.status(500)
}
};


exports.update_visa_status = async (req, res) => { 
  const {username,filename}=req.body
try {

  let user=await Person.findOne({username})

  user.OPT_status='pending'

  // const OPT_types = ['receipt', 'EAD', 'I-983', 'I-20', 'done'];
  // const cur = OPT_status.indexOf(user.OPT_type);
  if(user.work_authorization_documents[user.OPT_type]){
    await deleteSingleFile(user.work_authorization_documents[user.OPT_type])
  }
  await uploadSingleFile(filename)

  const date=user.OPT_type+'_date'
  user.work_authorization_documents[user.OPT_type]={
    [user.OPT_type]:filename,
    date:new Date()
  }
  await user.save();



  res.status(200).json({msg:'update sucessfuly',data:profiles})

} catch (e) {
  console.error(e);
  res.status(500)
}
};

