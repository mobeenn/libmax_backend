import Book from "../models/book.model.js";

export const addBook = async (req, res) => {
   try {
      const { title, authors, isbn, category, publisher, publicationYear, edition, totalCopies, availableCopies, shelfLocation } = req.body;

      if (!title || !authors || !isbn || !category || !publisher || !publicationYear || !totalCopies || !availableCopies || !shelfLocation) {
         return res.status(400).json({ success: false, message: "All fields are required." });
      }

      const existingBook = await Book.findOne({ isbn });
      if (existingBook) {
         return res.status(400).json({ success: false, message: "A book with this ISBN already exists." });
      }

      const newBook = new Book({
         title,
         authors,
         isbn,
         category,
         publisher,
         publicationYear,
         edition,
         totalCopies,
         availableCopies,
         shelfLocation,
      });

      await newBook.save();
      res.json({ success: true, message: "Book added successfully." });
   } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Server error." });
   }
};

export const deleteBook = async (req, res) => {
   try {
      const { isbn } = req.params;
      const deletedBook = await Book.findOneAndDelete({ isbn });
      if (!deletedBook) {
         return res.status(404).json({ success: false, message: "Book not found." });
      }
      res.json({ success: true, message: "Book deleted successfully." });
   } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Server error." });
   }
};

export const reserveBook = async (req, res) => {
   try {
      const { bookTitle, userId } = req.body;
      const book = await Book.findOne({ title: bookTitle });
      
      if (!book) {
         return res.status(404).json({ success: false, message: "Book not found." });
      }
      if (book.availableCopies <= 0) {
         return res.status(400).json({ success: false, message: "No available copies to reserve." });
      }
      
      book.availableCopies -= 1;
      book.reservedBy = userId;
      await book.save();

      res.json({ success: true, message: "Book reserved successfully." });
   } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Server error." });
   }
};
