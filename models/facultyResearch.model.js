import mongoose from "mongoose";

const facultyResearchSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: true,
      },
      authors: {
         type: String,
         required: true,
      },
      year: {
         type: String,
         required: true,
      },
      subject: {
         type: String,
         required: true,
      },
      callNumber: {
         type: String,
         required: true,
         unique: true,
      },
      accessionNumber: {
         type: String,
         required: true,
         unique: true,
      },
      language: {
         type: String,
         required: true,
      },
      pages: {
         type: String,
         required: true,
      },
      publisher: {
         type: String,
         required: true,
      },
      doi: {
         type: String,
         required: true,
         unique: true,
      },
      volumeIssue: {
         type: String,
         required: true,
      },
      journalName: {
         type: String,
         required: true,
      },
      paperType: {
         type: String,
         required: true,
      },
      impactFactor: {
         type: String,
         required: true,
      },
      sdg: {
         type: String,
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

const FacultyResearch = mongoose.model(
   "FacultyResearch",
   facultyResearchSchema
);
export default FacultyResearch;
