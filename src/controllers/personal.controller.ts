import type { Request, Response } from "express";
import { Personal } from "../entities/Personal";

export const crearPersonal = async( req: Request, res: Response ): Promise<any> => {
    try {
        const { nombres, apellidos, ci, fecha_inicio_contratacion } = req.body;

        const personal = new Personal();
        personal.nombres = nombres;
        personal.apellidos = apellidos;
        personal.ci = ci;
        personal.fecha_inicio_contratacion = fecha_inicio_contratacion;
        
        await personal.save();

        return res.json(personal);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            error: 'INTERNAL_SERVER_ERROR',
            message: 'Error interno del servidor'
        });
    }
}

export const obtenerPersonal = async () => {

}