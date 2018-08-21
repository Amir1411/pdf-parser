const async = require('async');
const _  = require('lodash');
const nodemailer = require('nodemailer');


/*
 * -----------------------
 * GENERATE RANDOM STRING
 * -----------------------
 */
 exports.generateRandomString = () => {
	let text = "";
	let possible = "123456789";

	for (var i = 0; i < 4; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
};

/*
 * -----------------------------------------------
 * CHECK EACH ELEMENT OF ARRAY FOR BLANK AND Key
 * -----------------------------------------------
 */

exports.checkKeyExist = (req, arr) => {
	return new Promise((resolve, reject) => {
		var array = [];
		_.map(arr, (item) => {
			if(req.hasOwnProperty(item)) {
				var value = req[item];
				if( value == '' || value == undefined ) { 
					array.push(item+" can not be empty");
				}
				resolve(array);
			} else {
				array.push(item+" key is missing");
				resolve(array);
			}
		});
	}); 
};

exports.sendMail = (toEmail) => {
	console.log(toEmail);
	nodemailer.createTestAccount((err, account) => {
	    let transporter = nodemailer.createTransport({
	        host: 'smtp.ethereal.email',
	        port: 587,
	        service: "Gmail",
	        auth: {
	            user: "", // Your Email
	            pass: ""  // Your Password
	        }
	    });

	    // setup email data with unicode symbols
	    let mailOptions = {
	        from: 'md.amir1411@gmail.com', // sender address
	        to: toEmail, // list of receivers
	        subject: 'Thank you ✔', // Subject line
	        html: '<b>Your PDF file has been uploaded successfully</b>' // html body
	    };

	    transporter.sendMail(mailOptions, (error, info) => {
	        if (error) {
	            return console.log(error);
	        }
	        console.log('Message sent: %s', info.messageId);
	        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	    });
	});
}