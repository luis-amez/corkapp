mongoose = require('mongoose');
noteTxtModel = require ('./noteTxt.model');



exports.createNote = function(req, res, next) {
	const newNote = new noteTxtModel({
		title: req.body.title,
		contentNote: req.body.contentNote,
		isPrivate: req.body.isPrivate,
		sharedWith: req.body.sharedWith,
	});

};


exports.editNote = function(req, res ,next) {
	const noteId = req.params.id;

	noteTxtModel.findByIdAndUpdate(noteId, { $set: req.body }, function(err, noteTxt) {
			if(err) {
				return res.status(400).json({ message: 'Unable to update note', error: err });
			}
			res.json({ message: 'note successfully updated', note: noteTxt });
		});

    note.save((err) => {
      if (err) {
        res.json(err);
        return;
      }

      res.json({
        message: 'New Phone created!',
        id: thePhone._id
      });
    });




};


exports.removeNote = function (req, res) {
    noteModel.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.json({ message: 'impossible to remove the note', error: err });
            }

            res.json({ message: 'note removed successfully' });
        });
};
