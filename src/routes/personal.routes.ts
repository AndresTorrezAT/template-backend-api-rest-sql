import { Router } from 'express';
import { crearPersonal, eliminarPersonal, obtenerPersonalPorId, obtenerListaDePersonal, actualizarPersonal, actualizarPersonalParcial } from '../controllers/personal.controller';
import { validarJWT } from '../middlewares/auth.middleware';
import { validarCampos } from '../middlewares/error.middleware';

const router = Router();

router.post('/', crearPersonal);

router.get('/:id', obtenerPersonalPorId);

router.get('/',[
    // validarJWT,
    // validarCampos
], obtenerListaDePersonal);

router.put('/:id', actualizarPersonal);

router.patch('/:id', actualizarPersonalParcial);

router.delete('/:id', eliminarPersonal);

export default router;