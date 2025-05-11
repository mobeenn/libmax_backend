import express from "express";
import { login, logout, signup } from "../controller/auth.controller.js";
import { addEBook, getAllEBooks } from "../controller/ebook.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import {
   createAnnouncement,
   deleteAnnouncement,
   getAllAnnouncements,
} from "../controller/announcement.controller.js";
import { researchPaper } from "../controller/facultyResearch.controller.js";
import { addBook, deleteBook, reserveBook } from "../controller/book.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Announcement Routes
router.post("/announcement", createAnnouncement);
router.get("/show-announcement", getAllAnnouncements);
router.delete("/del-announcement/:id", deleteAnnouncement);

// Add Books Routes
router.post("/add-book", addBook);
router.delete("/deleteBook/:isbn", deleteBook);
router.post("/reserve-book", reserveBook);

// Research Paper Routes
router.post("/research-paper", upload.single("pdf"), researchPaper);

// E-Book Routes
router.post("/ebook", upload.single("pdf"), addEBook);
router.get("/get-all-e-books", getAllEBooks);

export default router;
