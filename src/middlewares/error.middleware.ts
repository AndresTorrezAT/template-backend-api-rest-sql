import { Result, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express'

export const validarCampos = ( req:Request , res:Response, next:NextFunction ): any => {
    
    // const errors = validationResult(req);
    const result: Result = validationResult(req);
   
    if (!result.isEmpty()) {
        return res.status(400).json({
            status: 400,
            error: "BAD_REQUEST",
            message: "La solicitud contiene campos inválidos o faltantes.",
            details: result.array()
                // .filter((error): error is ValidationError & { param: string } => 'param' in error)
                .map(error => ({
                    field: error.param, // El campo que falló
                    message: error.msg  // El mensaje de error
                })),
        });
    }

    next();

}

// export default validarCampos;