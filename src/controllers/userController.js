const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const fs = require('fs');
const pdf = require('pdf-parse');

const User = require('../models/userModel');
const commonFunc = require('../modules/commonFunction');
const responses = require('../modules/responses');

const uploadFile = (req, res) => {
	var uploadFile = req.files[0];

	let dataBuffer = fs.readFileSync(uploadFile.path);
 
	pdf(dataBuffer).then(function(data) {
		var data = data.text.replace(/\s*:\s*/ig, ':').replace(/   +/ig, '  ').trim().split('  ');
		var jsonData = data.reduce(function(m,i){
		    var s = i.split(':');
		    m[s.shift()] = s.join(':');
		    return m;
		}, {});
		var dataFile = {};
	    var ee = jsonData.Email;
		var checkEmail = ee.substring(1).trim();

	    User.findOne({email: checkEmail})
	    .then((checkEmailResult)=>{
			if (checkEmailResult) {
			    dataFile = {path: uploadFile.path, filename: uploadFile.filename};
            	User.update({ email: checkEmail }, dataFile).then((insertData) => {
			    	commonFunc.sendMail(checkEmail);
					responses.sendResult(res, insertData);
				})
				.catch((err)=> {
					responses.sendError(err.message, res);
				});
			} else {
				dataFile.name = jsonData.Name;
			    dataFile.email = checkEmail;
			    dataFile.contactNumber = jsonData.Phone;
			    dataFile.address = jsonData.Address;
			    dataFile.content = [{path: uploadFile.path, filename: uploadFile.filename}];

			    User.save(dataFile).then((saveResult)=> {
			    	commonFunc.sendMail(checkEmail);
					responses.sendResult(res, dataFile);
				})
				.catch((err)=> {
					responses.sendError(err.message, res);
				});
			}
		})
		.catch((err)=> {
			responses.sendError(err.message, res);
		});
	});

	
}

module.exports = {uploadFile};