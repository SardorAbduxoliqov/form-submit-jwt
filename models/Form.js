const mongoose = require("mongoose");
const FormSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    course: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Form", FormSchema);
