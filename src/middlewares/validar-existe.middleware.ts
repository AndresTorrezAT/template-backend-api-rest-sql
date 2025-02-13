import { NextFunction, Request, Response,  } from "express";
import { AppDataSource } from "../config/db.config";

export const validarExiste = (entidadNombre: string, campo: string) => {

    return async (req: Request, res: Response, next: NextFunction) => {

        const valor = req.body[campo];

        try {
            // Obtiene el repositorio de la entidad usando TypeORM
            const entidad = AppDataSource.getRepository(entidadNombre);
            if (!entidad) {
                console.error(`No se encontró la entidad "${entidadNombre}".`);
                return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
            }

            // Busca si el valor ya existe en la base de datos
            const existe = await entidad.findOne({ where: { [campo]: valor } });
            if (existe) return res.status(400).json({ msg: `The field ${campo} with value ${valor} is already registered.`});

            next();
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
    };
};