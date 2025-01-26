import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import { Perfil } from "../entities/Perfil";
import { Personal } from "../entities/Personal";
import { createPerfil } from "../services/perfil.service";
import { getPersonalById } from "../services/personal.service";

export const crearPerfil = async( req: Request, res: Response ): Promise<any> => {
    try {
        const { usuario, password, tipo, personal_id } = req.body;

        // Verificar si el Personal con el ID proporcionado existe
        const personal = await getPersonalById(personal_id);
        if (!personal) {
            return res.status(404).json({ message: 'Personal no encontrado' });
        }

        const  data = {
            usuario, 
            password,
            tipo,
            personal
        };

        const newPerfil = await createPerfil(data);

        return res.json(newPerfil);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            error: 'INTERNAL_SERVER_ERROR',
            message: 'Error interno del servidor'
        });
    }
}