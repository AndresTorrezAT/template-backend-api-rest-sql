import { Router } from 'express';
import { crearPersonal } from '../controllers/personal.controllers';



const router = Router();

router.post('/',[

], crearPersonal);

export default router;