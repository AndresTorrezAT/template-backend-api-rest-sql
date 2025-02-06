import { Request, Response } from "express";

import { createPerfil, 
         getAllPerfiles, 
         getPerfilById, 
         getPerfilByItem, 
         updatePerfil } from "../services/perfil.service";

import { getPersonalById } from "../services/personal.service";

import { comparePasswords, 
         hashPassword } from "../utils/security.util";

export const crearPerfil = async( req: Request, res: Response ): Promise<any> => {
    try {

        const { usuario, password, tipo, personal_id } = req.body;

        // VERIFICAR SI PERSONAL EXISTE
        const personal = await getPersonalById(personal_id);
        if (!personal) return res.status(404).json({ message: 'Personal no encontrado' });
        
        // ENCRIPTAR CONTRASEÑA
        const password_hash = hashPassword(password);

        const  data = {
            usuario, 
            password: password_hash,
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

export const obtenerPerfilPorId = async (req: Request, res: Response): Promise<any> => {
    try {
        
        const { id } = req.params;

        const perfil = await getPerfilById(id);
        if (!perfil) return res.status(404).json({ message: 'Perfil not found' });

        return res.status(200).json(perfil);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

export const obtenerListaDePerfil = async (req: Request, res: Response): Promise<any> => {
    try {
        
        const perfiles = await getAllPerfiles();

        return res.status(200).json({
            total: perfiles.length,
            perfiles
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

export const actualizarPerfil = async (req: Request, res: Response): Promise<any> => {
    try {
        
        const {id} = req.params;
        const { usuario, password } = req.body;

        //ENCRIPTAR CONTRASEÑA
        const password_hash = hashPassword(password);
    
        const data = {
            usuario,
            password: password_hash
        }

        const updatedPerfil = await updatePerfil(id, data);
        if (!updatedPerfil) return res.status(404).json({ message: 'Perfil not found' });

        return res.status(200).json(updatedPerfil);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

export const actualizarEstadoPerfil = async (req: Request, res: Response): Promise<any> => {

    try {
        
        const { id } = req.params;

        const perfil = await getPerfilByItem('id', id);
        if (!perfil) return res.status(404).json({ message: 'Perfil no encontrado' });

        perfil.estado = !perfil.estado;

        await perfil.save();

        return res.status(200).json(perfil);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            error: 'INTERNAL_SERVER_ERROR',
            message: 'Error interno del servidor',
        });
    }
};


export const cambiarPasswordPerfil = async( req: Request, res: Response):Promise<any> => {

    try {

        const { id } = req.params;
        const { old_password, new_password } = req.body;

        const perfil:any = await getPerfilByItem('id', id);

        //Validar Old Password
        const validPassword = comparePasswords( old_password, perfil.password );
        if (!validPassword) return res.status(404).json({ message: 'Password Incorrecto' });

        //ENCRIPTAR CONTRASEÑA
        const password_hash = hashPassword(new_password);
        perfil.password = password_hash;

        await perfil.save();
        
        return res.status(200).json(perfil);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            error: 'INTERNAL_SERVER_ERROR',
            message: 'Error interno del servidor'
        });
    }
}