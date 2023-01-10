import { Router } from 'express';
import { addPatient, getData } from '../controller/controller.cloudLayer';

const router = Router();

router.post('/addPatient', addPatient);
router.post('/getFile', getData);

export default router;
