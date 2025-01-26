import { Request, Response } from "express";
import { Personal } from "../entities/Personal";
import { createPersonal, deletePersonal, getAllPersonales, getPersonalById, updatePersonal } from "../services/personal.service";


// export const crearPersonal = async( req: Request, res: Response ): Promise<any> => {
//     try {
//         const { nombres, apellidos, ci, fecha_inicio_contratacion} = req.body;

//         // Crear el nuevo Personal
//         const newPersonal = new Personal();
//         newPersonal.nombres = nombres;
//         newPersonal.apellidos = apellidos;
//         newPersonal.ci = ci;
//         newPersonal.fecha_inicio_contratacion = fecha_inicio_contratacion;
        
//         await newPersonal.save();  // Guardar en la base de datos

//         return res.status(201).json(newPersonal);

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             status: 500,
//             error: 'INTERNAL_SERVER_ERROR',
//             message: 'Error interno del servidor'
//         });
//     }
// }

export const crearPersonal = async (req: Request, res: Response): Promise<Response> => {
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

// export const obtenerPersonalPorId = async( req: Request, res: Response ): Promise<any> => {

//     const { id } = req.params;

//     const personal = await Personal.findOne({
//         where: { id: id },
//         relations: ['perfil']  // Carga el perfil relacionado
//     });

//     return res.status(200).json(personal);

// }

export const obtenerPersonalPorId = async (req: Request, res: Response): Promise<Response> => {
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


// export const obtenerListaDePersonal = async (req: Request, res: Response): Promise<any> => {
//     try {
//         const personales = await Personal.find({
//             relations: ['perfil'] // Carga la relación con 'perfil'
//         });

//         return res.status(200).json(personales);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Error al obtener los personales.' });
//     }
// };

export const obtenerListaDePersonal = async (req: Request, res: Response): Promise<Response> => {
    try {
        const personales = await getAllPersonales();
        return res.status(200).json(personales);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// export const actualizarPersonal = async (req: Request, res: Response): Promise<any> => {
//     try {

//         const {id} = req.params;
//         const { nombres, apellidos, ci, fecha_inicio_contratacion, fecha_fin_contratacion} = req.body;

//         const personalToUpdate:any = await Personal.findOneBy({
//             id: id,
//         })

//         // Actualizar los campos del recurso
//         personalToUpdate.nombres = nombres ?? personalToUpdate.nombres;
//         personalToUpdate.apellidos = apellidos ?? personalToUpdate.apellidos;
//         personalToUpdate.ci = ci ?? personalToUpdate.ci;
//         personalToUpdate.fecha_inicio_contratacion = fecha_inicio_contratacion ?? personalToUpdate.fecha_inicio_contratacion;
//         personalToUpdate.fecha_fin_contratacion = fecha_fin_contratacion ?? personalToUpdate.fecha_fin_contratacion;

//         // Guardar los cambios en la base de datos
//         const updatedPersonal = await Personal.save(personalToUpdate);

//         return res.status(200).json(updatedPersonal);
        
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Error al obtener los personales.' });
//     }
// };

export const actualizarPersonal = async (req: Request, res: Response): Promise<Response> => {
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

        const updatedPersonal = await updatePersonal(id, data );

        if (!updatedPersonal) return res.status(404).json({ message: 'Personal not found' });

        return res.status(200).json(updatedPersonal);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

export const actualizarPersonalParcial = async (req: Request, res: Response): Promise<any> => {
    try {

        const {id} = req.params;

        const personalToUpdate:any = await Personal.findOneBy({
            id: id,
        })

        // Actualizar los campos del recurso
        personalToUpdate.estado = !personalToUpdate.estado;

        // Guardar los cambios en la base de datos
        const updatedPersonal = await Personal.save(personalToUpdate);

        return res.status(200).json(updatedPersonal);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener los personales.' });
    }
};


// export const eliminarPersonal = async (req: Request, res: Response): Promise<any> => {
//     try {

//         const {id} = req.params;

//         const result = await Personal.delete(id);

//         return res.json(result);
        
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Error al obtener los personales.' });
//     }
// };

export const eliminarPersonal = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {id} = req.params;
        const isDeleted = await deletePersonal(id);
        if (!isDeleted) return res.status(404).json({ message: 'Personal not found' });
        return res.status(200).json({ message: 'Personal deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};