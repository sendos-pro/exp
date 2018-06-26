const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DomainSchema = new Schema({

	domain      : { type: String, lowercase: true, trim: true },
	userid      : { type: String},
	spf         : { type: Boolean, default: false },
	dkim        : { type: Boolean, default: false },
	cname       : { type: Boolean, default: false },
	isModeration: { type: Boolean, default: false },
	isActive    : { type: Boolean, default: false },
	createdDate : { type: Date, default: Date.now }

});

module.exports = mongoose.model('Domain', DomainSchema);
