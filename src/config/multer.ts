import multer from "multer"

// Configuración de multer
export const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/jpg", "image/webp"]

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(
        new Error(
          "Tipo de archivo no permitido. Solo se permiten imágenes JPEG, PNG, JPG y WebP",
        ),
      )
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})
