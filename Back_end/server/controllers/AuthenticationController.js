const Person = require('../models/Person');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const _jwt = require('jsonwebtoken');
const { uploadSingleFile} = require('../utils/S3_bucket');

exports.get_signup = async (req, res) => {
	const { jwt } = req.query;

	try {
		const decoded_real_jwt = _jwt.verify(jwt, process.env.JWT_KEY);

		if (!decoded_real_jwt) {
			return res
				.status(401)
				.json({ message: 'you are not authroized to sign up!' });
		}
		const email = decoded_real_jwt.email;
		return res.status(200).json({ message: 'welcome new employee', email });
	} catch (e) {
		console.error(e);
		return res
			.status(401)
			.json({ message: 'you are not authroized to sign up!' });
	}
};

exports.post_signup = async (req, res) => {
	// var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	const { username, email, password } = req.body;

	try {
		const user = await Person.findOne({ username });
		if (user) {
			return res.status(500).json({ msg: 'username or email already exist!' });
		}
		const hashed = await bcrypt.hash(password, Number(process.env.SALT));
		await Person.create({
			id: uuidv4(),
			role: 'employee',
			username,
			password,
			email,
			onboarding: 'not started',
		});

		return res.status(200).json({ msg: 'success' });
	} catch (e) {
		console.error(e);
	}
};

exports.post_login = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await Person.findOne({ username });

		if (!user) {
			return res.status(400).json({ msg: 'wrong credential!' });
		}
		let check_password;

		if (!user.role === 'HR') {
			check_password = await bcrypt.compare(password, user.password);
		} else if (user.password === password) {
			check_password = true;
		} else {
			check_password = false;
		}

		if (check_password) {
			const signed_jwt = _jwt.sign({ email: user.email }, process.env.JWT_KEY, {
				// expiresIn: '30m',
			});
			const onboarding_status = user.onboarding;
			const role = user.role;
			const email = user.email;
			res.status(200).json({
				msg: 'login successfully',
				token: signed_jwt,
				onboarding_status,
				role,
				email,
			});
		} else {
			res.status(500).json({ msg: 'wrong password' });
		}
	} catch (e) {
		console.error(e);
	}
};

exports.get_basic_user_info = async (req, res) => {
  const email=req.email

	try {
	
		const user = await Person.findOne({ email});

		res.status(200).json({
			msg: 'getting info correctly',
			email: user.email,
			onboarding_status: user.onboarding,
		});
	} catch (e) {
		console.error(e);
	}
};

// exports.onboarding_application_status= async (req, res) => {

//   const {username}=req.body;

//   try {
//     const user=await Person.findOne({username});

//     if (!user){
//       return res.status(400).json({msg:'wrong credential!'})
//     }

//     res.status(200).json({msg:'geting onboarding', status:user.onboarding})

//   } catch (e) {
//     console.error(e);
//   }
// }

exports.onboarding_application_submit = async (req, res) => {

  console.log('onboarding submission called!!',req.body)
  
	const form_data = JSON.parse(req.body.form_data);
 
	const files = req.files;
  // console.log('this are files,',files)
	const email=req.email
	try {
		

		const user = await Person.findOne({ email });



		const update ={
      
      onboarding:'pending',
			first_name: form_data.first_name,
			last_name: form_data.last_name,
			middle_name: form_data.middle_name,
			profile_picture: files.profile_picture_source[0].key?files.profile_picture_source[0].key:null,
			current_address: form_data.current_address,
			phone_number: form_data.phone_number,
			car_information: form_data.car_information,
			SSN: form_data.SSN,
			birthday: form_data.birthday,
			gender: form_data.gender,
			work_authorization: form_data.work_authorization?.title
				? {
						title: form_data.work_authorization.other_visa
							? form_data.work_authorization.other_visa
							: form_data.work_authorization.title,
						start_date: form_data.work_authorization.start_date,
						end_date: form_data.work_authorization.end_date,
						OPT_type:
							form_data.work_authorization.title === 'F1(CPT/OPT)'
								? 'OPT_receipt'
								: null,
						OPT_status: 'pending',
						
				  }
				: null,
        work_authorization_documents:form_data.work_authorization?.title==='F1(CPT/OPT)'?
        {
          OPT_receipt:files.OPT_receipt[0].key?files.OPT_receipt[0].key:null,
          OPT_receipt_date:files.OPT_receipt[0].key?new Date():null,
        }:null,
			driver_license: form_data.driver_license
				? {
						number: form_data.driver_license.number,
						expiration_date: form_data.expiration_date,
						license_copy: files.license_copy_source[0].key?files.license_copy_source[0].key:null,
				  }
				: null,
			Reference: form_data.reference
				? {
						first_name: form_data.reference_information.first_name,
						last_name: form_data.reference_information.last_name,
						middle_name: form_data.reference_information.middle_name,
						phone_number: form_data.reference_information.phone_number,
						email: form_data.reference_information.email,
						relationship: form_data.reference_information.relationship,
				  }
				: null,
			emergency_contact: {
				first_name: form_data.emergency_contact.first_name,
				last_name: form_data.emergency_contact.last_name,
				middle_name: form_data.emergency_contact.middle_name,
				phone_number: form_data.emergency_contact.phone_number,
				email: form_data.emergency_contact.email,
				relationship: form_data.emergency_contact.relationship,
			},
			
		}
    //  uploadSingleFile

    console.log('update is ',update)
    await Person.findOneAndUpdate({ email },update);

    
    
		
		res.status(200).json({msg:'onboarding submitted successfully'})
	} catch (e) {
		console.error(e);
	}
};
