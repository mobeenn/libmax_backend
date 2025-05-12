import Book from "../models/book.model.js";
import User from "../models/user.model.js";

// add book
export const addBook = async (req, res) => {
   try {
      const {
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
      } = req.body;

      if (
         !title ||
         !authors ||
         !isbn ||
         !category ||
         !publisher ||
         !publicationYear ||
         !totalCopies ||
         !availableCopies ||
         !shelfLocation
      ) {
         return res
            .status(400)
            .json({ success: false, message: "All fields are required." });
      }

      const existingBook = await Book.findOne({ isbn });
      if (existingBook) {
         return res.status(400).json({
            success: false,
            message: "A book with this ISBN already exists.",
         });
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

// del book
export const deleteBook = async (req, res) => {
   try {
      const { bookId } = req.params;
      const deletedBook = await Book.findOneAndDelete({ bookId });
      if (!deletedBook) {
         return res
            .status(404)
            .json({ success: false, message: "Book not found." });
      }
      res.json({ success: true, message: "Book deleted successfully." });
   } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Server error." });
   }
};

// export const reserveBook = async (req, res) => {
//    try {
//       const { bookTitle, userId } = req.body;
//       const book = await Book.findOne({ title: bookTitle });

//       if (!book) {
//          return res.status(404).json({ success: false, message: "Book not found." });
//       }
//       if (book.availableCopies <= 0) {
//          return res.status(400).json({ success: false, message: "No available copies to reserve." });
//       }

//       book.availableCopies -= 1;
//       book.reservedBy = userId;
//       await book.save();

//       res.json({ success: true, message: "Book reserved successfully." });
//    } catch (error) {
//       console.error("Error:", error);
//       res.status(500).json({ success: false, message: "Server error." });
//    }
// };

// reserve book and notification
export const reserveBook = async (req, res) => {
   try {
      const { bookTitle, userId } = req.body;

      const book = await Book.findOne({ title: bookTitle });
      if (!book) {
         return res
            .status(404)
            .json({ success: false, message: "Book not found." });
      }

      if (book.availableCopies <= 0) {
         return res.status(400).json({
            success: false,
            message: "No available copies to reserve.",
         });
      }

      const user = await User.findById(userId);
      if (!user) {
         return res
            .status(404)
            .json({ success: false, message: "User not found." });
      }

      book.availableCopies -= 1;
      book.reservedBy = userId;
      await book.save();

      const notificationMessage = `${user.email} has reserved the book "${book.title}".`;

      console.log(
         "🚀 ~ reserveBook ~ notificationMessage:",
         notificationMessage
      );
      res.json({
         success: true,
         message: "Book reserved successfully.",
         notifyAdmin: notificationMessage,
      });
   } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Server error." });
   }
};

// // Search books API (GET request)
export const searchBooks = async (req, res) => {
   try {
      const { query } = req.query;

      if (!query) {
         return res
            .status(400)
            .json({ success: false, message: "Search query is required." });
      }

      // Searching books by title, authors, or category
      const books = await Book.find({
         $or: [
            { title: { $regex: query, $options: "i" } },
            { authors: { $regex: query, $options: "i" } },
            { category: { $regex: query, $options: "i" } },
         ],
      });
      console.log("🚀 ~ searchBooks ~ books:", books);

      if (books.length === 0) {
         return res
            .status(404)
            .json({ success: false, message: "No books found." });
      }

      res.json({ success: true, books });
   } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Server error." });
   }
};

// get all books
export const getBooks = async (req, res) => {
   try {
      const books = await Book.find().select("title authors isbn");
      console.log("🚀 ~ getBooks ~ books:", books);
      res.status(200).json({
         success: true,
         message: books,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Failed to Fetch",
         error: error.message,
      });
   }
};
