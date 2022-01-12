import mongoose from "mongoose";

const complaintFormSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    phone: { type: String, required: true },
    description: { type: String, required: true },
    resolved: { type: Boolean, default: false },
  },
  { timestamps: true },
);
const missingFormSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    dob: { type: String, required: true },
    location: { type: String, required: true },
    height: { type: String, required: true },
    weight: { type: String, required: true },
    eyeColor: { type: String, required: true },
    hairColor: { type: String, required: true },
    race: { type: String, required: true },
    gender: { type: String, required: true },
    picture: { type: mongoose.Schema.Types.Array },
    resolved: { type: Boolean, default: false },
  },
  { timestamps: true },
);
const crimeFormSchema = mongoose.Schema(
  {
    contactAddress: { type: String, required: true },
    contactName: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },

    crimeAddress: { type: String, required: true },
    crimeAddress2: { type: String, required: true },
    crimeCity: { type: String, required: true },
    crimeZip: { type: String, required: true },
    crimeDesc: { type: String, required: true },
    crimeType: { type: String, required: true },
  },
  { timestamps: true },
);

export const ComplaintForm = mongoose.model(
  "ComplaintForm",
  complaintFormSchema,
);
export const MissingForm = mongoose.model("MissingForm", missingFormSchema);
export const CrimeForm = mongoose.model("CrimeForm", crimeFormSchema);

export default {
  ComplaintForm,
  MissingForm,
  CrimeForm,
};
