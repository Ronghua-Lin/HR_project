const Person = require('../models/Person');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const { getSingleFile, uploadSingleFile } = require('../utils/S3_bucket');
const { sendEmail, sendEmailNoticefication } = require('../utils/nodemailer');

exports.employee_profiles = async (req, res) => {
	try {
		const allemployees = await Person.find();

		const employees = allemployees.filter((user) => user.role === 'employee');

		const profiles = await Promise.all(
			employees.map(async (user) => {
				const profile_picture_url = await getSingleFile(user.profile_picture);

				return {
					first_name: user.first_name,
					middle_name: user.middle_name,
					last_name: user.last_name,
					SSN: user.SSN ? user.SSN : 'none',
					work_authorization_title: user.work_authorization.title
						? user.work_authorization.title
						: 'none',
					phone_number: user.phone_number,
					email: user.email,
					profile_picture: profile_picture_url,
				};
			})
		);

		res.status(200).json({ msg: 'getting employee profiles', data: profiles });
	} catch (e) {
		console.error(e);
		res.status(500);
	}
};

exports.employees_visa_status = async (req, res) => {
	try {
		const users = await Person.find();
		const allemployees = users.filter((user) => user.role === 'employee');
   
		const information = await Promise.all(
			allemployees.map(async (user) => {
        let work_documents;
				if (user.work_authorization.title === 'F1(CPT/OPT)') {
					
					if (user.work_authorization.OPT_type !== 'done'&&user.work_authorization.OPT_status==='pending') {
						work_documents = await getSingleFile(
							user.work_authorization_documents[
								user.work_authorization.OPT_type
							]
						);
					} else if(user.work_authorization.OPT_type === 'done'){
						const OPT_receipt = await getSingleFile(
							user.work_authorization_documents[OPT_receipt]
						);
						const OPT_EAD = await getSingleFile(
							user.work_authorization_documents[OPT_EAD]
						);
						const I_983 = await getSingleFile(
							user.work_authorization_documents[I_983]
						);
						const I_20 = await getSingleFile(
							user.work_authorization_documents[I_20]
						);
						work_documents = {
							...user.work_authorization_documents,
							OPT_receipt,
							OPT_EAD,
							I_983,
							I_20,
						};
					}
				}

				return {
					id: user.id,
					first_name: user.first_name,
					last_name: user.last_name,
					work_authorization: user.work_authorization,
					work_authorization_documents:
						user.work_authorization.title === 'F1(CPT/OPT)'
							? work_documents
							: null,
				};
			})
		);

		res.status(200).json({ msg: 'getting visa status', data: information });
	} catch (e) {
		console.error(e);
		res.status(500);
	}
};


exports.send_email_noticefication = async (req, res) => {
	const { id } = req.body;

	try {
		const user = await Person.findOne({ id });

		sendEmailNoticefication(user.email)
			.then((data) => {
				return res.status(200).json({ msg: 'noticefication send' });
			})
			.catch((e) => {
				return res.status(400).json({ msg: 'something goes wrong' });
			});
	} catch (e) {
		console.error(e);
		res.status(500);
	}
};

exports.visaproval = async (req, res) => {
 
	const { id, decision } = req.body;

	try {
		const user = await Person.findOne({ id });

		// if (user.onboarding === 'pending') {
		// 	if (decision === 'approved') {
		// 		user.onboarding = 'approved';
		// 		await user.save();
		// 		res.status(200).send('you application is accepted!');
		// 	} else if (decision === 'rejected') {
		// 		user.onboarding = 'rejected';
		// 		await user.save();
		// 		res.send('rejected!');
		// 	}
		// } else 
    if (user.work_authorization.title === 'F1(CPT/OPT)') {
			const OPT_status = ['OPT_receipt','OPT_EAD','I_983','I_20','done'];
			if (decision === 'accept') {
				const cur = OPT_status.indexOf(user.work_authorization.OPT_type);
				user.work_authorization.OPT_type = OPT_status[cur + 1];
				user.work_authorization.OPT_status = 'approved';
				await user.save();
				res.status(200).send('you application is accepted!');
			} else if (decision === 'reject') {
				user.work_authorization.OPT_status = 'rejected';
				await user.save();
				res.status(200).send('you application is rejected!');
			}
		}
	} catch (e) {
		console.error(e);
		res.status(500);
	}
};

exports.send_registration_token = async (req, res) => {
	const { email } = req.body;
	console.log('email', req.body);
	try {
		const signed_jwt = jwt.sign({ email }, process.env.JWT_KEY, {
			expiresIn: '3h',
		});
		sendEmail(email, signed_jwt)
			.then((data) => {
				res.send(data.message);
			})
			.catch((err) => {
				res.status(500).send(err.message);
			});
	} catch (e) {
		console.error(e);
		res.status(500);
	}
};

exports.onboarding_application = async (req, res) => {
	try {
		const users = await Person.find();
    const employees=users.filter(user=>user.role==='employee')
		const data=employees.map(user=>{
      const fullname=user.middle? user.first_name+" "+user.middle_name+" "+user.last_name:user.first_name+" "+user.last_name
      return {
        id:user.id,
        name: fullname,
        email:user.email,
        onboarding:user.onboarding
      }
      
    })
		res.status(200).json({ msg: 'all applications here', data: data });
	} catch (e) {
		console.error(e);
		res.status(500);
	}
};

exports.onboarding_application_action = async (req, res) => {
	const { username, application } = req.body;

	try {
		let user = await Person.findOne({ username });

		if (application.work_authorization_documents) {
			await uploadSingleFile(application.work_authorization_documents);
		}

		if (application.driver_license) {
			await uploadSingleFile(application.driver_license);
		}

		if (application.profile_picture) {
			await uploadSingleFile(application.profile_picture);
		}

		const newInfo = {
			onboarding: 'approved',
			first_name: application.first_name,
			last_name: application.last_name,
			profile_picture: application.profile_picture,
			current_address: application.current_address,
			phone_number: application.phone_number,
			car_information: application.car_information,
			SSN: application.SSN,
			birthday: application.birthday,
			gender: application.gender,
			work_authorization: application.work_authorization,
			work_authorization_documents: application.work_authorization_documents,
			driver_license: application.driver_license,
			Reference: application.Reference,
			emergency_contact: application.emergency_contact,
		};

		user = { ...user, ...newInfo };
		await user.save();

		res.status(200).json({ msg: 'onboarding application saved!' });
	} catch (e) {
		console.error(e);
		res.status(500);
	}
};

exports.onboarding_application_indivisual = async (req, res) => {
	const { id } = req.query;

	try {
		const user = await Person.findOne({id});
    console.log('id received in server',id, user)
		const profile=await getSingleFile(user.profile_picture);
    const  license_copy=user.driver_license?.license_copy?await getSingleFile(user.driver_license.license_copy):null;

    const info = {
			onboarding: user.onboarding,
			first_name: user.first_name,
			last_name: user.last_name,
			profile_picture: profile,
			address: user.current_address,
			phone_number: user.phone_number,
			car_information: user.car_information,
			email: user.email,
			SSN: user.SSN,
			birthday: user.birthday,
			work_authorization: user.work_authorization,
			driver_license: user.driver_license?{...user.driver_license,license_copy}:undefined,
			Reference: user.Reference,
			emergency_contact: user.emergency_contact,
      gender:user.gender
		};

		res.status(200).json({ msg: 'single employee status', data: info });
	} catch (e) {
		console.error(e);
		res.status(500);
	}
};
