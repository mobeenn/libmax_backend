import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
   {
      title: { type: String, required: true },
      authors: { type: String, required: true },
      isbn: { type: String, required: true, unique: true },
      category: { type: String, required: true },
      publisher: { type: String, required: true },
      publicationYear: { type: String, required: true },
      edition: { type: String },
      totalCopies: { type: Number, required: true, min: 1 },
      availableCopies: { type: Number, required: true, min: 0 },
      shelfLocation: { type: String, required: true },
      reservedBy: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         default: null,
      },
   },
   { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
