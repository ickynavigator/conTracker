import dotenv from "dotenv";
import "colors";

import { connectMONGO } from "./conn.js";

// Data
import people from "./dummydata/people.js";
import Person from "../models/PersonModel.js";
import Admin from "../models/AdminModel.js";

dotenv.config();
await connectMONGO();

const admin = {
  name: "Dummy Admin",
  email: "con@tracker.com",
  password: process.env.ADMIN_PASSWORD,
};

const importData = async () => {
  try {
    await Person.deleteMany();
    await Admin.deleteMany();

    await Person.insertMany(people);
    await Admin.insertMany(admin);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Person.deleteMany();
    await Admin.deleteMany();
    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
