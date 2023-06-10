const router = require("express").Router();
const EmployeeController = require("../controllers/EmployeeController");
const { auth_session } = require("../middleware/JWTauth");

//personal information page
router.get('/personal_information',auth_session,EmployeeController.personal_information)
router.post('/update_personal_information',auth_session,EmployeeController.update_personal_information)

//Visa status management page
router.get('/get_visa_status',auth_session,EmployeeController.get_visa_status)
router.post('/update_visa_status',auth_session,EmployeeController.update_visa_status)

//Housing management


module.exports = router;

