const {mongoose} = require("../db/db");
const bcrypt = require("bcryptjs");
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		trim: true,
	},
	contactNumber: {
		type: String,
		trim: true
	},
	address: {
		type: String,
		trim: "",
		default: ""
	},
    content: {
        type: Array,
        default: []
    }

});

let db = mongoose.model('User', UserSchema);

const findOne = (data) => {
    return new Promise((resolve, reject) => {
        db.findOne(data, function(err, user) {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        })
    })
};

const save = (data) => {
    let record = new db(data);
    return new Promise((resolve, reject) => {
        record.save((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
};
const update = (checkData, updateData) => {
    return new Promise((resolve, reject) => {
        db.findOneAndUpdate(checkData, { $push: {content: updateData} }, { new: true }, (err, result) => {
            if (err) {
                reject(err);
            } else {
                db.findOne(checkData, function(err, user) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(user);
                    }
                });
            }
        })
    })
};

const find = (data) => {
    return new Promise((resolve, reject) => {
        db.find(data, function(err, user) {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        })
    })
};

const remove = (checkData) => {
    return new Promise((resolve, reject) => {
        db.remove(checkData, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
};

module.exports = {
    findOne,
    save,
    update,
    find,
    remove
};