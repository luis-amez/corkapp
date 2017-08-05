mongoose = require ('mongoose');
corkModel = require('./cork.model');


exports.showCork = function (req, res, next) {
  const corkId = req.params.id;

	corkModel.findById(corkId, function(err, corks) {
		if (err) {
			res.json(err);
		} else {
			res.status(200).json(corks);
		}
	});
};
