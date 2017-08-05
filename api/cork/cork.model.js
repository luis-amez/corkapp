const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const corkSchema = new Schema ({

  title: String,
  contentCork: [{
    type: Schema.Types.ObjectId,
    ref: 'NoteTxt',
    default: []
  }],
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    // type: String,
    // require: true
  },
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

module.exports = mongoose.model('Cork', corkSchema);
