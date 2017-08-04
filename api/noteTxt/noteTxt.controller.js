mongoose = require('mongoose');
noteTxtModel = require ('./noteTxt.model');



exports.createNote = function(req, res, next) {
	const newNoteTxt = new noteTxtModel({
		title: req.body.title,
		contentNote: req.body.contentNote,
		creator: req.body.creator,
		cork: req.body.cork,
		isPrivate: req.body.isPrivate
		//sharedWith: req.body.sharedWith,
	});

	newNoteTxt.save((err, note) => {
	if(err) {
		console.log("luis tonti");
		console.log(err);
		return res.send(500);
	}
	res.json({ message: 'note successfully created', note: note });
});
};


exports.showNotes = function (req, res, next) {

	noteTxtModel.find({}, function(err, notesTxtList) {
		if( err) {
			res.json(err);
		} else {
			res.status(200).json(notesTxtList);
		}
	});
};

exports.editNote = function(req, res, next) {
	const noteTxtId = req.params.id;
	const noteTxtToUpdate = {
		title: req.body.title,
		contentNote: req.body.contentNote,
		isPrivate: req.body.isPrivate,
		creator: req.body.creator,
		cork: req.body.cork
	};

	noteTxtModel.findByIdAndUpdate(noteTxtId, noteTxtToUpdate, {'new':true}, (err, noteTxt) => {
			if(err) {
				res.json(err);
			}
			res.json({ message: 'updated', note: noteTxt });
		});
};


exports.removeNote = function (req, res) {
	const noteTxtId = req.params.id;
  noteTxtModel.findByIdAndRemove(noteTxtId, function(err) {
          if (err) {
              res.json({ message: 'impossible to remove the note', error: err });
          }

          res.json({ message: 'note removed successfully' });
      });
};
