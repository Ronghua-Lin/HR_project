const router = require("express").Router();
const AuthenticationController = require("../controllers/AuthenticationController");
const { auth_session } = require("../middleware/JWTauth");
const {fileupload} =require('../utils/S3_bucket')


router.get('/signup',AuthenticationController.get_signup);
router.post('/signup',AuthenticationController.post_signup);
router.post('/login',AuthenticationController.post_login);
router.get('/get_basic_user_info',auth_session,AuthenticationController.get_basic_user_info);
// router.get('/onboarding_application_status',auth_session,AuthenticationController.onboarding_application_status);
router.post('/onboarding_application_submit',auth_session,fileupload,AuthenticationController.onboarding_application_submit);


module.exports = router;