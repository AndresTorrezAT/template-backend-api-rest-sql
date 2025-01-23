import { Router } from 'express';
import { crearPersonal, obtenerPersonalById, obtenerPersonales } from '../controllers/personal.controller';
import { validarJWT } from '../middlewares/auth.middleware';
import { validarCampos } from '../middlewares/error.middleware';


const router = Router();

router.post('/', crearPersonal); // Ruta válida

router.get('/:id', obtenerPersonalById); // Ruta válida

router.get('/',[
    validarJWT,
    validarCampos
], obtenerPersonales);

export default router;