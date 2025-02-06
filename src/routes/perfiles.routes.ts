import { Router } from 'express';
import { check } from 'express-validator';

import { validarJWT } from '../middlewares/auth.middleware';
import { validarCampos } from '../middlewares/error.middleware';

import { actualizarEstadoPerfil, 
         actualizarPerfil, 
         cambiarPasswordPerfil, 
         crearPerfil, 
         obtenerListaDePerfil, 
         obtenerPerfilPorId} from '../controllers/perfiles.controller';

const router = Router();

router.post('/', [
    // validarJWT,
    check('usuario', 'The field "username" cannot be empty.').not().isEmpty(),
    check('password', 'Password must be at least 6 characters.').isLength({ min: 6 }),
    check('tipo', 'The field "username" cannot be empty.').not().isEmpty(),
    check('tipo', 'The field "tipo" must be one of: administrador.').isIn(['administrador']),
    validarCampos
], crearPerfil);

router.get('/', [
    validarJWT,
    validarCampos
], obtenerListaDePerfil);

router.get('/:id', [
    validarJWT,
    validarCampos
], obtenerPerfilPorId);

router.put('/:id', [
    validarJWT,
    validarCampos
], actualizarPerfil);

router.patch('/estado/:id', [
    validarJWT,
    validarCampos
], actualizarEstadoPerfil);

router.patch('/actualizar-password/:id', [
    validarJWT,
    validarCampos
], cambiarPasswordPerfil);

export default router;