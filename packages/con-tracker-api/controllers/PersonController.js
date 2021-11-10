import asyncHandler from "express-async-handler";
import Person from "../models/PersonModel.js";

// @desc   fetch all products
// @route  GET /api/products
// @access Public
export const getPersons = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const myFilter = req.query.filter;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  let persons;
  switch (myFilter) {
    case "newest":
      persons = await Person.find({ ...keyword })
        .sort([["_id", -1]])
        .limit(pageSize)
        .skip(pageSize * (page - 1));
      break;
    case "priceLH":
      persons = await Person.find({ ...keyword })
        .sort({ price: 1 })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
      break;
    case "priceHL":
      persons = await Person.find({ ...keyword })
        .sort({ price: -1 })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
      break;
    case "featured":
    default:
      persons = await Person.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
      break;
  }

  const count = await Person.countDocuments({ ...keyword });
  res.json({ persons, page, pages: Math.ceil(count / pageSize) });
});

// @desc   fetch single products
// @route  GET /api/products/:id
// @access Public
export const getPersonById = asyncHandler(async (req, res) => {
  const person = await Person.findById(req.params.id);

  if (person) {
    res.json(person);
  } else {
    res.status(404);
    throw new Error("Person Not Found");
  }
});

// @desc   Delete a product
// @route  DELETE /api/products/:id
// @access Private/Admin
export const deletePerson = asyncHandler(async (req, res) => {
  const person = await Person.findById(req.params.id);

  if (person) {
    await person.remove();
    res.json({ message: "Person Removed" });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

// @desc   Create a product
// @route  POST /api/products
// @access Private/Admin
export const createPerson = asyncHandler(async (req, res) => {
  const person = new Person({
    nameFirst: "John",
    nameLast: "Doe",
    nameOthers: "",
    description: "",
    dob: new Date(),
    residencePermitValidation: false,
    sex: "other",
    race: "",
  });

  const createdPerson = await person.save();
  res.status(201).json(createdPerson);
});

// @desc   Update a product
// @route  PUT /api/products/:id
// @access Private/Admin
export const updatePerson = asyncHandler(async (req, res) => {
  const {
    nameFirst,
    nameLast,
    nameOthers,
    description,
    dob,
    residencePermitValidation: rpv,
    sex,
    race,
  } = req.body;

  const person = await Person.findById(req.params.id);

  if (person) {
    person.nameFirst = nameFirst || person.nameFirst;
    person.nameLast = nameLast || person.nameLast;
    person.nameOthers = nameOthers || person.nameOthers;
    person.description = description || person.description;
    person.dob = dob || person.dob;
    person.residencePermitValidation = rpv || person.residencePermitValidation;
    person.sex = sex || person.sex;
    person.race = race || person.race;

    const updatedPerson = await person.save();
    res.json(updatedPerson);
  } else {
    res.status(404);
    throw new Error("Person not Found");
  }
});

// @desc   Get Top Rated Product
// @route  GET /api/products/top
// @access Public
export const getTopPersons = asyncHandler(async (req, res) => {
  const persons = await Person.find({}).sort({ wanted: -1 }).limit(10);

  res.json(persons);
});
