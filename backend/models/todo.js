const mongoose = require("mongoose");
const { Schema } = mongoose;
const todoSchema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: [true, "Title is required"],
    },
    description: {
      type: Schema.Types.String,
      required: [true, "Description is required"],
    },
    file: {
      type: Schema.Types.String,
      required: [true, "Upload a file  is required"],
    },
    todoStatus: {
      type: Schema.Types.String,
      enum: ["Completed", "Pending"],
      default: "Pending",
    },
    status: {
      type: Schema.Types.String,
      enum: ["Approved", "Rejected"],
      default: "Rejected",
    },
  },
  { timestamps: true }
);
const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
