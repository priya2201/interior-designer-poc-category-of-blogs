const mongoose = require("mongoose");
const { Schema } = mongoose;

const homeSchema = new Schema(
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
    images: [
      {
        type: Schema.Types.String,
        required: [true, "At least one image is required"],
      },
    ],
  },
  { timestamps: true }
);

const Home = mongoose.model("Home", homeSchema);
module.exports = Home;
