import { Router } from 'express';
import { check } from 'express-validator';

import { validarJWT } from '../middlewares/auth.middleware';
import { validarCampos } from '../middlewares/error.middleware';

import { actualizarEstadoPerfil, 
         actualizarPerfil, 
         cambiarPasswordPerfil, 
         crearPerfil, 
         obtenerListaDePerfil, 
         obtenerPerfilPorId } from '../controllers/perfiles.controller';
import { validarExiste } from '../middlewares/validar-existe.middleware';

const router = Router();

router.post('/', [
    validarJWT,
    check('usuario', 'The field "username" cannot be empty.').not().isEmpty(),
    check('password', 'Password must be at least 6 characters.').isLength({ min: 6 }),
    check('tipo', 'The field "username" cannot be empty.').not().isEmpty(),
    check('tipo', 'The field "tipo" must be one of: administrador.').isIn(['administrador']),
    check('personal_id', 'The field "personal" must be a valid UUID.').isUUID(),
    validarExiste('Perfil', 'usuario'),
    validarCampos
], crearPerfil);

router.get('/', [
    // validarJWT,
    validarCampos
], obtenerListaDePerfil);

router.get('/:id', [
    validarJWT,
    check('id', 'The field "id" must be a valid UUID.').isUUID(),
    validarCampos
], obtenerPerfilPorId);

router.put('/:id', [
    validarJWT,
    check('id', 'The field "id" must be a valid UUID.').isUUID(),
    validarCampos
], actualizarPerfil);

router.patch('/estado/:id', [
    validarJWT,
    check('id', 'The field "id" must be a valid UUID.').isUUID(),
    validarCampos
], actualizarEstadoPerfil);

router.patch('/actualizar-password/:id', [
    validarJWT,
    check('id', 'The field "id" must be a valid UUID.').isUUID(),
    validarCampos
], cambiarPasswordPerfil);

export default router;
