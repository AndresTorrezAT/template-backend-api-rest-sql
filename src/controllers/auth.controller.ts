import { Request, Response } from "express";

import { comparePasswords, generarJWT } from "../utils/security.util";

import { getPerfilByItem } from "../services/perfil.service";

export const login = async( req: Request, res: Response ): Promise<any> => {

    try {
        const { usuario, password } = req.body;

        const perfil = await getPerfilByItem( 'usuario', usuario );
        if (!perfil) return res.status(404).json({ message: 'Usuario no encontrado' });
        if (!perfil.estado) return res.status(401).json({ message: 'Perfil de usuario desactivado' });
        
        const validPassword = comparePasswords( password, perfil.password );
        if (!validPassword) return res.status(401).json({ message: 'Contraseña incorrecta' });

        // Generar el JWT
        const token = await generarJWT( perfil.id );

        res.json({
            perfil,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            error: 'INTERNAL_SERVER_ERROR',
            message: 'Error interno del servidor'
        });
    }

}