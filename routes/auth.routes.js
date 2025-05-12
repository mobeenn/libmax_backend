import express from "express";
import { login, logout, signup } from "../controller/auth.controller.js";
import {
   addEBook,
   delEBook,
   getAllEBooks,
} from "../controller/ebook.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import {
   createAnnouncement,
   deleteAnnouncement,
   getAllAnnouncements,
} from "../controller/announcement.controller.js";
import {
   delPaper,
   getResearchPapers,
   researchPaper,
} from "../controller/facultyResearch.controller.js";
import {
   addBook,
   deleteBook,
   getBooks,
   reserveBook,
   searchBooks,
} from "../controller/book.controller.js";
const router = express.Router();

// user authentication and authorization
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Announcement Routes
router.post("/announcement", createAnnouncement);
router.get("/show-announcement", getAllAnnouncements);
router.delete("/del-announcement/:id", deleteAnnouncement);

// Add Books Routes
router.post("/add-book", addBook);
<<<<<<< HEAD
router.get("/get-books", getBooks);
=======
//router.delete("/deleteBook/:isbn", deleteBook);
>>>>>>> b38980bcd2ad556e7e12cd9c8f70169e2fe685e8
router.post("/reserve-book", reserveBook);
router.get("/search-books", searchBooks);
router.delete("/del-book/:id", deleteBook);

// Research Paper Routes
router.post("/research-paper", upload.single("pdf"), researchPaper);
router.get("/get-research-papers", getResearchPapers);
router.delete("/del-paper/:paperId", delPaper);

// E-Book Routes
router.post("/ebook", upload.single("pdf"), addEBook);
router.get("/get-all-e-books", getAllEBooks);
router.delete("/del-ebook/:id", delEBook);

export default router;
