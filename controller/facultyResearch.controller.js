import FacultyResearch from "../models/facultyResearch.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const researchPaper = async (req, res) => {
   try {
      console.log("🚀 ~ add research paper ~ req.file:", req.file);

      const {
         title,
         authors,
         year,
         subject,
         callNumber,
         accessionNumber,
         language,
         pages,
         publisher,
         doi,
         volumeIssue,
         journalName,
         paperType,
         impactFactor,
         sdg,
         category,
      } = req.body;

      if (
         !title ||
         !authors ||
         !year ||
         !subject ||
         !callNumber ||
         !accessionNumber ||
         !language ||
         !pages ||
         !publisher ||
         !doi ||
         !volumeIssue ||
         !journalName ||
         !paperType ||
         !impactFactor ||
         !sdg ||
         !category ||
         !req.file
      ) {
         return res.status(400).json({
            success: false,
            message: "All fields are required, including a PDF file",
         });
      }

      // 🔍 Check if DOI already exists
      const existingDoi = await FacultyResearch.findOne({ doi });
      if (existingDoi) {
         return res.status(400).json({
            success: false,
            message: "DOI already exists for another research paper",
         });
      }

      // 🔍 Check if Accession Number already exists
      const existingAccession = await FacultyResearch.findOne({
         accessionNumber,
      });
      if (existingAccession) {
         return res.status(400).json({
            success: false,
            message:
               "Accession Number already exists for another research paper",
         });
      }

      // 🔍 Check if Call Number already exists
      const existingCall = await FacultyResearch.findOne({ callNumber });
      if (existingCall) {
         return res.status(400).json({
            success: false,
            message: "Call Number already exists for another research paper",
         });
      }

      // 📤 Upload file to Cloudinary
      const localFilePath = req.file.path;
      const uploadedFile = await uploadOnCloudinary(localFilePath);

      if (!uploadedFile || !uploadedFile.url) {
         return res.status(500).json({
            success: false,
            message: "Failed to upload PDF file",
         });
      }

      // 💾 Save the research paper
      const researchPaper = new FacultyResearch({
         title,
         authors,
         year,
         subject,
         callNumber,
         accessionNumber,
         language,
         pages,
         publisher,
         doi,
         volumeIssue,
         journalName,
         paperType,
         impactFactor,
         sdg,
         category,
         pdfUrl: uploadedFile.url,
      });

      const paper = await researchPaper.save();

      return res.status(201).json({
         success: true,
         message: "Research paper uploaded successfully",
         data: paper,
      });
   } catch (error) {
      console.error("❌ Error adding research paper:", error);
      return res.status(500).json({
         success: false,
         message: "Something went wrong while uploading the research paper",
      });
   }
};

export const getResearchPapers = async (req, res) => {
   try {
      const papers = await FacultyResearch.find().select(
         "title authors pdfUrl sdg category subject volumeIssue"
      );

      console.log("🚀 ~ getResearchPapers ~ papers:", papers);

      res.status(200).json({
         success: true,
         data: papers,
      });
   } catch (err) {
      console.log("Error:", err.message);
      res.status(500).json({
         success: false,
         message: "Server error while getting research papers",
      });
   }
};
