const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const noteTxtSchema = new Schema ({
    title: String,
    contentNote: String,
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



module.exports = mongoose.model ('noteTxt', noteTxtSchema);
