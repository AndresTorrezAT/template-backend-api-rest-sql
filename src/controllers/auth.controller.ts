import type { Request, Response } from "express";
import { Perfil } from "../entities/Perfil";
import { generarJWT } from "../utils/jwt.util";
import bcryptjs from 'bcryptjs';

export const login = async( req: Request, res: Response ): Promise<any> => {
    try {
        const { usuario, password } = req.body;

        // Buscar un único perfil que coincida con el usuario
        const perfil = await Perfil.findOne({
            where: { usuario: usuario },  // Busca por el campo 'usuario'
            relations: ["personal"],  // Incluir la relación 'personal' asociada al perfil
        });

        if (!perfil) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        const validPassword = bcryptjs.compareSync( password, perfil.password );

        if (validPassword) {  // Esto es solo un ejemplo, deberías usar un hash para la contraseña en producción

            // Generar el JWT
            const token = await generarJWT( perfil.id );

            res.json({
                perfil,
                token
            });

        } else {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            error: 'INTERNAL_SERVER_ERROR',
            message: 'Error interno del servidor'
        });
    }
}