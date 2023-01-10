import { Router } from 'express';
import { addPatient, updateData } from '../controller/controller.FogLayer';

const router = Router();

router.post('/addPatient', addPatient);
router.post('/updateData', updateData);

export default router;
