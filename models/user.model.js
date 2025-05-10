import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
   {
      userName: {
         type: String,
         required: true,
         unique: false, // ✅ userName ko unique mat banaye
      },
      email: {
         type: String,
         required: true,
         unique: true, // ✅ Email unique rahega
      },
      password: {
         type: String,
         required: true,
         minlength: 8,
      },
   },
   { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
