import rateLimit from "express-rate-limit"

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP
  message: "Demasiadas solicitudes, intenta más tarde.",
  standardHeaders: true,
  legacyHeaders: false,
});
