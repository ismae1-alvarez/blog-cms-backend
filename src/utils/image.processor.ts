import sharp from "sharp"
import cloudinary from "../config/cloudinaryConfig.js"

export async function uploadImage(
  file: Express.Multer.File,
  options?: {
    folder?: string
    publicId?: string
  },
): Promise<{ url: string; public_id: string }> {
  const buffer = await sharp(file.buffer)
    .resize({
      width: 800,
      height: 800,
      fit: "inside",
      withoutEnlargement: true,
    })
    .png()
    .toBuffer()

  const base64 = `data:image/png;base64,${buffer.toString("base64")}`

  const result = await cloudinary.uploader.upload(base64, {
    folder: options?.folder ?? "users",
    public_id: options?.publicId,
    resource_type: "image",
  })

  return {
    url: result.secure_url,
    public_id: result.public_id
  }
}
