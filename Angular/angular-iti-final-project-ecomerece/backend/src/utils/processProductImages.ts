import { uploadToCloudinary } from "../lib/uploadToCloudinary";

export const handleImageUpload = async (req: any, fieldName: string) => {
  const files = req.files;
  if (!files) return;

  if (files[fieldName] && files[fieldName][0]) {
    const result: any = await uploadToCloudinary(files[fieldName][0].buffer);
    req.body[fieldName] = result.secure_url;
  }

  if (files?.images?.length) {
    const imageUrls = await Promise.all(
      files.images.map(async (file: any) => {
        const result: any = await uploadToCloudinary(file.buffer);
        return result.secure_url;
      }),
    );
    req.body.images = imageUrls;
  }
};
