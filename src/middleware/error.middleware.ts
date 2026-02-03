import type { NextFunction, Request, Response } from 'express';
import { CustomError } from '@domain/erorrs.js';

export const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Verificamos si el error es una instancia de nuestra clase
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  // Si es un error desconocido (ej. base de datos caída)
  console.error("Error no controlado:", err);
  return res.status(500).json({
    status: 'error',
    message: 'Algo salió muy mal en el servidor'
  });
};
