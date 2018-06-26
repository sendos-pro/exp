const Domain = require('../models/Domain.model.js');
const logger = require('../log')(module);
const Joi = require('joi');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    console.log('create');

    // Create a Note
    const domain = new Domain({
        domain: req.body.title || "Untitled Note", 
        userid: req.body.content || "Untitled Note" 
    });

    // Save Note in the database
    domain.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        logger.error('%s %d %s', req.method, res.statusCode, err.message);
        res.status(500).send({
            error: "Some error occurred"
        });
    });

};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    console.log('findAll');

    Domain.find()
    .then(Users => {
        res.send(Users);
    }).catch(err => {
        res.status(500).send({
            error: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
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

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    console.log('update');


    // Find note and update it with the request body
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

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

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