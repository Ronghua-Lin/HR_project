
const jwt = require("jsonwebtoken");
exports.auth_session = (req, res, next) => {
  

  const signed_jwt=req.headers.authentication.split(' ')[1]
  // const signed_jwt=req.cookies.jwt;


  const decoded_real_jwt = jwt.verify(signed_jwt, process.env.JWT_KEY);

  if (!decoded_real_jwt){
    console.log("not login")
    res.status(401).json({message:'please login first!'})
  }
    
  else{
    req.email=decoded_real_jwt.email
    next();
  } 
};

