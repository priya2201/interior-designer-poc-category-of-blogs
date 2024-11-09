const mongoose = require("mongoose");
const { Schema } = mongoose;
const portfolioSchema = new Schema(
  {
    image: {
      type: Schema.Types.String,
      required: [true, "One image is required"],
    },
    order: {
      type: Schema.Types.Number,
      required: [true, "Order Must be a Number"],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "GalleryCategory",
      required: [true, "Category Data is required"],
    },
  },
  { timestamps: true }
);
const Portfolio = mongoose.model("Portfolio", portfolioSchema);
module.exports = Portfolio;
