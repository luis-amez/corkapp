const mongoose = require ('mongoose');
const corkModel = require('./cork.model');
const userModel = require('../user/user.model');



exports.createCork = function(req, res, next) {
  let userId = req.body.creator;
	const newCork = new corkModel({
		title: req.body.title,
		creator: userId,
	});

	newCork.save((err, cork) => {
  	if(err) {
  		console.log(err);
  		return res.send(500);
  	}
    userModel.findByIdAndUpdate(userId, { $push: { corks: cork._id }}, (err) => {
      if(err) {
    		console.log(err);
    		return res.send(500);
    	}
    });
    cork.createFirstNote();

  	res.json({ message: 'cork successfully created', cork: cork });
  });
};


exports.showCork = function (req, res, next) {
  const corkId = req.params.id;

	corkModel.findById(corkId, function(err, cork) {
		if (err) {
			res.json(err);
		} else {
			res.status(200).json(cork);
		}
	});
};
