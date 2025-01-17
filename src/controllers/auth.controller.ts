import type { Request, Response } from "express";
import { Perfil } from "../entities/Perfil";

export const login = async( req: Request, res: Response ): Promise<any> => {
    try {
        const { usuario, password } = req.body;

        // Buscar un único perfil que coincida con el usuario
        const login = await Perfil.findOne({
            where: { usuario: usuario },  // Busca por el campo 'usuario'
        });

        if (!login) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
    

        if (login.password === password) {  // Esto es solo un ejemplo, deberías usar un hash para la contraseña en producción
            return res.json(login);  // Aquí devuelves la información del perfil
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