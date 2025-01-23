import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Perfil } from '../entities/Perfil';

interface CustomJwtPayload {
  uid: string;
}

export const validarJWT = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const token = req.header('x-token');
    if (!token) {
      return res.status(401).json({
        status: 401,
        error: 'TOKEN_INVALID',
        message: 'No hay token en la petición.',
      });
    }

    if (!process.env.SECRETORPRIVATEKEY) {
      throw new Error('El SECRETORPRIVATEKEY no está definido en las variables de entorno.');
    }

    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY) as CustomJwtPayload;

    const perfil = await Perfil.findOne({ where: { id: uid } });

    if (!perfil || !perfil.active) {
      return res.status(401).json({
        status: 401,
        error: 'TOKEN_INVALID',
        message: 'Token no válido o perfil inactivo.',
      });
    }

    req.perfil = perfil;

    next();
    
  } catch (error) {
    res.status(401).json({
      status: 401,
      error: 'TOKEN_INVALID',
      message: 'Token no válido.',
    });
  }
};
