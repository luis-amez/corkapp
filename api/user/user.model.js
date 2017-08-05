const mongoose = require('mongoose');
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

module.exports = mongoose.model('User', userSchema);
