const mongoose = require("mongoose");
const { Schema } = mongoose;
const testimonialSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
    },
    city: {
      type: Schema.Types.String,
    },
    image: {
      type: Schema.Types.String,
    },
  },
  { timestamps: true }
);
const Testimonial = mongoose.model("Testimonial", testimonialSchema);
module.exports = Testimonial;
