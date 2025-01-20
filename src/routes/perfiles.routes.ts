import { Router } from 'express';
import { crearPerfil } from '../controllers/perfiles.controller';



const router = Router();

router.post('/', crearPerfil);


export default router;