import type { Request, Response } from "express";
import { Perfil } from "../entities/Perfil";

export const crearPerfil = async( req: Request, res: Response ): Promise<any> => {
    try {
        const { usuario, password, tipo } = req.body;

        const perfil = new Perfil();
        perfil.usuario = usuario;
        perfil.password = password;
        perfil.tipo = tipo;
        
        await perfil.save();

        return res.json(perfil);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            error: 'INTERNAL_SERVER_ERROR',
            message: 'Error interno del servidor'
        });
    }
}