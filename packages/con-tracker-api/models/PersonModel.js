import mongoose from "mongoose";

const personSchema = mongoose.Schema(
  {
    nameFirst: { type: String, required: true },
    nameLast: { type: String, required: true },
    nameOthers: { type: String },
    description: { type: String, required: true },
    toShow: { type: Boolean, default: true },
    dob: { type: String },
    // info
    residencePermitValidation: { type: Boolean, default: false },
    sex: { type: String },
    race: { type: String },
  },
  { timestamps: true },
);
const Person = mongoose.model("Person", personSchema);

export default Person;
