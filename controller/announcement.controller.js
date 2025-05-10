import Announcement from "../models/announcement.model.js";

export const createAnnouncement = async (req, res) => {
   const { title, description } = req.body;

   if (!title || !description) {
      return res.status(400).json({
         success: false,
         message: "All fields are required",
      });
   }

   try {
      const newAnnouncement = new Announcement({ title, description });
      await newAnnouncement.save();
      res.status(201).json({
         success: true,
         message: "Announcement created successfully",
         announcement: newAnnouncement,
      });
   } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Server error" });
   }
};

export const getAllAnnouncements = async (req, res) => {
   try {
      const announcements = await Announcement.find().sort({ createdAt: -1 });
      res.json({ success: true, announcements });
   } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Server error" });
   }
};

export const deleteAnnouncement = async (req, res) => {
   const { id } = req.params;
   try {
      const deletedAnnouncement = await Announcement.findByIdAndDelete(id);
      if (!deletedAnnouncement) {
         return res.status(404).json({ success: false, message: "Announcement not found" });
      }
      res.json({ success: true, message: "Announcement deleted successfully" });
   } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Server error" });
   }
};
