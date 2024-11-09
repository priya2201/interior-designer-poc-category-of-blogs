const mongoose = require("mongoose");
const { Schema } = mongoose;
const loginSchema = new Schema(
  {
    email: {
      type: Schema.Types.String,
      required: true,
    },
    password: {
      type: Schema.Types.String,
    },
  },
  { timestamps: true }
);
const Login = mongoose.model("Login", loginSchema);
module.exports = Login;
