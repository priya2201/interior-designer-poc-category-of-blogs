const mongoose = require("mongoose");
const { Schema } = mongoose;
const authorSchema = new Schema(
  {
    firstName: {
      type: Schema.Types.String,
      required: [true, "FirstName is required"],
      minlength: [3, "FirstName must be at least 3 characters long"],
      maxlength: [20, "FirstName must be at most 20 characters long"],
    },
    lastName: {
      type: Schema.Types.String,
      required: [true, "LastName is required"],
      minlength: [3, "LastName must be at least 3 characters long"],
      maxlength: [20, "LastName must be at most 20 characters long"],
    },
  },
  { timestamps: true }
);
const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
