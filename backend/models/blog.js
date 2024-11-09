const mongoose = require("mongoose");
const { Schema } = mongoose;
const blogSchema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [50, "Title must be at most 50 characters long"],
    },

    description: {
      type: Schema.Types.String,
      required: [true, "Description is required"],
      minlength: [3, "Description must be at least 3 characters long"],
      maxlength: [80, "Description must be at most 80 characters long"],
    },
    content: {
      type: Schema.Types.String,
      required: true,
    },
    image: {
      type: Schema.Types.String,
      required: [true, "Single image is required"],
    },
    bannerCaption: {
      type: Schema.Types.String,
      required: [true, "BannerCaption is required"],
      minlength: [3, "BannerCaption must be at least 3 characters long"],
      maxlength: [20, "BannerCaption must be at most 20 characters long"],
    },
    featured: {
      type: Schema.Types.Boolean,
      default: false,
      required: [true, "Featured is required"],
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      required: [true, "Author Data is required"],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category Data is required"],
    },
  },

  { timestamps: true }
);
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
