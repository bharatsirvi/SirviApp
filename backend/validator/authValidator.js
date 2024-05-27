import { body } from "express-validator";
import User from "../models/userModel.js";

const signup = [
  body("mobile")
    .isLength({ min: 10, max: 10 })
    .custom((value, { req }) => {
      return User.findOne({ mobile: value })
        .then((userDoc) => {
          if (userDoc) return Promise.reject("Mobile no already used");
        })
        // .catch((err) => console.log(err));
    }),
  body("password").isLength({ min: 6 }),
];

const login = [
    body("mobile").isLength({ min: 10, max: 10 }),
    body("password").isLength({ min: 6 }),
];

export default {
  signup,
  login,
};
