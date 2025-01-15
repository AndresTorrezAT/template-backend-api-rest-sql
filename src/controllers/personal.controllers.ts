import { response, request } from "express";
import { Personal } from "../entities/Personal";


export const crearPersonal = async( req = request, res = response) => {
    try {
        const { firstname, lastname } = req.body;

        const personal = new Personal();
        personal.firstname = firstname;
        personal.lastname = lastname;
        
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