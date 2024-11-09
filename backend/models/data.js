const mongoose = require("mongoose");
const { Schema } = mongoose;
const dataSchema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [35, "Title must be at most 35 characters long"],
    },
    description: {
      type: Schema.Types.String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters long"],
      maxlength: [250, "Description must be at most 250 characters long"],
    },
    subtitle: {
      type: Schema.Types.String,
      required: [true, "Subtitle is required"],
      minlength: [10, "Subtitle must be at least 10 characters long"],
      maxlength: [50, "Subtitle must be at most 50 characters long"],
    },
    images:[ {
      type: Schema.Types.String,
      required: [true, "At least44444Image is required"],
    },],
number: {
  type: Schema.Types.Number,
  required: [true, "Number is required"],

    },
    faqId: {
      type: Schema.Types.ObjectId,
      ref:'FAQ'
}
  },
  { timestamps: true }
);


const Data = mongoose.model("Data", dataSchema);
module.exports = Data;
