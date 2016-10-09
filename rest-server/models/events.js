// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var attendeeSchema = new Schema({
    email:  {
        type: String,
        required: true
    },
    rsvp:  {
        type: Boolean,
        default: false,
        required: true
    }
}, {
    timestamps: true
});

var locationSchema = new Schema({
    name:  {
        type: String,
        required: true
    },
    address:  {
        type: String,
        required: true
    },
    city:  {
        type: String,
        required: true
    },
    state:  {
        type: String,
        required: true
    },
    zip:  {
        type: String,
        required: true
    },
    phone:  {
        type: String
    },
    latitude:  {
        type: String,
        default: ""
    },
    longitude:  {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

var commentSchema = new Schema({
    email:  {
        type: String,
        required: true
    },
    comment:  {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// create a schema
var eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
	datetime: {
		type: Date,
		required: true
	},
    name:  {
        type: String,
        required: true
    },
    address:  {
        type: String,
        required: true
    },
    city:  {
        type: String,
        required: true
    },
    state:  {
        type: String,
        required: true
    },
    zip:  {
        type: String,
        required: true
    },
    phone:  {
        type: String
    },
    latitude:  {
        type: String,
        default: ""
    },
    longitude:  {
        type: String,
        default: ""
    },
    attendees:[attendeeSchema],
    comments:[commentSchema]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Events = mongoose.model('Event', eventSchema);

// make this available to our Node applications
module.exports = Events;