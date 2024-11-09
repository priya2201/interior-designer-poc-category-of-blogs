const mongoose = require("mongoose");
const { Schema } = mongoose;
const faqSchema = new Schema(
  {
    question: {
      type: Schema.Types.String,
      required: [true, "Question is required"],
      minlength: [5, "Question must be at least 5 characters long"],
      maxlength: [80, "Question must be at most 80 characters long"],
    },
    answer: [
      {
        type: Schema.Types.String,
        required: [true, "Answer is required"],
        minlength: [5, "Answer must be at least 5 characters long"],
        maxlength: [250, "Answer must be at most 250 characters long"],
      },
    ],
    order: {
      type: Schema.Types.Number,
      required: [true, "Order Must be a number"],
    },
  },
  { timestamps: true }
);
const FAQ = mongoose.model("FAQ", faqSchema);
module.exports = FAQ;
