import { Router } from 'express';

import { validarJWT } from '../middlewares/auth.middleware';
import { validarCampos } from '../middlewares/error.middleware';

import { actualizarPersonal, 
         crearPersonal, 
         eliminarPersonal, 
         obtenerListaDePersonal, 
         obtenerPersonalPorId } from '../controllers/personal.controller';
         
import { check } from 'express-validator';
import { validarExiste } from '../middlewares/validar-existe.middleware';

const router = Router();

router.post('/',[
    validarJWT,
    check('nombres', 'The field "nombres" cannot be empty.').not().isEmpty(),
    check('apellidos', 'The field "apellidos" cannot be empty.').not().isEmpty(),
    check('ci', 'The field "ci" cannot be empty.').not().isEmpty(),
    validarExiste('Personal', 'ci'),
    validarCampos
], crearPersonal);

router.get('/',[
    validarJWT,
    validarCampos
], obtenerListaDePersonal);

router.get('/:id',[
    validarJWT,
    check('id', 'The field "id" must be a valid UUID.').isUUID(),
    validarCampos
], obtenerPersonalPorId);

router.put('/:id',[
    validarJWT,
    check('id', 'The field "id" must be a valid UUID.').isUUID(),
    validarCampos
], actualizarPersonal);

router.delete('/:id',[
    validarJWT,
    check('id', 'The field "id" must be a valid UUID.').isUUID(),
    validarCampos
], eliminarPersonal);

export default router;