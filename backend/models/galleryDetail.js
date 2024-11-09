const mongoose = require("mongoose");
const { Schema } = mongoose;
const gallerySchema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
    },
    subtitle: {
      type: Schema.Types.String,
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: "Portfolio",
      required: true,
    },
    category: {
      type: Schema.Types.String,
    },
  },
  { timestamps: true }
);
const Gallery = mongoose.model("Gallery", gallerySchema);
module.exports = Gallery;
