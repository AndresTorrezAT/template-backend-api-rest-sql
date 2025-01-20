import type { Request, Response } from "express";
import { Personal } from "../entities/Personal";


export const crearPersonal = async( req: Request, res: Response ): Promise<any> => {
    try {
        const { nombres, apellidos, ci, fecha_inicio_contratacion} = req.body;

        // Crear el nuevo Personal
        const newPersonal = new Personal();
        newPersonal.nombres = nombres;
        newPersonal.apellidos = apellidos;
        newPersonal.ci = ci;
        newPersonal.fecha_inicio_contratacion = fecha_inicio_contratacion;
        
        await newPersonal.save();  // Guardar en la base de datos

        return res.status(201).json(newPersonal);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            error: 'INTERNAL_SERVER_ERROR',
            message: 'Error interno del servidor'
        });
    }
}

export const obtenerPersonalById = async( req: Request, res: Response ): Promise<any> => {

    const { id } = req.params;

    const personal = await Personal.findOne({
        where: { id: id },
        relations: ['perfil']  // Carga el perfil relacionado
    });

    return res.status(200).json(personal);

}