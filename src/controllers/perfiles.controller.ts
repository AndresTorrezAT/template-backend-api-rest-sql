import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import { Perfil } from "../entities/Perfil";
import { Personal } from "../entities/Personal";

export const crearPerfil = async( req: Request, res: Response ): Promise<any> => {
    try {
        const { usuario, password, tipo, personal_id } = req.body;

        // Verificar si el Personal con el ID proporcionado existe
        const personal = await Personal.findOne({ where: { id: personal_id } });
        if (!personal) {
            return res.status(404).json({ message: 'Personal no encontrado' });
        }

        const perfil = new Perfil();
        perfil.usuario = usuario;
        // perfil.password = password;
        perfil.tipo = tipo;
        perfil.personal = personal;

        //ENCRIPTAR CONTRASEÑA
        const salt = bcryptjs.genSaltSync();
        perfil.password = bcryptjs.hashSync( password, salt );
        
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

export const obtenerPer = async () => {

}