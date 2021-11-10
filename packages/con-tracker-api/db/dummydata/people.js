import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const generatorUrl =
  "https://api.json-generator.com/templates/rkE-9B_IIOzq/data";

const generatorOptions = {
  method: "GET",
  headers: { Authorization: `Bearer ${process.env.JSON_GENERATOR_API_KEY}` },
};

const people = await fetch(generatorUrl, generatorOptions)
  .then(res => res.json())
  .then(json => json);

export default people;
