import { v2 as cloudinary } from "cloudinary";

export const deleteImage = async (publicId: string) => {
  await cloudinary.uploader.destroy(publicId);
};
