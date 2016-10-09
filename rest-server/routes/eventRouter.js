var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Events = require('../models/events');

var eventRouter = express.Router();
eventRouter.use(bodyParser.json());

eventRouter.route('/')
.get(function (req, res, next) {
    Events.find({}, function (err, event) {
        if (err) throw err;
        res.json(event);
    });
})

.post(function (req, res, next) {
    Events.create(req.body, function (err, event) {
        if (err) throw err;
        console.log('Event created!');
        var id = event._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the event with id: ' + id);
    });
})

.delete(function (req, res, next) {
    Events.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

eventRouter.route('/:eventId')
.get(function (req, res, next) {
    Events.findById(req.params.eventId, function (err, event) {
        if (err) throw err;
        res.json(event);
    });
})

.put(function (req, res, next) {
    Events.findByIdAndUpdate(req.params.eventId, {
        $set: req.body
    }, {
        new: true
    }, function (err, event) {
        if (err) throw err;
        res.json(event);
    });
})

.delete(function (req, res, next) {
    Events.findByIdAndRemove(req.params.eventId, function (err, resp) {        if (err) throw err;
        res.json(resp);
    });
});

eventRouter.route('/:eventId/comments')
.get(function (req, res, next) {
    Events.findById(req.params.eventId, function (err, event) {
        if (err) throw err;
        res.json(event.comments);
    });
})

.post(function (req, res, next) {
    Events.findById(req.params.eventId, function (err, event) {
        if (err) throw err;
        event.comments.push(req.body);
        event.save(function (err, event) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(event);
        });
    });
})

.delete(function (req, res, next) {
    Events.findById(req.params.eventId, function (err, event) {
        if (err) throw err;
        for (var i = (event.comments.length - 1); i >= 0; i--) {
            event.comments.id(event.comments[i]._id).remove();
        }
        event.save(function (err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all comments!');
        });
    });
});

eventRouter.route('/:eventId/comments/:commentId')
.get(function (req, res, next) {
    Events.findById(req.params.eventId, function (err, event) {
        if (err) throw err;
        res.json(event.comments.id(req.params.commentId));
    });
})

.put(function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    Events.findById(req.params.eventId, function (err, event) {
        if (err) throw err;
        event.comments.id(req.params.commentId).remove();
        event.comments.push(req.body);
        event.save(function (err, event) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(event);
        });
    });
})

.delete(function (req, res, next) {
    Events.findById(req.params.eventId, function (err, event) {
        event.comments.id(req.params.commentId).remove();
        event.save(function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
});

// Attendees
eventRouter.route('/:eventId/attendees')
.get(function (req, res, next) {
    Events.findById(req.params.eventId, function (err, event) {
        if (err) throw err;
        res.json(event.attendees);
    });
})

.post(function (req, res, next) {
    Events.findById(req.params.eventId, function (err, event) {
        if (err) throw err;
        event.attendees.push(req.body);
        event.save(function (err, event) {
            if (err) throw err;
            console.log('Updated Attendees!');
            res.json(event);
        });
    });
})

.delete(function (req, res, next) {
    Events.findById(req.params.eventId, function (err, event) {
        if (err) throw err;
        for (var i = (event.attendees.length - 1); i >= 0; i--) {
            event.attendees.id(event.attendees[i]._id).remove();
        }
        event.save(function (err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all attendees!');
        });
    });
});

// Attendees
eventRouter.route('/:eventId/attendees/:attendeeId')
.get(function (req, res, next) {
    Events.findById(req.params.eventId, function (err, event) {
        if (err) throw err;
        res.json(event.attendees.id(req.params.attendeeId));
    });
})

.put(function (req, res, next) {
    // We delete the existing attendee and insert the updated
    // attendee as a new attendee
    Events.findById(req.params.eventId, function (err, event) {
        if (err) throw err;
        event.attendees.id(req.params.attendeeId).remove();
        event.attendees.push(req.body);
        event.save(function (err, event) {
            if (err) throw err;
            console.log('Updated Attendees!');
            res.json(event);
        });
    });
})

.delete(function (req, res, next) {
    Events.findById(req.params.eventId, function (err, event) {
        event.attendees.id(req.params.attendeeId).remove();
        event.save(function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
});

module.exports = eventRouter;