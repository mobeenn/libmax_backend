import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
   const { userName, email, password } = req.body;

   // Check if all fields are provided
   if (!userName || !email || !password) {
      console.log("🚀 ~ signup ~ userName:", userName);
      return res.status(400).json({
         success: false,
         message: "All fields are required",
      });
   }

   try {
      // ✅ Check if user already exists by email only
      let existingUser = await User.findOne({ email });
      if (existingUser) {
         return res.status(400).json({
            success: false,
            message: "Email already exists",
         });
      }

      // Hash password
      const hashedPassword = bcryptjs.hashSync(password, 10);

      // Create new user
      const newUser = new User({
         userName,
         email,
         password: hashedPassword,
      });

      console.log("🚀 ~ signup ~ newUser:", newUser);
      await newUser.save();

      res.json({
         success: true,
         message: "User registered successfully",
      });
   } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
         success: false,
         message: "Server error",
      });
   }
};

export const login = async (req, res) => {
   const { email, password } = req.body;

   // ✅ Check if all fields are provided
   if (!email || !password) {
      return res.status(400).json({
         success: false,
         message: "Email and password are required",
      });
   }

   try {
      // ✅ Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({
            success: false,
            message: "Invalid email or password",
         });
      }

      // ✅ Compare password
      const isPasswordValid = bcryptjs.compareSync(password, user.password);
      if (!isPasswordValid) {
         return res.status(400).json({
            success: false,
            message: "Invalid email or password",
         });
      }

      res.json({
         success: true,
         message: "Login successful",
         user: {
            id: user._id,
            userName: user.userName,
            email: user.email,
         },
      });
   } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
         success: false,
         message: "Server error",
      });
   }
};

export const logout = async (req, res) => {
   try {
      res.json({
         success: true,
         message: "Logout successful",
      });
   } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
         success: false,
         message: "Server error",
      });
   }
};


