const { validationResult } = require('express-validator');

const validarCampos = ( req, res, next ) => {

    const errors = validationResult(req);
   
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            error: "BAD_REQUEST",
            message: "La solicitud contiene campos inválidos o faltantes.",
            details: errors.array().map(error => ({
                field: error.param, // El campo que falló
                message: error.msg  // El mensaje de error
            }))
        });
    }

    next();

}

module.exports = {
    validarCampos
}