const mongoose = require("mongoose");
const { Schema } = mongoose;
const aboutSchema = new Schema(
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
    image: {
      type: Schema.Types.String,
      required: [true, "Image is required"],
    },
  },
  { timestamps: true }
);

// const aboutSchema = new Schema(
//   {
//     title: {
//       type: Schema.Types.String,
//       required: true,
//     },
//     description: {
//       type: Schema.Types.String,
//     },
//     content:[qaSchema]
//   },
//   { timestamps: true }
// );
const About = mongoose.model("About", aboutSchema);
module.exports = About;
