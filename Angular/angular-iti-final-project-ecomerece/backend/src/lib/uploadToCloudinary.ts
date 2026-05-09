import sharp from "sharp";
import cloudinary from "../config/cloudinary";

export const uploadToCloudinary = async (fileBuffer: Buffer) => {
  const processBuffer = await sharp(fileBuffer)
    .resize(1200)
    .webp({ quality: 75 })
    .toBuffer();

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "angular-ecomerece",
      },
      (error, uploadResult) => {
        if (error) {
          return reject(error);
        }
        resolve(uploadResult);
      },
    );
    uploadStream.end(processBuffer);
  });
};
