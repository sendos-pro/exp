const User = require('../models/User.model.js');
const logger = require('../log')(module);
const Joi = require('joi');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    console.log('create');

    // Create a Note
    const user = new User({
        login: req.body.title || "Untitled Note", 
        password: req.body.content || "Untitled Note" 
    });

    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        logger.error('%s %d %s', req.method, res.statusCode, err.message);
        res.status(500).send({
            error: "Some error occurred"
        });
    });

};

exports.findAll = (req, res) => {
    console.log('findAll');

    User.find()
    .then(Users => {
        res.send(Users);
    }).catch(err => {
        res.status(500).send({
            error: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.findOne = (req, res) => {
    // Validate request
    console.log('findOne');

    User.findById(req.params.user)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                error: "Note not found with id " + req.params.user
            });            
        }
        res.send(user);
    }).catch(err => {
        // if(err.kind === 'ObjectId') {
        //     return res.status(404).send({
        //         message: "Note not found with id " + req.params.user
        //     });                
        // }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.user
        });
    });
};

exports.update = (req, res) => {
    // Validate request
    
    console.log('update');

    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};

exports.delete = (req, res) => {
    // Validate request

    console.log('delete');


    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};