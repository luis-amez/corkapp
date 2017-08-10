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

userSchema.methods.createInitialCorks = function(privacy, message) {
  that = this;
  let userId = that._id;
  let username = that.username;
  let corkTitle = "";

  console.log("First that:", that);

  if (privacy) {
    if (username[username.length - 1] !== 's') {
      corkTitle = username + "'s cork";
    } else {
      corkTitle = username + "' cork";
    }
  } else {
    corkTitle = "Public cork";
  }

	const privateCork = new corkModel({
		title: corkTitle,
		creator: userId,
    isPrivate: privacy
	});

  privateCork.save((err, cork) => {
  	if(err) {
  		console.log(err);
  		return res.send(500);
  	}
    console.log("Second that:", that);
    that.corks.push(cork._id);
    that.save();
    cork.createFirstNote(message);
  });

  // const publicCork = new corkModel({
	// 	title: "Public cork",
	// 	creator: userId,
  //   isPrivate: false
	// });
  //
  // publicCork.save((err, cork) => {
  // 	if(err) {
  // 		console.log(err);
  // 		return res.send(500);
  // 	}
  //   that.corks.push(cork);
  //   that.save();
  //   cork.createFirstNote("Write here something you want to share. Your birthday wantlist would be an amazing idea!");
  // });
};

module.exports = mongoose.model('User', userSchema);
