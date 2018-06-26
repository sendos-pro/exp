const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({

	name        : { type: String, trim: true },
	login       : { type: String, lowercase: true, trim: true },
	password    : { type: String, trim: true },
	smptPassword: { type: String, trim: true },
	hSent       : { type: Number, default: 0 },
	hLimit      : { type: Number, default: 100 },
	hTime       : { type: String },
	dSent       : { type: Number, default: 0 },
	dLimit      : { type: Number, default: 500 },
	dTime       : { type: String },
	tarif       : { type: String },
	quota       : { type: Number, default: 15000 },
	country     : { type: String },
	lang        : { type: String },
	poll        : { type: Number },
	isDedicat   : { type: Boolean, default: true },
	isGod       : { type: Boolean, default: false },
	status      : { type: String, default: "active" },
	partnerId   : { type: String},
	apiToken    : { type: String},
	createdDate : { type: Date, default: Date.now },
	lastLogin   : { type: Date }

});

module.exports = mongoose.model('User', UserSchema);
