const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const noteTxtSchema = new Schema ({
    title: String,
    contentNote: String,
    isPrivate: True,
    sharedWith: [],
}, {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
});



module.export = mongoose.model ('noteTxt', noteTxtSchema);
