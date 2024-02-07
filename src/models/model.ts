import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please Enter username"],
  },
  email: {
    type: String,
    required: [true, "please enter email"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerfied: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpriy: Date,
  verifyToken: String,
  VerifyTokenExpiry: Date,
});
const User = mongoose.model("user", userSchema);

export default User;
