import Student from "../models/studentModel.js";
import Gotra from "../models/gotraModel.js";
import { throwError } from "../util/error.js";

const getAllStudents = async (req, res, next) => {
  const {
    name,
    study_place,
    gender,
    medium,
    study_level,
    curr_class,
    college_year,
    study_type,
    gotra,
  } = req.query;
  const filterQuery = {};
  try {
    if (name) {
      filterQuery.name = { $regex: `^${name}`, $options: "i" };
      console.log(filterQuery.name);
    }
    if (study_place) {
      filterQuery.study_place = { $regex: `^${study_place}`, $options: "i" };
      console.log(filterQuery.study_place);
    }
    if (gender) {
      filterQuery.gender = gender;
    }
    if (medium) {
      filterQuery.medium = medium;
    }
    if (study_level) {
      filterQuery.study_level = study_level;
      if (study_level === "college") {
        if (college_year) {
          filterQuery.college_year = college_year;
        }
      }
     else if (study_level === "school") {
          if (curr_class) {
            filterQuery.curr_class = curr_class;
          }
     }
    }
      if (study_type) {
        filterQuery.study_type = study_type;
      }
      if (gotra) {
        const studentGotra = await Gotra.find({ name: gotra });
        if (studentGotra.length === 0) {
          return res.status(404).json({ error: "No student found" });
        }
        filterQuery.gotra_id = studentGotra[0]._id;
      }
      const students = await Student.find(filterQuery);
      if (!students) {
        return res.status(404).json({ error: "No students found" });
      }
      res.status(201).json(students);
    }
    catch (error) {
    throwError(next, error);
  }
};

const getStudentById = async(req, res,next) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findById(studentId);
        if (!student) {
          return res.status(404).json({ error: "Student not found" });
        }
        res.status(200).json(student);
      } catch (error) {
        throwError(next, error);
      }
};

const createStudent = async(req, res,next) => {
    try {
        const newStudent = new Student(req.body);
        if (!newStudent) return res.status(404).json({ error: "Student not created" });
        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
      } catch (error) {
        throwError(next, error);
      }
};

const updateStudent = async(req, res,next) => {
    try {
        const studentId = req.params.id;
        const studentExits = await Student.findById(studentId);
        if (!studentExits) {
          return res.status(404).json({ error: error.message });
        }
        const updatedStudent = await Student.findByIdAndUpdate(studentId, req.body, {
          new: true,
        });
        res.status(200).json(updatedStudent);
      } catch (error) {
        throwError(next, error);
      }
};

const deleteStudent = async(req, res,next) => {
    try {
        const studentId = req.params.id;
        const studentExits = await Student.findById(studentId);
        if (!studentExits) {
          return res.status(404).json({ error: "Student not Exist" });
        }
        await Student.findByIdAndDelete(studentId);
        res.status(200).json({ message: "Student deleted" });
      } catch (error) {
        throwError(next, error);
      }
};

export default {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
