import { Router } from 'express';

import { validarJWT } from '../middlewares/auth.middleware';
import { validarCampos } from '../middlewares/error.middleware';

import { actualizarPersonal, 
         crearPersonal, 
         eliminarPersonal, 
         obtenerListaDePersonal, 
         obtenerPersonalPorId } from '../controllers/personal.controller';

const router = Router();

router.post('/',[
    // validarJWT,
    validarCampos
], crearPersonal);

router.get('/:id',[
    validarJWT,
    validarCampos
], obtenerPersonalPorId);

router.get('/',[
    validarJWT,
    validarCampos
], obtenerListaDePersonal);

router.put('/:id',[
    validarJWT,
    validarCampos
], actualizarPersonal);

router.delete('/:id',[
    validarJWT,
    validarCampos
], eliminarPersonal);

export default router;