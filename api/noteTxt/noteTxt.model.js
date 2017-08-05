const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const noteTxtSchema = new Schema ({
    title: String,
    contentNote: String,
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      // type: String,
      // require: true
    },
    cork: {
      type: Schema.Types.ObjectId,
      ref: 'Cork',
      // type: String,
      // require: true
    },
    isPrivate:  {
      type: Boolean,
      default: true
    }
    //sharedWith: [String],
}, {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
});



module.exports = mongoose.model ('NoteTxt', noteTxtSchema);
