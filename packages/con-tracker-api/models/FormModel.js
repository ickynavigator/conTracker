import mongoose from "mongoose";

const formSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    picture: { type: mongoose.Schema.Types.Array },
    relatedCriminals: { type: mongoose.Schema.Types.Array },
    resolved: { type: Boolean, default: false },
    byAdmin: { type: Boolean },
  },
  { timestamps: true },
);
const Form = mongoose.model("Form", formSchema);

export default Form;
