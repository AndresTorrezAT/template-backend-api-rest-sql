import { Request, Response, NextFunction } from 'express'
import { ValidationError, validationResult } from 'express-validator';

const validarCampos = ( req:Request , res:Response, next:NextFunction ) => {

    const errors = validationResult(req);
   
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            error: "BAD_REQUEST",
            message: "La solicitud contiene campos inválidos o faltantes.",
            details: errors
                .array()
                .filter((error): error is ValidationError & { param: string } => 'param' in error)
                .map(error => ({
                    field: error.param, // El campo que falló
                    message: error.msg  // El mensaje de error
                })),
        });
    }

    next();

}

export default validarCampos;