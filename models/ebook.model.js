import mongoose from "mongoose";

const ebookSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: true,
      },
      authors: {
         type: [String],
         required: true,
      },
      category: {
         type: String,
         required: true,
      },
      pdfUrl: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

const EBook = mongoose.model("EBook", ebookSchema);
export default EBook;
