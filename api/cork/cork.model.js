const mongoose = require('mongoose');
const noteTxtModel = require ('../noteTxt/noteTxt.model');
const Schema = mongoose.Schema;

const corkSchema = new Schema ({

  title: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    // type: String,
    // require: true
  },
    contentCork: [{
    type: Schema.Types.ObjectId,
    ref: 'NoteTxt',
    default: []
  }],

  // sharedWith: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Users',
  //   default: []
  // }]
}, {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
});

corkSchema.methods.createFirstNote = function() {
  that = this;
  let userId = that.creator;
  let corkId = that._id;

  const newNoteTxt = new noteTxtModel({
		creator: userId,
		title: "First Note",
		contentNote: "Write here something you want to remember...",
		cork: corkId,
		isPrivate: true
		//sharedWith: req.body.sharedWith,
	});

  newNoteTxt.save((err, note) => {
  	if(err) {
  		console.log(err);
  		return res.send(500);
  	}
    that.contentCork.push(note);
    that.save();
  });
};

module.exports = mongoose.model('Cork', corkSchema);
