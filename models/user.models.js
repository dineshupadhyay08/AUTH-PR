import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    // ✅ correct field name
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
