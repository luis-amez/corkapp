const mongoose = require('mongoose');
const corkModel = require('../cork/cork.model');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
  username: {
    type: String,
    require: [true, 'The username is required']
  },
  password: {
    type: String,
    require: [true, 'The password is required']
  },
  email: {
    type: String,
    require: [true, 'The email is required']
  },
  corks: [{
    type: Schema.Types.ObjectId,
    ref: 'Cork',
    default: []
  }]
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

userSchema.methods.createFirstCork = function() {
  that = this;
  let userId = that._id;

	const newCork = new corkModel({
		title: that.username + "'s cork",
		creator: userId,
	});

  newCork.save((err, cork) => {
  	if(err) {
  		console.log(err);
  		return res.send(500);
  	}
    that.corks.push(cork);
    that.save();
    cork.createFirstNote();
  });
};

module.exports = mongoose.model('User', userSchema);
