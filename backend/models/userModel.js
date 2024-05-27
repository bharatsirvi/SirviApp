import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    // required: true,
  },
  father_name: {
    type: String,
    // required: true,
  },
  dob: {
    type: Date,
    // required: true,
  },
  gender: {
    type: String,
    // required: true,
    enum: ["male", "female"],
  },
  mobile: {
    type: String,
    minLength: [10, "no should have minimum 10 digits"],
    maxLength: [10, "no should have maximum 10 digits"],
    match: [/\d{10}/, "no should only have digits"],
    required: true,
  },
  email: {
    type: String,
    // trim: true,
    // lowercase: true,
    // unique: [true,"email alreay exits"],
    // required: true,
    // validate: {
    //   validator: function (v) {
    //     return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
    //   },
    //   message: "Please enter a valid email",
    // },
  },
  profile_pic: {
    type: Buffer,
    // required: true,
  },
  vilage: String,
  gotra_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gotra",
    // required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "password should have minimum 8 characters"],
  },
});

export default mongoose.model("User", UserSchema);
