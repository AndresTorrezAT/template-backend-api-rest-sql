import { Request, Response } from "express";

import { createPersonal, 
         getAllPersonales, 
         getPersonalById, 
         softDeletePersonal, 
         updatePersonal } from "../services/personal.service";

export const crearPersonal = async (req: Request, res: Response): Promise<any> => {
    try {
        const { nombres, apellidos, ci, fecha_inicio_contratacion } = req.body;

        const  data = {
            nombres, 
            apellidos, 
            ci, 
            fecha_inicio_contratacion
        };

        const newPersonal = await createPersonal(data);

        return res.status(201).json(newPersonal);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

export const obtenerPersonalPorId = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        const personal = await getPersonalById(id);
        if (!personal) return res.status(404).json({ message: 'Personal not found' });

        return res.status(200).json(personal);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

export const obtenerListaDePersonal = async (req: Request, res: Response): Promise<any> => {
    try {
        
        const personales = await getAllPersonales();

        return res.status(200).json({
            total: personales.length,
            personales
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

export const actualizarPersonal = async (req: Request, res: Response): Promise<any> => {
    try {
        
        const {id} = req.params;
        const { nombres, apellidos, ci, fecha_inicio_contratacion, fecha_fin_contratacion} = req.body;

        const data = {
            nombres, 
            apellidos, 
            ci, 
            fecha_inicio_contratacion, 
            fecha_fin_contratacion 
        }

        const updatedPersonal = await updatePersonal(id, data);
        if (!updatedPersonal) return res.status(404).json({ message: 'Personal not found' });

        return res.status(200).json(updatedPersonal);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

export const eliminarPersonal = async (req: Request, res: Response): Promise<any> => {
    try {
        const {id} = req.params;

        const isDeleted = await softDeletePersonal(id);
        if (!isDeleted) return res.status(404).json({ message: 'Personal not found' });

        return res.status(200).json({ message: 'Personal deleted successfully' });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};