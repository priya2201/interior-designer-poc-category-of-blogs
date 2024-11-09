const mongoose = require("mongoose");
const { Schema } = mongoose;
const categorySchema = new Schema(
  {
    categoryName: {
      type: Schema.Types.String,
      required: [true, "Category is required"],
      minlength: [3, "Category must be at least 3 characters long"],
      maxlength: [20, "Category must be at most 20 characters long"],    },
  },
  { timestamps: true }
);
const BlogCategory = mongoose.model("BlogCategory", categorySchema);
module.exports = BlogCategory;
