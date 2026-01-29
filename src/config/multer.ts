import multer from "multer"

// Configuración de multer
export const upload = multer({
     storage: multer.memoryStorage(),
     fileFilter: (req, file, cb) => {
          const allowedMimes = ["image/jpeg", "image/png", "image/jpg", "image/webp"]

          req.body.img = file.fieldname

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
