import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


const uploadOnCloudinary = async (localFilePath) => {
   cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
   });
   // Configuration
   console.log("ENV variables", process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRET);

   try {
      if (!localFilePath) return null;

      //upload file on cloudinary
      const response = await cloudinary.uploader.upload(localFilePath, {
         resource_type: "auto",
      });
      //file has been uploaded successfully
      console.log("file uploaded on cloudinary", response.url);
      // agr yeah line nahi lihky gy to jo files upload ho gi woh public/temp mey bhi save ho jye gi us cheez sey bachny ky leye yeah line use kary gy
      //fs.unlinkSync(localFilePath);
      return response;
   } catch (error) {
      console.log("Error uploading file to Cloudinary:", error);
      //remove the locally saved temporary file as the upload operation got rejected
      fs.lutimesSync(localFilePath);
      return null;
   }
};

// Function to upload image to Cloudinary

// cloudinary.uploader.upload('https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',
//    {public_id: 'shoes'}
//    function(error,result) {console.log(result);});

export { uploadOnCloudinary };