const mongoose = require("mongoose");
const { Schema } = mongoose;
const latestTrendsSchema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [55, "Title must be at most 55 characters long"],
    },
    description: {
      type: Schema.Types.String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters long"],
      maxlength: [250, "Description must be at most 250 characters long"],
    },
    image: {
      type: Schema.Types.String,
      required: [true, "Image is required"],
    },
    order: {
      type: Schema.Types.Number,
      required: [true, "Order Must be a number"],
    },
  },
  { timestamps: true }
);
const Latest_Trend = mongoose.model("Latest_Trend", latestTrendsSchema);
module.exports = Latest_Trend;
