import { logger } from '@config/logger.js';
import { CustomError } from '@core/erorrs.js';
import type { NextFunction, Request, Response } from 'express';

export const globalErrorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Verificamos si el error es una instancia de nuestra clase
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message
    });
  }

  // Si es un error desconocido (ej. base de datos caída)
  logger.error("Error no controlado:", err);
  return res.status(500).json({
    status: 'error',
    message: 'Algo salió muy mal en el servidor'
  });
};
