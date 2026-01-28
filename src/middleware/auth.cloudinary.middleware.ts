import { v2 as cloudinary } from "cloudinary"
import type { NextFunction, Request, Response } from "express"
import sharp from "sharp"

// Middleware para subir a Cloudinary
export const uploadToCloudinary = async (req: Request, _res: Response, next: NextFunction) => {
  if (!req.file) {
    console.log("No hay archivo, asignando valor por defecto...")
    req.body.img = req.body.img || ""
    return next()
  }

  try {
    // 1. Procesar imagen con sharp
    const processedBuffer = await sharp(req.file.buffer)
      .resize({
        width: 800,
        height: 800,
        fit: "inside",
        withoutEnlargement: true,
      })

      .toBuffer()

    // 2. Convertir a base64 para Cloudinary
    const base64Image = `data:image/png;base64,${processedBuffer.toString("base64")}`

    // 3. Usar UPLOAD() en lugar de upload_stream
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "users",
      public_id: `user_${Date.now()}`,
      resource_type: "image",
      overwrite: false,
    })

    req.body.img = result.secure_url

    next()
  } catch (error: any) {
    console.error("❌ Error en uploadToCloudinary:", error.message)

    req.body.img = ""

    next()
  }
}

export default cloudinary
