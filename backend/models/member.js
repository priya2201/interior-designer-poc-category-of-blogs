const mongoose = require("mongoose");
const { Schema } = mongoose;
const memberSchema = new Schema(
  {
    firstName: {
      type: Schema.Types.String,
      required: true,
    },
    lastName: {
      type: Schema.Types.String,
    },
    position: {
      type: Schema.Types.String,
    },
    image: {
      type: Schema.Types.String,
    },
  },
  { timestamps: true }
);
const Member = mongoose.model("Member", memberSchema);
module.exports = Member;
