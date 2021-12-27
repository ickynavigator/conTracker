import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    resolved: { type: Boolean, default: false },
  },
  { timestamps: true },
);
const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
