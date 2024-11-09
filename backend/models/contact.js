const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      minlength: [3, "First Name must be at least 3 characters long"],
      maxlength: [25, "First Name must be at most 25 characters long"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      minlength: [3, "Last Name must be at least 3 characters long"],
      maxlength: [25, "Last Name must be at most 25 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Please enter a valid email address",
      },
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      minlength: [3, "Subject must be at least 3 characters long"],
      maxlength: [30, "Subject must be at most 30 characters long"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      minlength: [5, "Message must be at least 5 characters long"],
      maxlength: [80, "Message must be at most 80 characters long"],
    },
    phoneno: {
      type: String,
      required: [true, "Phone number is required"],
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
// validate: {
//   validator: function (v) {
//     const phoneNumber = parsePhoneNumberFromString(v);
//     return phoneNumber && phoneNumber.isValid();
//   },
//   message: "Please enter a valid phone number",
// },
