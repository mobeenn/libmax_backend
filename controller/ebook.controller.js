import EBook from "../models/ebook.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Post API for Add E-Book
export const addEBook = async (req, res) => {
   try {
      console.log("🚀 ~ addEBook ~ req.file:", req.file); // Log the file information
      const { title, authors, category } = req.body;
      if (!title || !authors || !category || !req.file) {
         return res.status(400).json({
            success: false,

            message: "All fields are required, including a PDF file",
         });
      }

      const localFilePath = req.file.path;

      const uploadedFile = await uploadOnCloudinary(localFilePath);
      console.log("🚀 ~ addEBook ~ uploadedFile:", uploadedFile); // Log the uploaded file information
      if (!uploadedFile || !uploadedFile.url) {
         return res.status(500).json({
            success: false,
            message: "Failed to upload PDF file",
         });
      }

      const newEBook = new EBook({
         title,
         authors,
         category,
         pdfUrl: uploadedFile.url,
      });

      const ebook = await newEBook.save();
      console.log("🚀 ~ addEBook ~ ebook:", ebook); // Log the saved eBook information

      res.status(201).json({
         success: true,
         message: "E-Book added successfully",
         eBook: newEBook,
      });
   } catch (error) {
      console.error("Error adding eBook:", error);
      res.status(500).json({
         success: false,
         message: "Server error",
      });
   }
};
// Get API for E-Book
export const getAllEBooks = async (req, res) => {
   try {
      const ebooks = await EBook.find().sort({ created: -1 });
      console.log("🚀 ~ getAllEBooks ~ ebooks:", ebooks);
      res.status(200).json({
         success: true,
         message: ebooks,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Failed to Fetch",
         error: error.message,
      });
   }
};
