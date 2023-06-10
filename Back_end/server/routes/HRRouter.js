const router = require("express").Router();
const HRController = require("../controllers/HRController");
const { auth_session } = require("../middleware/JWTauth");

//HR profile page
//get all employees!!
router.get('/employee_profiles',auth_session,HRController.employee_profiles)

//HR visa management page 
router.get('/employees_visa_status',auth_session,HRController.employees_visa_status)
router.post('/visaproval',auth_session,HRController.visaproval)
router.post('/send_email_noticefication',auth_session,HRController.send_email_noticefication)


//Hiring management

router.get('/onboarding_application',auth_session,HRController.onboarding_application)
router.post('/onboarding_application_action',auth_session,HRController.onboarding_application_action)
router.post('/send_registration_token',auth_session,HRController.send_registration_token)
router.get('/onboarding_application_indivisual',auth_session,HRController.onboarding_application_indivisual)

//Housing management


module.exports = router;

