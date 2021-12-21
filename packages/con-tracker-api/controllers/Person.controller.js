import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import { updateIfNotEmpty } from "../lib/helper.js";
import Person from "../models/PersonModel.js";

/**
 * @desc   Fetch all criminals
 * @route  GET /api/person
 * @access Public
 */
export const getPersons = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 10;
  const page = Number(req.query.pageNumber) || 1;
  const myFilter = req.query.filter;
  const param = req.query.param || "";
  const regOptions = "gim";
  let keyword = {};

  if (req.query.keyword) {
    const specificQuery = {};
    if (req.query.param)
      specificQuery[param] = {
        $regex: req.query.keyword,
        $options: regOptions,
      };

    keyword = {
      nameFirst: { $regex: req.query.keyword, $options: regOptions },
      nameLast: { $regex: req.query.keyword, $options: regOptions },
      ...specificQuery,
    };

    // {
    //   $and: [
    //     { $or: [{ title: regex }, { description: regex }] },
    //     { category: value.category },
    //     { city: value.city },
    //   ];
    // }
  }

  console.log(keyword);

  let persons;
  switch (myFilter) {
    case "newest":
      persons = await Person.find({ ...keyword })
        .sort([["_id", -1]])
        .limit(pageSize)
        .skip(pageSize * (page - 1));
      break;
    case "oldest":
      persons = await Person.find({ ...keyword })
        .sort([["_id", 1]])
        .limit(pageSize)
        .skip(pageSize * (page - 1));
      break;
    default:
      persons = await Person.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
      break;
  }

  const count = await Person.countDocuments({ ...keyword });
  res.json({ persons, page, pages: Math.ceil(count / pageSize) });
});

/**
 * @desc   Fetch single criminal by id
 * @route  GET /api/person/:id
 * @access Public
 */
export const getPersonById = asyncHandler(async (req, res) => {
  try {
    validationResult(req).throw();

    const person = await Person.findById(req.params.id);

    return res.status(200).json(person);
  } catch (err) {
    return res.status(404).json({ message: "Person Not Found", err });
  }
});

/**
 * @desc   Delete a criminal
 * @route  DELETE /api/person/:id
 * @access Private/Admin
 */
export const deletePerson = asyncHandler(async (req, res) => {
  try {
    validationResult(req).throw();

    const person = await Person.findById(req.params.id);
    await person.remove();

    return res.status(200).json({ message: "Person Removed" });
  } catch (err) {
    return res.status(404).json({ message: "Person Not Found", err });
  }
});

/**
 * @desc   Add a criminal to DB
 * @route  POST /api/person
 * @access Private/Admin
 */
export const createPerson = asyncHandler(async (req, res) => {
  try {
    validationResult(req).throw();

    const {
      nameFirst,
      nameLast,
      nameOthers,
      description,
      dob,
      residencePermitValidation,
      sex,
      race,
    } = req.body;

    const person = new Person({
      nameFirst: nameFirst.trim(),
      nameLast: nameLast.trim(),
      nameOthers: nameOthers.trim(),
      description: description.trim(),
      dob: dob ? new Date(dob).toUTCString() : "",
      residencePermitValidation,
      sex: sex || "other",
      race: race.trim() || "",
    });

    const createdPerson = await person.save();
    return res.status(204).json(createdPerson);
  } catch (err) {
    return res.status(404).json({ err });
  }
});

/**
 * @desc   Update a criminal info
 * @route  PUT /api/person/:id
 * @access Private/Admin
 */
export const updatePerson = asyncHandler(async (req, res) => {
  try {
    validationResult(req).throw();

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
      updateIfNotEmpty(person, [
        { key: "nameFirst", value: nameFirst },
        { key: "nameLast", value: nameLast },
        { key: "nameOthers", value: nameOthers },
        { key: "description", value: description },
        { key: "dob", value: dob },
        { key: "residencePermitValidation", value: rpv },
        { key: "sex", value: sex },
        { key: "race", value: race },
      ]);

      const updatedPerson = await person.save();
      return res.status(204).json(updatedPerson);
    }
    return res.status(404).json({ message: "Criminal not Found" });
  } catch (err) {
    return res.status(400).json(err);
  }
});

// @desc   Get most wanted criminals
// @route  GET /api/person/wanted
// @access Public
export const getTopPersons = asyncHandler(async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 10;
    const page = Number(req.query.pageNumber) || 1;

    const persons = await Person.find({ wanted: true })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    const count = await Person.countDocuments({ wanted: true });
    return res
      .status(200)
      .json({ persons, page, pages: Math.ceil(count / pageSize) });
  } catch (err) {
    return res.status(400).json({ err });
  }
});
